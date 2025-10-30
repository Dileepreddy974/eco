import React, { useState } from "react";
import { User, Task } from "../Entities/all";
import { UploadFile, InvokeLLM } from "../api/base44Client";
import { Badge } from "../components/ui/badge";
import { Star, Target } from "lucide-react";

import TaskCategories from "../components/tasks/TaskCategories";
import PhotoUpload from "../components/tasks/PhotoUpload";
import TaskVerification from "../components/tasks/TaskVerification";

const ECO_TASKS = [
  {
    category: "cleanup",
    title: "Clean Up Litter",
    description: "Pick up trash in your neighborhood, school, or park",
    emoji: "🧹",
    color: "from-blue-400 to-blue-600",
    points: 2
  },
  {
    category: "planting",
    title: "Plant a Tree/Flower",
    description: "Plant something green to help our environment",
    emoji: "🌱",
    color: "from-green-400 to-green-600",
    points: 3
  },
  {
    category: "recycling",
    title: "Recycle Materials",
    description: "Sort and recycle plastic, paper, or other materials",
    emoji: "♻️",
    color: "from-purple-400 to-purple-600",
    points: 2
  },
  {
    category: "water_saving",
    title: "Save Water",
    description: "Show how you're conserving water at home or school",
    emoji: "💧",
    color: "from-cyan-400 to-cyan-600",
    points: 2
  },
  {
    category: "energy_saving",
    title: "Save Energy",
    description: "Turn off lights, unplug devices, or use natural light",
    emoji: "⚡",
    color: "from-yellow-400 to-yellow-600",
    points: 2
  }
];

export default function TasksPage() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setUploadedPhoto(null);
    setVerificationResult(null);
  };

  const handlePhotoUpload = async (file) => {
    setIsUploading(true);
    setVerificationResult(null); // Clear any previous verification results
    
    try {
      console.log('Starting file upload...'); // Debug log
      const result = await UploadFile({ file });
      console.log('Upload result:', result); // Debug log
      
      setUploadedPhoto({
        url: result.file_url,
        file: file
      });
      
      return result; // Return the result for proper promise handling
    } catch (error) {
      console.error('Upload failed:', error);
      
      // Provide more specific error messages
      if (error.message && error.message.includes('Failed to fetch')) {
        throw new Error('Network error. Please check your internet connection and try again.');
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Failed to upload photo. Please try again.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleVerifyTask = async () => {
    if (!selectedTask || !uploadedPhoto) return;
    
    setIsVerifying(true);
    setVerificationResult(null); // Clear any previous results
    
    try {
      const user = await User.me();
      
      // Enhanced AI verification prompt with more detailed criteria and contextual analysis
      const verificationPrompt = `
        You are an expert AI environmental educator verifying eco-friendly activities for children. 
        Analyze the provided image to determine if it shows a child completing the eco-friendly task: "${selectedTask.title} - ${selectedTask.description}".
        
        Task Category: ${selectedTask.category}
        
        CRITICAL VERIFICATION INSTRUCTIONS:
        1. Look for clear visual evidence of the specific activity
        2. Consider child-friendly interpretations (don't expect professional execution)
        3. Be encouraging and positive in your assessment
        4. Only reject if there's clearly no evidence of the activity
        5. Consider partial completion as valid evidence
        
        DETAILED VERIFICATION CRITERIA BY CATEGORY:
        
        For "cleanup" tasks, look for clear evidence of:
        - Children holding trash bags, gloves, or picking up litter
        - Visible trash or litter being collected
        - Before/after comparison showing cleaned area (if visible)
        - Outdoor settings with potential litter (parks, streets, beaches)
        - Cleaning tools like brooms, grabbers, or collection containers
        
        For "planting" tasks, look for clear evidence of:
        - Children handling seedlings, seeds, or small plants
        - Soil preparation or planting activities
        - Gardening tools like small shovels, watering cans
        - Pots, planters, or garden beds with new plantings
        - Watering or caring for newly planted items
        
        For "recycling" tasks, look for clear evidence of:
        - Children sorting different materials into separate containers
        - Visible recyclable items (plastic bottles, paper, cans, cardboard)
        - Recycling bins or containers labeled for different materials
        - Organized separation of materials by type
        - Children actively engaged in sorting activities
        
        For "water_saving" tasks, look for clear evidence of:
        - Turning off taps/faucets completely (handle in closed position)
        - Collecting water in buckets, containers, or rain barrels
        - Using buckets instead of hoses for cleaning
        - Children demonstrating water conservation behaviors
        - Visible water collection or conservation setup
        
        For "energy_saving" tasks, look for clear evidence of:
        - Lights turned off in rooms (dark areas with light switches)
        - Unplugging electronic devices (visible cord disconnection)
        - Using natural light instead of artificial lighting
        - Children demonstrating energy-saving behaviors
        - Evidence of reduced electricity usage
        
        IMAGE ANALYSIS REQUIREMENTS:
        - Describe specific visual elements you can clearly identify
        - Note the confidence level in your assessment (0.0 to 1.0)
        - Provide encouraging feedback focused on positive behaviors
        - List specific elements detected in the image
        - Explain your verification reasoning clearly
        
        RESPONSE FORMAT (STRICT JSON):
        {
          "verified": true/false (boolean - true if activity is clearly shown),
          "confidence": 0.0-1.0 (number - confidence level),
          "feedback": "detailed explanation of assessment with encouraging tone",
          "detected_elements": ["specific elements identified in image"]
        }
        
        IMPORTANT GUIDELINES:
        - APPROVE tasks when there's reasonable evidence, even if not perfect
        - REJECT only when there's clearly no evidence of the specific activity
        - BE ENCOURAGING and focus on positive environmental behaviors
        - CONSIDER that children may not execute tasks professionally
      `;

      const aiResult = await InvokeLLM({
        prompt: verificationPrompt,
        file_urls: [uploadedPhoto.url],
        response_json_schema: {
          type: "object",
          properties: {
            verified: { type: "boolean" },
            confidence: { type: "number", minimum: 0, maximum: 1 },
            feedback: { type: "string" },
            detected_elements: { type: "array", items: { type: "string" } }
          },
          required: ["verified", "confidence", "feedback", "detected_elements"]
        }
      });

      // Validate AI result structure
      if (!aiResult || typeof aiResult.verified !== 'boolean') {
        throw new Error('Invalid AI verification response');
      }

      // Additional validation for confidence value
      if (typeof aiResult.confidence !== 'number' || aiResult.confidence < 0 || aiResult.confidence > 1) {
        throw new Error('Invalid confidence value in AI response');
      }

      // Create task record
      const taskData = {
        user_id: user.id,
        task_type: selectedTask.category,
        task_title: selectedTask.title,
        description: selectedTask.description,
        photo_url: uploadedPhoto.url,
        verification_status: aiResult.verified ? 'verified' : 'rejected',
        stars_earned: aiResult.verified ? selectedTask.points : 0,
        verification_details: aiResult.feedback,
        confidence: aiResult.confidence
      };

      await Task.create(taskData);

      // Update user's stars and medals if verified
      if (aiResult.verified) {
        const newStars = (user.total_stars || 0) + selectedTask.points;
        const currentMedals = user.current_medals || { bronze: 0, silver: 0, gold: 0, diamond: 0 };
        
        // Calculate new medals
        const newMedals = { ...currentMedals };
        if (newStars >= 80 && currentMedals.diamond === 0) newMedals.diamond = 1;
        else if (newStars >= 40 && currentMedals.gold === 0) newMedals.gold = 1;
        else if (newStars >= 20 && currentMedals.silver === 0) newMedals.silver = 1;
        else if (newStars >= 10 && currentMedals.bronze === 0) newMedals.bronze = 1;

        await User.updateMyUserData({
          total_stars: newStars,
          current_medals: newMedals
        });
      }

      setVerificationResult({
        ...aiResult,
        stars_earned: aiResult.verified ? selectedTask.points : 0
      });

    } catch (error) {
      console.error('Verification failed:', error);
      // Show a more user-friendly error message
      setVerificationResult({
        verified: false,
        confidence: 0,
        feedback: "Something went wrong during verification. Please check your internet connection and try again!",
        detected_elements: [],
        stars_earned: 0
      });
    }
    setIsVerifying(false);
  };

  const resetTask = () => {
    setSelectedTask(null);
    setUploadedPhoto(null);
    setVerificationResult(null);
  };

  return (
    <div className="p-4 md:p-8 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Target className="w-8 h-8 text-green-500" />
            Eco Tasks 🌍
          </h1>
          <p className="text-lg text-gray-700 font-medium flex items-center justify-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
            Choose a task, complete it, and upload proof to earn stars!
          </p>
        </div>

        {!selectedTask ? (
          <TaskCategories tasks={ECO_TASKS} onTaskSelect={handleTaskSelect} />
        ) : verificationResult ? (
          <TaskVerification 
            result={verificationResult} 
            task={selectedTask}
            onReset={resetTask}
          />
        ) : (
          <div className="space-y-6">
            {/* Selected Task Info */}
            <div
              className="clay-card p-6 rounded-2xl"
              style={{
                boxShadow: '4px 4px 8px rgba(163, 177, 198, 0.3), -2px -2px 6px rgba(255, 255, 255, 0.8)'
              }}
            >
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-3">
                <span className="text-3xl">{selectedTask.emoji}</span>
                {selectedTask.title}
              </h3>
              <p className="text-gray-600 mb-4">{selectedTask.description}</p>
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 rounded-full px-4 py-2">
                <Star className="w-4 h-4 mr-1 fill-white" />
                {selectedTask.points} Stars
              </Badge>
            </div>

            {/* Photo Upload */}
            <PhotoUpload 
              onPhotoUpload={handlePhotoUpload}
              uploadedPhoto={uploadedPhoto}
              isUploading={isUploading}
            />

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={resetTask}
                className="clay-button font-bold px-6 py-3 rounded-2xl border border-gray-300 hover:border-gray-400"
                style={{
                  boxShadow: '3px 3px 6px rgba(163, 177, 198, 0.25), -2px -2px 4px rgba(255, 255, 255, 0.8)'
                }}
              >
                Choose Different Task
              </button>
              
              {uploadedPhoto ? (
                <button
                  onClick={handleVerifyTask}
                  disabled={isVerifying}
                  className="clay-button px-8 py-4 rounded-2xl font-bold text-white relative overflow-hidden disabled:opacity-50 transform transition-all duration-200 hover:scale-105 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, #4ade80 0%, #3b82f6 100%)',
                    boxShadow: '4px 4px 8px rgba(163, 177, 198, 0.3), -2px -2px 6px rgba(255, 255, 255, 0.8)'
                  }}
                >
                  {isVerifying ? (
                    <>
                      <Star className="w-5 h-5 mr-2 animate-spin inline fill-yellow-400" />
                      AI Checking...
                    </>
                  ) : (
                    <>
                      <Star className="w-5 h-5 mr-2 inline fill-white" />
                      Submit for Stars!
                    </>
                  )}
                </button>
              ) : (
                <div className="px-8 py-4 rounded-2xl font-bold text-gray-500 bg-gray-100 border-2 border-dashed border-gray-300 flex items-center">
                  <Star className="w-5 h-5 mr-2 inline" />
                  <span>Upload Photo to Submit</span>
                </div>
              )}
            </div>
            
            {!uploadedPhoto && (
              <div className="text-center text-sm text-gray-500 mt-2">
                Please upload a photo of your completed task to submit for stars
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}