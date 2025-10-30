import { Heart, Star } from "lucide-react";

export default function LoadingAnimation({ message = "Loading..." }) {
  return (
    <div className="p-8 flex items-center justify-center min-h-screen relative overflow-hidden">
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 20% 50%, #4ade80 0%, transparent 50%)"
        }}
      />

      <div
        className="relative z-10"
      >
        {/* Main clay loader container */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          {/* Outer rotating ring */}
          <div
            className="absolute inset-0 rounded-full clay-card"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)'
            }}
          >
            {/* Orbiting elements */}
            <div
              className="absolute w-12 h-12 rounded-2xl clay-card flex items-center justify-center"
              style={{ 
                top: -6, 
                left: '50%', 
                marginLeft: -24,
                background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)'
              }}
            >
              <Star className="w-6 h-6 text-white" />
            </div>
            
            <div
              className="absolute w-12 h-12 rounded-2xl clay-card flex items-center justify-center"
              style={{ 
                bottom: -6, 
                left: '50%', 
                marginLeft: -24,
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
              }}
            >
              <Star className="w-6 h-6 text-white" />
            </div>
            
            <div
              className="absolute w-12 h-12 rounded-2xl clay-card flex items-center justify-center"
              style={{ 
                top: '50%', 
                left: -6,
                marginTop: -24,
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
              }}
            >
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Middle pulsing ring */}
          <div
            className="absolute inset-8 rounded-full clay-card"
            style={{
              background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              boxShadow: '8px 8px 16px rgba(163, 177, 198, 0.3), -8px -8px 16px rgba(255, 255, 255, 0.8)'
            }}
          />

          {/* Inner rotating clay ball */}
          <div
            className="absolute inset-16 rounded-full clay-active flex items-center justify-center"
          >
            <div
              className="text-5xl"
            >
              🌱
            </div>
          </div>
        </div>

        {/* Bouncing clay dots */}
        <div className="flex justify-center gap-3 mb-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full clay-card"
              style={{
                background: i === 0 ? 'linear-gradient(135deg, #4ade80, #22c55e)' : 
                           i === 1 ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 
                           'linear-gradient(135deg, #fbbf24, #f59e0b)'
              }}
            />
          ))}
        </div>

        {/* Loading text */}
        <div
          className="text-center"
        >
          <p className="text-xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-pink-600 bg-clip-text text-transparent">
            {message}
          </p>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 rounded-full clay-card"
              style={{
                left: `${15 + (i % 4) * 25}%`,
                top: `${20 + Math.floor(i / 4) * 25}%`,
                background: i % 3 === 0 ? 'linear-gradient(135deg, #4ade80, #22c55e)' : 
                           i % 3 === 1 ? 'linear-gradient(135deg, #3b82f6, #2563eb)' : 
                           'linear-gradient(135deg, #ec4899, #db2777)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}