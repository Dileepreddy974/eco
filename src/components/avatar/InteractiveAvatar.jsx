import React from "react";
import { User, Star } from "lucide-react";

export default function InteractiveAvatar({ user, size = "md" }) {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  };

  const iconSize = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  return (
    <div
      className="relative inline-block"
    >
      <div className={`rounded-full overflow-hidden clay-card ${sizeClasses[size]} mx-auto`}>
        {user?.profile_photo ? (
          <img 
            src={user.profile_photo} 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200">
            <User className={`${iconSize[size]} text-gray-400`} />
          </div>
        )}
      </div>
      <div
        className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1"
      >
        <Star className="w-4 h-4 text-white" />
      </div>
    </div>
  );
}