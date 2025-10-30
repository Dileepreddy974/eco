import React from "react";
import { Target, Star, Medal, Trophy, Award } from "lucide-react";

export default function ProgressStats({ user, nextMedal }) {
  const medalCounts = user?.current_medals || { bronze: 0, silver: 0, gold: 0, diamond: 0 };
  const totalMedals = medalCounts.bronze + medalCounts.silver + medalCounts.gold + medalCounts.diamond;

  return (
    <div className="space-y-4">
      {/* Stars Progress */}
      <div className="clay-card p-6">
        <h3 className="flex items-center gap-3 text-lg font-bold text-gray-800 mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
          Star Progress
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm font-medium text-gray-600">
            <span>Next {nextMedal.medal} Medal</span>
            <span>{nextMedal.current}/{nextMedal.needed} Stars</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 clay-card overflow-hidden">
            <div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full relative"
              style={{ width: `${Math.min(100, (nextMedal.current / nextMedal.needed) * 100)}%` }}
            >
              <div className="absolute inset-0 bg-white opacity-30"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Medals Collection */}
      <div className="clay-card p-6">
        <h3 className="flex items-center gap-3 text-lg font-bold text-gray-800 mb-4">
          <Medal className="w-5 h-5 text-purple-500" />
          Medals Collection
        </h3>
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-2xl mb-1">
              🌱
            </div>
            <div className="text-xs font-bold text-gray-600">Bronze</div>
            <div className="text-lg font-bold text-amber-700">{medalCounts.bronze}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">
              🥈
            </div>
            <div className="text-xs font-bold text-gray-600">Silver</div>
            <div className="text-lg font-bold text-gray-500">{medalCounts.silver}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">
              🥇
            </div>
            <div className="text-xs font-bold text-gray-600">Gold</div>
            <div className="text-lg font-bold text-yellow-500">{medalCounts.gold}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">
              💎
            </div>
            <div className="text-xs font-bold text-gray-600">Diamond</div>
            <div className="text-lg font-bold text-blue-400">{medalCounts.diamond}</div>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Total Medals</span>
            <span className="text-xl font-bold text-purple-600">
              {totalMedals}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div
        className="clay-card p-6"
      >
        <h3 className="flex items-center gap-3 text-lg font-bold text-gray-800 mb-4">
          <Award className="w-5 h-5 text-green-500" />
          Quick Stats
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div 
            className="text-center p-3 rounded-2xl clay-card"
          >
            <Trophy className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-800">#{Math.floor(Math.random() * 100) + 1}</div>
            <div className="text-xs text-gray-600">Rank</div>
          </div>
          <div 
            className="text-center p-3 rounded-2xl clay-card"
          >
            <Star className="w-6 h-6 text-yellow-500 fill-yellow-400 mx-auto mb-2" />
            <div className="text-lg font-bold text-gray-800">{user?.total_stars || 0}</div>
            <div className="text-xs text-gray-600">Total Stars</div>
          </div>
        </div>
      </div>
    </div>
  );
}