import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Target, Trophy, BookOpen, User, Leaf, Star } from "lucide-react";

const navigationItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
    color: "from-green-400 to-green-500"
  },
  {
    title: "Eco Tasks",
    url: "/tasks",
    icon: Target,
    color: "from-blue-400 to-blue-500"
  },
  {
    title: "Leaderboard", 
    url: "/leaderboard",
    icon: Trophy,
    color: "from-yellow-400 to-orange-400"
  },
  {
    title: "Learn",
    url: "/learn",
    icon: BookOpen,
    color: "from-purple-400 to-purple-500"
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
    color: "from-pink-400 to-pink-500"
  }
];

export default function Layout({ children }) {
  const location = useLocation();

  return (
    <>
      <style>
        {`
          /* Enhanced Claymorphism Theme - macOS Inspired */
          .clay-card {
            background: linear-gradient(145deg, #ffffff, #f0f0f0);
            box-shadow: 
              6px 6px 12px rgba(163, 177, 198, 0.3),
              -6px -6px 12px rgba(255, 255, 255, 0.8),
              inset 1px 1px 2px rgba(255, 255, 255, 0.6),
              inset -1px -1px 2px rgba(163, 177, 198, 0.2);
            border-radius: 18px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255, 255, 255, 0.7);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
          
          .clay-card:hover {
            box-shadow: 
              8px 8px 16px rgba(163, 177, 198, 0.35),
              -8px -8px 16px rgba(255, 255, 255, 0.9),
              inset 1px 1px 2px rgba(255, 255, 255, 0.7),
              inset -1px -1px 2px rgba(163, 177, 198, 0.25);
            transform: translateY(-1px);
          }
          
          .clay-card:active {
            box-shadow: 
              3px 3px 6px rgba(163, 177, 198, 0.3),
              -3px -3px 6px rgba(255, 255, 255, 0.8),
              inset 3px 3px 6px rgba(163, 177, 198, 0.2),
              inset -3px -3px 6px rgba(255, 255, 255, 0.5);
            transform: translateY(0);
          }
          
          .clay-button {
            background: linear-gradient(145deg, #ffffff, #f8f8f8);
            box-shadow: 
              4px 4px 8px rgba(163, 177, 198, 0.25),
              -4px -4px 8px rgba(255, 255, 255, 0.85),
              inset 1px 1px 2px rgba(255, 255, 255, 0.6),
              inset -1px -1px 2px rgba(163, 177, 198, 0.15);
            border-radius: 14px;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            border: 1px solid rgba(255, 255, 255, 0.8);
            font-weight: 500;
          }
          
          .clay-button:hover {
            box-shadow: 
              5px 5px 10px rgba(163, 177, 198, 0.3),
              -5px -5px 10px rgba(255, 255, 255, 0.9),
              inset 1px 1px 2px rgba(255, 255, 255, 0.7),
              inset -1px -1px 2px rgba(163, 177, 198, 0.2);
            transform: translateY(-0.5px);
          }
          
          .clay-button:active {
            box-shadow: 
              inset 3px 3px 6px rgba(163, 177, 198, 0.25),
              inset -3px -3px 6px rgba(255, 255, 255, 0.7);
            transform: translateY(0);
          }
          
          .clay-active {
            background: linear-gradient(145deg, #f0f0f0, #e8e8e8);
            box-shadow: 
              inset 4px 4px 8px rgba(163, 177, 198, 0.3),
              inset -4px -4px 8px rgba(255, 255, 255, 0.6),
              2px 2px 4px rgba(163, 177, 198, 0.2),
              -2px -2px 4px rgba(255, 255, 255, 0.7);
          }
          
          /* macOS-style focus ring */
          .clay-button:focus, .clay-card:focus {
            outline: 2px solid #4ade80;
            outline-offset: 1px;
            border-radius: 14px;
          }
          
          /* Smooth scrolling for better UX */
          html {
            scroll-behavior: smooth;
          }
          
          /* Custom scrollbar - macOS style */
          ::-webkit-scrollbar {
            width: 12px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(240, 240, 240, 0.3);
            border-radius: 6px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(180deg, #c0c0c0, #a0a0a0);
            border-radius: 6px;
            border: 3px solid rgba(240, 240, 240, 0.3);
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(180deg, #a0a0a0, #808080);
          }
          
          /* macOS-style title bar */
          .mac-title-bar {
            height: 50px;
            background: linear-gradient(to bottom, #f5f5f7, #e0e0e0);
            border-bottom: 1px solid #d0d0d0;
            display: flex;
            align-items: center;
            padding: 0 16px;
            -webkit-app-region: drag;
          }
          
          .mac-window-controls {
            display: flex;
            gap: 8px;
            -webkit-app-region: no-drag;
          }
          
          .mac-control {
            width: 12px;
            height: 12px;
            border-radius: 50%;
          }
          
          .mac-close { background: #ff5f56; }
          .mac-minimize { background: #ffbd2e; }
          .mac-maximize { background: #27c93f; }
        `}
      </style>
      
      <div className="min-h-screen flex w-full" style={{
        background: 'linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 50%, #fff9c4 100%)'
      }}>
        {/* Sidebar - macOS Style */}
        <div className="w-64 min-h-screen p-4 clay-card hidden md:block" style={{
          background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.75) 100%)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(163, 177, 198, 0.2)'
        }}>
          <div className="border-b border-gray-200 pb-6 mb-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center clay-card relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #4ade80 0%, #3b82f6 100%)',
                  boxShadow: '4px 4px 8px rgba(163, 177, 198, 0.3), -2px -2px 6px rgba(255, 255, 255, 0.8)'
                }}
              >
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-800">
                  Friendly Eco
                </h2>
                <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Clay Edition
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-2">
            <div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2 mb-1 flex items-center gap-2">
                <span>🌍</span>
                <span>Eco Adventures</span>
              </div>
              <div className="space-y-1">
                {navigationItems.map((item, index) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <div key={item.title}>
                      <div>
                        <Link 
                          to={item.url} 
                          className={`rounded-2xl p-3 flex items-center gap-3 w-full ${
                            isActive ? 'clay-active border-l-3 border-green-500' : 'clay-button'
                          }`}
                          style={{ display: 'block', textDecoration: 'none' }}
                        >
                          <div 
                            className={`w-8 h-8 rounded-xl flex items-center justify-center`}
                            style={{
                              background: isActive 
                                ? `linear-gradient(135deg, ${item.color})` 
                                : 'linear-gradient(145deg, #ffffff, #f8f8f8)',
                              boxShadow: isActive 
                                ? '2px 2px 4px rgba(163, 177, 198, 0.3), -1px -1px 3px rgba(255, 255, 255, 0.8)' 
                                : '2px 2px 4px rgba(163, 177, 198, 0.2), -1px -1px 3px rgba(255, 255, 255, 0.8)'
                            }}
                          >
                            <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                          </div>
                          <span 
                            className={`font-medium text-sm ${
                              isActive ? 'text-gray-800' : 'text-gray-600'
                            }`}
                          >
                            {item.title}
                          </span>
                          {isActive && (
                            <div
                              className="ml-auto w-2 h-2 rounded-full"
                              style={{
                                background: `linear-gradient(135deg, ${item.color})`
                              }}
                            />
                          )}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 flex flex-col">
          {/* Mobile header - macOS Style */}
          <header className="md:hidden clay-card" style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(163, 177, 198, 0.2)'
          }}>
            {/* macOS-style title bar for mobile */}
            <div className="mac-title-bar">
              <div className="mac-window-controls">
                <div className="mac-control mac-close"></div>
                <div className="mac-control mac-minimize"></div>
                <div className="mac-control mac-maximize"></div>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3">
              <div className="flex items-center gap-3">
                <Leaf className="w-8 h-8 text-green-500" />
                <h1 
                  className="text-xl font-bold text-gray-800"
                >
                  Friendly Eco
                </h1>
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </>
  );
}