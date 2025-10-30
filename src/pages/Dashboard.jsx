import React, { useState, useEffect } from "react";
import { base44 } from "../api/base44Client";
import { Button } from "../components/ui/button";
import { Star, Trophy, Target, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

import LoadingAnimation from "../components/loading/LoadingAnimation";
import ProgressStats from "../components/dashboard/ProgressStats";
import RecentActivity from "../components/dashboard/RecentActivity";
import AvatarDisplay from "../components/dashboard/AvatarDisplay";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const currentUser = await base44.auth.me();
      setUser(currentUser);

      const userTasks = await base44.entities.Task.filter({ user_id: currentUser.id }, '-created_date', 5);
      setRecentTasks(userTasks);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
    setIsLoading(false);
  };

  const getMedalLevel = () => {
    if (!user) return 'Eco Beginner';
    const { current_medals } = user;
    if (current_medals?.diamond > 0) return 'Diamond Eco Master';
    if (current_medals?.gold > 0) return 'Gold Eco Hero';
    if (current_medals?.silver > 0) return 'Silver Eco Warrior';
    if (current_medals?.bronze > 0) return 'Bronze Eco Explorer';
    return 'Eco Beginner';
  };

  const getNextMedalProgress = () => {
    if (!user) return { needed: 10, current: 0, medal: 'Bronze' };
    const stars = user.total_stars || 0;
    
    if (stars < 10) return { needed: 10, current: stars, medal: 'Bronze' };
    if (stars < 20) return { needed: 20, current: stars, medal: 'Silver' };
    if (stars < 40) return { needed: 40, current: stars, medal: 'Gold' };
    if (stars < 80) return { needed: 80, current: stars, medal: 'Diamond' };
    return { needed: 80, current: stars, medal: 'Complete!' };
  };

  const getMedalEmoji = () => {
    const level = getMedalLevel();
    if (level.includes('Diamond')) return "💎";
    if (level.includes('Gold')) return "🥇";
    if (level.includes('Silver')) return "🥈";
    if (level.includes('Bronze')) return "🥉";
    return "🌱";
  };

  if (isLoading) {
    return <LoadingAnimation message="Loading your eco adventure..." />;
  }

  if (!user || (!user.profile_photo && !user.class_name && !user.school_name)) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-md mx-auto clay-card p-8 shadow-2xl">
          <div className="text-center">
            <div 
              className="w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center clay-card"
              style={{
                background: 'linear-gradient(135deg, #4ade80 0%, #3b82f6 100%)',
                boxShadow: '4px 4px 8px rgba(163, 177, 198, 0.3), -2px -2px 6px rgba(255, 255, 255, 0.8)'
              }}
            >
              <Star className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Welcome to Friendly Eco! 🌱</h2>
            <p className="text-gray-600 mb-6">Let's set up your profile and start your environmental adventure!</p>
            <Link to={createPageUrl("Profile")}>
              <button
                className="clay-button px-8 py-4 rounded-2xl font-bold text-white relative overflow-hidden shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #4ade80 0%, #3b82f6 100%)',
                  boxShadow: '4px 4px 8px rgba(163, 177, 198, 0.3), -2px -2px 6px rgba(255, 255, 255, 0.8)'
                }}
              >
                Set Up Profile ✨
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const nextMedal = getNextMedalProgress();

  return (
    <div className="p-4 md:p-8 space-y-8 min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            <Star className="w-8 h-8 text-yellow-500 fill-yellow-400" />
            Welcome back, {user.full_name?.split(' ')[0] || 'Eco Hero'}! 🌟
          </h1>
          <p className="text-lg text-gray-700 font-medium">
            Ready for another day of saving our planet?
          </p>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Avatar & Stats */}
          <div className="lg:col-span-1 space-y-6">
            <AvatarDisplay user={user} medalLevel={getMedalLevel()} />
            <ProgressStats user={user} nextMedal={nextMedal} />
          </div>

          {/* Right Column - Activity & Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="clay-card p-6 shadow-lg">
              <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-4">
                <div>
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
                Quick Actions
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link to={createPageUrl("Tasks")}>
                  <button
                    className="w-full clay-button p-4 rounded-2xl font-bold text-white relative overflow-hidden shadow-md"
                    style={{
                      background: 'linear-gradient(135deg, #4ade80 0%, #3b82f6 100%)',
                      boxShadow: '3px 3px 6px rgba(163, 177, 198, 0.3), -2px -2px 4px rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <Target className="w-5 h-5 mr-2" />
                      Start New Eco Task
                    </span>
                  </button>
                </Link>
                <Link to={createPageUrl("Learn")}>
                  <button
                    className="w-full clay-button p-4 rounded-2xl font-bold text-gray-700 shadow-md"
                    style={{
                      boxShadow: '3px 3px 6px rgba(163, 177, 198, 0.25), -2px -2px 4px rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    <BookOpen className="w-5 h-5 mr-2 inline text-purple-500" />
                    Learn Eco Tips
                  </button>
                </Link>
              </div>
            </div>

            {/* Recent Activity */}
            <RecentActivity tasks={recentTasks} />

            {/* Next Medal Progress */}
            {nextMedal.medal !== 'Complete!' && (
              <div className="clay-card p-6 shadow-lg">
                <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-4">
                  <div>
                    <Trophy className="w-6 h-6 text-yellow-500" />
                  </div>
                  Next Medal: {nextMedal.medal}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-600">Progress</span>
                    <span className="font-bold text-lg">
                      {nextMedal.current}/{nextMedal.needed} stars
                    </span>
                  </div>
                  <div className="w-full h-6 rounded-full overflow-hidden relative clay-card" style={{
                    background: 'linear-gradient(145deg, #f0f0f0, #ffffff)',
                    boxShadow: 'inset 2px 2px 4px rgba(255, 255, 255, 0.7), inset -2px -2px 4px rgba(163, 177, 198, 0.2)'
                  }}>
                    <div
                      className="h-full rounded-full relative"
                      style={{
                        width: `${(nextMedal.current / nextMedal.needed) * 100}%`,
                        background: 'linear-gradient(90deg, #fbbf24 0%, #f97316 100%)',
                        boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1), 0 0 10px rgba(251, 191, 36, 0.5)'
                      }}
                    >
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    {nextMedal.needed - nextMedal.current} more stars needed for your {nextMedal.medal} medal! 🏆
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}