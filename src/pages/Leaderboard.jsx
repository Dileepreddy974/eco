import React, { useState, useEffect } from "react";
import { User, Task } from "../Entities/all";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Trophy, Star, Medal, Crown } from "lucide-react";

// New LoadingAnimation Component
const LoadingAnimation = ({ message }) => {
  return (
    <div className="p-8 flex items-center justify-center min-h-screen bg-gray-50">
      <div
        className="text-center bg-white p-10 rounded-xl shadow-lg"
      >
        <div
          className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center"
        >
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Patience, Young Eco Warrior!</h2>
        <p className="text-lg font-semibold text-gray-600">{message}</p>
        <div
          className="h-1 bg-gradient-to-r from-blue-400 to-green-500 rounded-full mt-6 mx-auto w-3/4"
        ></div>
      </div>
    </div>
  );
};


export default function LeaderboardPage() {
  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLeaderboardData();
  }, []);

  const loadLeaderboardData = async () => {
    try {
      const user = await User.me();
      setCurrentUser(user);

      // Get all users with profile_photo or total_stars
      const allUsers = await User.list();
      const usersWithStars = allUsers
        .filter(u => u.total_stars > 0) // Filter for users with stars
        .sort((a, b) => (b.total_stars || 0) - (a.total_stars || 0))
        .slice(0, 20); // Top 20

      setStudents(usersWithStars);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
    }
    setIsLoading(false);
  };

  const getAvatarDisplay = (user) => {
    if (user.profile_photo) {
      return (
        <img 
          src={user.profile_photo} 
          alt={user.full_name || 'User avatar'}
          className="w-12 h-12 rounded-full object-cover clay-card"
        />
      );
    }
    // Fallback if no profile photo
    return (
      <div className="w-12 h-12 rounded-full flex items-center justify-center clay-card bg-gradient-to-br from-purple-200 to-pink-200 text-gray-700">
        <span className="text-2xl">👤</span>
      </div>
    );
  };

  const getRankEmoji = (position) => {
    switch (position) {
      case 1: return "👑";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return "🏅";
    }
  };

  const getRankColor = (position) => {
    switch (position) {
      case 1: return "from-yellow-400 to-orange-500";
      case 2: return "from-gray-300 to-gray-500";
      case 3: return "from-amber-400 to-amber-600";
      default: return "from-blue-400 to-blue-600";
    }
  };

  const getMedalLevel = (user) => {
    const { current_medals } = user;
    if (current_medals?.diamond > 0) return "Diamond Master";
    if (current_medals?.gold > 0) return "Gold Hero";
    if (current_medals?.silver > 0) return "Silver Warrior";
    if (current_medals?.bronze > 0) return "Bronze Explorer";
    return "Eco Beginner";
  };

  if (isLoading) {
    return <LoadingAnimation message="Loading leaderboard..." />;
  }

  return (
    <div className="p-4 md:p-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div 
          className="text-center mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-4">
            Eco Heroes Leaderboard 🏆
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            See how you rank against other eco warriors!
          </p>
        </div>

        {students.length === 0 ? (
          <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-yellow-50">
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">No Rankings Yet!</h3>
              <p className="text-gray-600">Be the first to complete eco-tasks and earn your place on the leaderboard!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Top 3 Podium */}
            {students.length >= 3 && (
              <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-yellow-50 mb-8">
                <CardHeader>
                  <CardTitle className="text-center text-xl font-bold text-gray-800">
                    🏆 Top 3 Eco Champions 🏆
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-6">
                    {students.slice(0, 3).map((student, index) => {
                      const position = index + 1;
                      return (
                        <div
                          key={student.id}
                          className={`text-center p-6 rounded-2xl bg-gradient-to-br ${getRankColor(position)} text-white transform ${position === 1 ? 'scale-110' : ''}`}
                        >
                          <div className="text-3xl mb-2">{getRankEmoji(position)}</div>
                          <div className="flex justify-center mb-3">
                            {getAvatarDisplay(student)}
                          </div>
                          <h3 className="font-bold text-lg mb-1">
                            {student.full_name?.split(' ')[0] || 'Anonymous'}
                          </h3>
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Star className="w-4 h-4 fill-white" />
                            <span className="font-bold">{student.total_stars || 0}</span>
                          </div>
                          <Badge className="bg-white/20 text-white border-0 text-xs">
                            {getMedalLevel(student)}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Full Rankings List */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl font-bold text-gray-800">
                  <Medal className="w-6 h-6 text-blue-500" />
                  Complete Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {students.map((student, index) => {
                    const position = index + 1;
                    const isCurrentUser = student.id === currentUser?.id;
                    
                    return (
                      <div
                        key={student.id}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all duration-300 ${
                          isCurrentUser 
                            ? 'border-blue-400 bg-blue-50 shadow-lg transform scale-105' 
                            : 'border-gray-100 bg-white hover:border-blue-200 hover:bg-blue-50'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-r ${getRankColor(position)}`}>
                          {position <= 3 ? getRankEmoji(position) : position}
                        </div>
                        
                        {getAvatarDisplay(student)}
                        
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-gray-800">
                            {student.full_name?.split(' ')[0] || 'Anonymous'}
                            {isCurrentUser && <span className="text-blue-600"> (You!)</span>}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            <Badge className="bg-gray-100 text-gray-700 text-xs">
                              {student.class_name || 'No class'}
                            </Badge>
                            <Badge className="bg-purple-100 text-purple-700 text-xs">
                              {getMedalLevel(student)}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="flex items-center gap-2 text-yellow-600 mb-1">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-xl">{student.total_stars || 0}</span>
                          </div>
                          <div className="text-sm text-gray-500">stars</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Current User's Position (if not in top 20) */}
            {currentUser && currentUser.total_stars > 0 && !students.find(s => s.id === currentUser.id) && (
              <Card className="shadow-xl border-2 border-blue-400 bg-blue-50">
                <CardContent className="p-4">
                  <div className="text-center">
                    <h3 className="font-bold text-lg text-blue-800 mb-2">Your Current Position</h3>
                    <div className="flex items-center justify-center gap-4">
                      {getAvatarDisplay(currentUser)}
                      <div>
                        <div className="font-bold text-lg">{currentUser.full_name?.split(' ')[0]}</div>
                        <div className="flex items-center gap-2 text-yellow-600">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-bold">{currentUser.total_stars} stars</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-blue-600 mt-2">Keep earning stars to climb the leaderboard! 🌟</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}