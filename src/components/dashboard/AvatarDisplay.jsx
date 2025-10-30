import React from "react";
import { User, Star, Award } from "lucide-react";

export default function AvatarDisplay({ user, medalLevel }) {
  const getMedalEmoji = () => {
    if (medalLevel.includes('Diamond')) return "💎";
    if (medalLevel.includes('Gold')) return "🥇";
    if (medalLevel.includes('Silver')) return "🥈";
    if (medalLevel.includes('Bronze')) return "🥉";
    return "🌱";
  };

  return (
    <div
      className="clay-card p-6"
    >
      <h3 className="text-center text-lg font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
        <Award className="w-5 h-5 text-purple-500" />
        My Profile
      </h3>
      <div className="text-center space-y-4">
        <div 
          className="relative inline-block"
        >
          <div className="w-32 h-32 rounded-full overflow-hidden clay-card mx-auto border-4 border-white shadow-lg">
            {user?.profile_photo ? (
              <img 
                src={user.profile_photo} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-pink-200">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
          <div
            className="absolute -top-2 -right-2 text-3xl w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.6))'
            }}
          >
            {getMedalEmoji()}
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 
            className="font-bold text-xl text-gray-800"
          >
            {user?.full_name?.split(' ')[0] || 'Eco Hero'}
          </h3>
          <div
            className="inline-block clay-button px-4 py-2 rounded-full shadow-md"
            style={{
              background: 'linear-gradient(135deg, #4ade80 0%, #3b82f6 100%)'
            }}
          >
            <span className="text-white text-sm font-bold">
              {medalLevel}
            </span>
          </div>
          <div 
            className="flex items-center justify-center gap-2 text-lg font-semibold text-yellow-600"
          >
            <div>
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </div>
            <span
              className="text-gray-800"
            >
              {user?.total_stars || 0}
            </span>
            <span className="text-gray-700">Stars</span>
          </div>
        </div>
      </div>
    </div>
  );
}