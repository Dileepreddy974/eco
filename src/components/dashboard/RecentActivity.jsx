import React from "react";
import { Badge } from "../ui/badge";
import { Clock, Star, CheckCircle, XCircle, Loader } from "lucide-react";
import { format } from "date-fns";

export default function RecentActivity({ tasks }) {
  const getTaskEmoji = (taskType) => {
    const emojis = {
      cleanup: "🧹",
      planting: "🌱", 
      recycling: "♻️",
      water_saving: "💧",
      energy_saving: "⚡"
    };
    return emojis[taskType] || "🌍";
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Loader className="w-4 h-4 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'verified': return <Badge className="bg-green-100 text-green-800 border-green-200">Verified ✓</Badge>;
      case 'rejected': return <Badge className="bg-red-100 text-red-800 border-red-200">Needs Review</Badge>;
      default: return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Checking...</Badge>;
    }
  };

  return (
    <div
      className="clay-card p-6"
    >
      <h3 className="flex items-center gap-3 text-xl font-bold text-gray-800 mb-4">
        <Clock className="w-6 h-6 text-green-500" />
        Recent Activity
      </h3>
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div 
            className="text-4xl mb-4"
          >
            🌱
          </div>
          <p className="text-lg font-medium">No activities yet!</p>
          <p className="text-sm">Complete your first eco-task to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <div 
              key={task.id}
              className="flex items-center gap-4 p-4 rounded-2xl clay-card"
            >
              <div 
                className="text-2xl"
              >
                {getTaskEmoji(task.task_type)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{task.task_title}</h4>
                <p className="text-sm text-gray-600">{format(new Date(task.created_date), 'MMM d, h:mm a')}</p>
              </div>
              <div className="flex items-center gap-2">
                {task.verification_status === 'verified' && task.stars_earned > 0 && (
                  <div 
                    className="flex items-center gap-1 text-yellow-600"
                  >
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-sm">{task.stars_earned}</span>
                  </div>
                )}
                {getStatusBadge(task.verification_status)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}