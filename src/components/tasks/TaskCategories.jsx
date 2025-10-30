import React from "react";
import { Star, ArrowRight } from "lucide-react";

export default function TaskCategories({ tasks, onTaskSelect }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task, index) => (
        <div
          key={task.category}
          className="clay-card p-6 rounded-2xl cursor-pointer relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          onClick={() => onTaskSelect(task)}
          style={{
            background: `linear-gradient(135deg, ${task.color.split(' ')[0]} 0%, ${task.color.split(' ')[2]} 100%)`
          }}
        >
          <div className="absolute inset-0 bg-white opacity-10"></div>
          <div className="relative z-10">
            <div className="text-4xl mb-4">{task.emoji}</div>
            <h3 className="text-xl font-bold text-white mb-2">{task.title}</h3>
            <p className="text-white/90 text-sm mb-4">{task.description}</p>
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-white text-sm font-bold">
                <Star className="w-4 h-4 fill-white" />
                <span>{task.points} Stars</span>
              </span>
              <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                <ArrowRight className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}