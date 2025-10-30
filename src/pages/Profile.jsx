import React, { useState, useEffect, useRef } from "react";
import { base44 } from "../api/base44Client";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Star, Save, Upload, Camera, User as UserIcon, Loader2 } from "lucide-react";

import LoadingAnimation from "../components/loading/LoadingAnimation";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    profile_photo: "",
    class_name: "",
    school_name: ""
  });
  const fileInputRef = useRef(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);
      setFormData({
        profile_photo: currentUser.profile_photo || "",
        class_name: currentUser.class_name || "",
        school_name: currentUser.school_name || ""
      });
    } catch (error) {
      console.error('Error loading user data:', error);
    }
    setIsLoading(false);
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const result = await base44.integrations.Core.UploadFile({ file });
      setFormData({ ...formData, profile_photo: result.file_url });
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
    setIsUploading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await base44.auth.updateMe(formData);
      await loadUserData();
    } catch (error) {
      console.error('Error saving profile:', error);
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return <LoadingAnimation message="Loading your profile..." />;
  }

  const getMedalLevel = () => {
    if (!user) return 'Eco Beginner';
    const { current_medals } = user;
    if (current_medals?.diamond > 0) return 'Diamond Eco Master';
    if (current_medals?.gold > 0) return 'Gold Eco Hero';
    if (current_medals?.silver > 0) return 'Silver Eco Warrior';
    if (current_medals?.bronze > 0) return 'Bronze Eco Explorer';
    return 'Eco Beginner';
  };

  return (
    <div
      className="p-4 md:p-8 min-h-screen"
    >
      <div className="max-w-4xl mx-auto">
        <div 
          className="text-center mb-8"
        >
          <h1 
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            My Profile ✨
          </h1>
          <p 
            className="text-lg text-gray-700 font-medium"
          >
            Manage your eco-hero profile!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left - Profile Photo */}
          <div
            className="lg:col-span-1"
          >
            <div
              className="clay-card p-6 sticky top-6"
            >
              <h3 className="text-center text-xl font-bold text-gray-800 mb-6">Profile Photo</h3>
              
              <div className="flex flex-col items-center gap-6">
                {/* Photo Display */}
                <div
                  className="relative w-48 h-48 rounded-full overflow-hidden clay-card"
                >
                  {formData.profile_photo ? (
                    <img
                      src={formData.profile_photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200">
                      <UserIcon className="w-24 h-24 text-gray-400" />
                    </div>
                  )}
                  
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Loader2 className="w-12 h-12 text-white animate-spin" />
                    </div>
                  )}
                </div>

                {/* Upload Button */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="clay-button px-6 py-3 rounded-full font-bold text-gray-700 flex items-center gap-2 disabled:opacity-50"
                >
                  <Camera className="w-5 h-5" />
                  {formData.profile_photo ? 'Change Photo' : 'Upload Photo'}
                </button>

                {/* User Level Badge */}
                {user && (
                  <div
                    className="text-center"
                  >
                    <Badge className="clay-button px-4 py-2 text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-white border-0">
                      {getMedalLevel()}
                    </Badge>
                    <div 
                      className="flex items-center justify-center gap-2 text-lg font-semibold text-yellow-600 mt-3"
                    >
                      <div>
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      </div>
                      <span className="text-white" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                        {user.total_stars || 0} Stars
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right - Profile Info & Stats */}
          <div
            className="lg:col-span-2 space-y-6"
          >
            {/* Profile Information */}
            <div
              className="clay-card p-6"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <UserIcon className="w-6 h-6 text-purple-500" />
                Profile Information
              </h3>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-gray-700 font-semibold mb-2 block">
                    Your Name
                  </Label>
                  <Input
                    id="name"
                    value={user?.full_name || ""}
                    disabled
                    className="clay-button font-medium text-gray-800"
                  />
                  <p className="text-sm text-gray-500 mt-1">Name cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 font-semibold mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="clay-button font-medium text-gray-800"
                  />
                  <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="class" className="text-gray-700 font-semibold mb-2 block">
                    Your Class
                  </Label>
                  <Input
                    id="class"
                    value={formData.class_name}
                    onChange={(e) => setFormData({ ...formData, class_name: e.target.value })}
                    placeholder="e.g., Grade 5A, Class 3B"
                    className="clay-button"
                  />
                </div>

                <div>
                  <Label htmlFor="school" className="text-gray-700 font-semibold mb-2 block">
                    Your School
                  </Label>
                  <Input
                    id="school"
                    value={formData.school_name}
                    onChange={(e) => setFormData({ ...formData, school_name: e.target.value })}
                    placeholder="e.g., Green Valley Elementary"
                    className="clay-button"
                  />
                </div>
              </div>
            </div>

            {/* Medals & Progress */}
            {user && (
              <div
                className="clay-card p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                  <Star className="w-6 h-6 text-yellow-500" />
                  Your Achievements
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div
                    className="text-center p-4 rounded-2xl clay-card"
                  >
                    <div className="text-3xl mb-2">⭐</div>
                    <div className="font-bold text-xl text-yellow-700">{user.total_stars || 0}</div>
                    <div className="text-sm text-yellow-600">Total Stars</div>
                  </div>
                  <div
                    className="text-center p-4 rounded-2xl clay-card"
                  >
                    <div className="text-3xl mb-2">🥉</div>
                    <div className="font-bold text-xl text-amber-700">{user.current_medals?.bronze || 0}</div>
                    <div className="text-sm text-amber-600">Bronze</div>
                  </div>
                  <div
                    className="text-center p-4 rounded-2xl clay-card"
                  >
                    <div className="text-3xl mb-2">🥈</div>
                    <div className="font-bold text-xl text-gray-700">{user.current_medals?.silver || 0}</div>
                    <div className="text-sm text-gray-600">Silver</div>
                  </div>
                  <div
                    className="text-center p-4 rounded-2xl clay-card"
                  >
                    <div className="text-3xl mb-2">🥇</div>
                    <div className="font-bold text-xl text-yellow-800">{user.current_medals?.gold || 0}</div>
                    <div className="text-sm text-yellow-700">Gold</div>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="text-center">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="clay-button px-8 py-4 rounded-full font-bold text-white relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)",
                  boxShadow: "0 10px 30px rgba(147, 51, 234, 0.3)"
                }}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 inline animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2 inline" />
                    Save Profile
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}