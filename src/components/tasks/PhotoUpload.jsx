import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Camera, Upload, Image, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function PhotoUpload({ onPhotoUpload, uploadedPhoto, isUploading }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    setUploadError(null);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          setUploadError("File size too large. Please upload an image smaller than 5MB.");
          return;
        }
        
        onPhotoUpload(file).catch(error => {
          console.error('Upload error:', error);
          if (error.message && error.message.includes('Failed to fetch')) {
            setUploadError("Network error. Please check your internet connection and try again.");
          } else {
            setUploadError("Failed to upload photo. Please try again.");
          }
        });
      } else {
        setUploadError("Please upload an image file (JPEG, PNG, etc.)");
      }
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('image/')) {
        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          setUploadError("File size too large. Please upload an image smaller than 5MB.");
          return;
        }
        
        setUploadError(null);
        onPhotoUpload(file).catch(error => {
          console.error('Upload error:', error);
          if (error.message && error.message.includes('Failed to fetch')) {
            setUploadError("Network error. Please check your internet connection and try again.");
          } else {
            setUploadError("Failed to upload photo. Please try again.");
          }
        });
      } else {
        setUploadError("Please upload an image file (JPEG, PNG, etc.)");
      }
    }
  };

  return (
    <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50" variant="spacious">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <Camera className="w-6 h-6 text-blue-500" />
          Upload Your Proof Photo
        </CardTitle>
      </CardHeader>
      <CardContent>
        {uploadedPhoto ? (
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <img 
                src={uploadedPhoto.url} 
                alt="Task proof" 
                className="w-64 h-64 object-cover rounded-2xl shadow-lg mx-auto border-4 border-green-200"
              />
              <div className="absolute -top-3 -right-3 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-green-600 font-semibold text-lg">Great! Photo uploaded successfully!</p>
              <p className="text-gray-600 text-sm">You're one step closer to earning stars!</p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => fileInputRef.current?.click()}
              className="font-bold rounded-full"
              size="lg"
            >
              Choose Different Photo
            </Button>
          </div>
        ) : (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
              dragActive 
                ? "border-blue-400 bg-blue-50" 
                : "border-gray-300 hover:border-blue-400 hover:bg-blue-50"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
            
            {isUploading ? (
              <div className="space-y-4">
                <Loader2 className="w-16 h-16 text-blue-500 mx-auto animate-spin" />
                <p className="text-lg font-semibold text-blue-600">Uploading your photo...</p>
                <p className="text-gray-600 text-sm">This may take a few moments</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto flex items-center justify-center">
                  <Image className="w-8 h-8 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Upload Your Proof Photo</h3>
                  <p className="text-gray-600 mb-4">Show us how you completed this eco-task!</p>
                </div>
                
                {uploadError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
                    <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span className="text-sm">{uploadError}</span>
                  </div>
                )}
                
                <div className="space-y-3">
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    size="lg"
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Choose Photo
                  </Button>
                  
                  <p className="text-sm text-gray-500">
                    Or drag and drop your photo here
                  </p>
                  <p className="text-xs text-gray-400">
                    Supported formats: JPEG, PNG, GIF (Max 5MB)
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}