import React, { useState } from "react";
import { Lightbulb } from "lucide-react";

const ECO_TIPS = [
  {
    category: "Water Conservation",
    emoji: "💧",
    colorGradient: "linear-gradient(135deg, #60A5FA, #22D3EE)",
    tips: [
      "Turn off the tap while brushing your teeth - you can save up to 8 gallons of water per day!",
      "Take shorter showers - each minute you reduce saves 2.5 gallons of water.",
      "Fix leaky faucets immediately - a dripping tap can waste over 3,000 gallons per year!",
      "Collect rainwater in buckets to water plants instead of using the hose.",
      "Only run the dishwasher and washing machine when they're full."
    ]
  },
  {
    category: "Energy Saving",
    emoji: "⚡",
    colorGradient: "linear-gradient(135deg, #FACC15, #F97316)",
    tips: [
      "Turn off lights when leaving a room - this simple act can reduce energy use by 10%.",
      "Unplug electronics when not in use - they still use energy even when turned off!",
      "Use natural light during the day instead of turning on lamps.",
      "Set your computer to sleep mode when you're not using it.",
      "Ask your family to lower the thermostat by 2°F - it can save 6% on energy bills!"
    ]
  },
  {
    category: "Waste Reduction",
    emoji: "♻️",
    colorGradient: "linear-gradient(135deg, #4ADE80, #10B981)",
    tips: [
      "Use both sides of paper before throwing it away.",
      "Bring reusable bags when shopping instead of using plastic ones.",
      "Recycle plastic bottles, cans, and paper in the correct bins.",
      "Compost food scraps to create nutrient-rich soil for plants.",
      "Donate toys and clothes you've outgrown instead of throwing them away."
    ]
  },
  {
    category: "Nature Protection",
    emoji: "🌱",
    colorGradient: "linear-gradient(135deg, #22C55E, #16A34A)",
    tips: [
      "Plant native flowers and trees that support local wildlife.",
      "Never litter - always throw trash in proper bins or take it home.",
      "Create a small garden or herb patch to grow your own food.",
      "Feed birds with seeds, but avoid giving them bread which isn't healthy for them.",
      "Learn about local animals and plants to better understand your ecosystem."
    ]
  }
];

export default function LearnPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div 
      className="p-4 md:p-8 min-h-screen"
    >
      <div className="max-w-6xl mx-auto">
        <div 
          className="text-center mb-8"
        >
          <h1 
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Eco Learning Center 📚
          </h1>
          <p 
            className="text-lg text-gray-700 font-medium"
          >
            Discover amazing ways to help our planet every day!
          </p>
        </div>

        {!selectedCategory ? (
          <div className="grid md:grid-cols-2 gap-6">
            {ECO_TIPS.map((category, index) => (
              <div
                key={category.category}
                className="cursor-pointer p-8 overflow-hidden rounded-3xl clay-card"
                style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                onClick={() => setSelectedCategory(category)}
              >
                <div className="text-center relative z-10">
                  <div 
                    className="w-20 h-20 mx-auto mb-4 rounded-3xl flex items-center justify-center clay-card relative"
                    style={{ background: category.colorGradient, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
                  >
                    <span className="text-4xl">{category.emoji}</span>
                    <div
                      className="absolute inset-0 rounded-3xl"
                      style={{ background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.3))' }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{category.category}</h3>
                  <p className="text-gray-600 mb-4">Learn about {category.category.toLowerCase()} and how small actions make a big difference!</p>
                  <div
                    className="inline-block px-4 py-2 rounded-full text-white font-bold"
                    style={{ background: category.colorGradient }}
                  >
                    {category.tips.length} Tips Available
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div
              className="flex items-center gap-4 mb-6"
            >
              <button
                onClick={() => setSelectedCategory(null)}
                className="p-4 rounded-full clay-button text-gray-800 font-bold text-xl"
              >
                ←
              </button>
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 rounded-3xl flex items-center justify-center clay-card"
                  style={{ background: selectedCategory.colorGradient }}
                >
                  <span className="text-3xl">{selectedCategory.emoji}</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedCategory.category}
                </h2>
              </div>
            </div>

            <div className="grid gap-4">
              {selectedCategory.tips.map((tip, index) => (
                <div
                  key={index}
                  className="p-6 rounded-3xl clay-card"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-1 clay-card"
                      style={{ background: selectedCategory.colorGradient }}
                    >
                      <Lightbulb className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800 text-lg leading-relaxed font-medium">{tip}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="p-8 text-center overflow-hidden relative rounded-3xl clay-card"
              style={{ background: selectedCategory.colorGradient }}
            >
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2), transparent)' }}
              />
              <div className="relative z-10">
                <div 
                  className="text-5xl mb-4"
                >
                  🌟
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Ready to Take Action?</h3>
                <p className="text-white text-lg">
                  Use these tips in your daily life and upload photos of your eco-actions to earn stars!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}