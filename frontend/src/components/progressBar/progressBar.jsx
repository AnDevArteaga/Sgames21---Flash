import React, { useState, useEffect } from "react";
import { Flag, User } from "lucide-react";

const ModernVerticalProgressBar = ({ progress }) => {
  // Ensure progress is between 0 and 100
  const safeProgress = Math.min(100, Math.max(0, progress));
  const [sparkles, setSparkles] = useState([]);
  
  // Define color according to progress
  const getColor = () => {
    if (safeProgress < 30) return "bg-red-500";
    if (safeProgress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };
  
  // Define glow color based on progress
  const getGlowColor = () => {
    if (safeProgress < 30) return "shadow-red-500";
    if (safeProgress < 70) return "shadow-yellow-500";
    return "shadow-green-500";
  };
  
  // Create sparkle effect when progress changes
  useEffect(() => {
    if (sparkles.length < 10) {
      const newSparkle = {
        id: Date.now(),
        left: Math.random() * 100 - 50,
        size: Math.random() * 4 + 2
      };
      setSparkles([...sparkles, newSparkle]);
      
      // Remove sparkle after animation
      setTimeout(() => {
        setSparkles(current => current.filter(s => s.id !== newSparkle.id));
      }, 700);
    }
  }, [progress]);
  
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4">
      {/* Goal flag at the top */}
      <div className="mb-2">
        <Flag size={24} className="text-white" />
      </div>
      
      {/* Progress bar container */}
      <div className="relative w-8 h-64 bg-gray-200 rounded-full overflow-hidden shadow-lg flex flex-col justify-end">
        {/* Progress fill with glow effect */}
        <div
          className={`w-full ${getColor()} transition-all duration-500 ease-in-out relative shadow-lg`}
          style={{ 
            height: `${safeProgress}%`,
            boxShadow: `0 0 15px 2px ${safeProgress < 30 ? '#ef4444' : safeProgress < 70 ? '#eab308' : '#22c55e'}`
          }}
        >
          {/* Shine effect overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-transparent via-white to-transparent opacity-30"></div>
        </div>
        
        {/* Indicator icon that moves with progress */}
        <div 
          className="absolute left-0 w-full flex justify-center transition-all duration-500 ease-in-out"
          style={{ bottom: `${safeProgress}%` }}
        >
          <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg ${getGlowColor()} p-1`}>
            <User className={`${safeProgress < 30 ? 'text-red-500' : safeProgress < 70 ? 'text-yellow-500' : 'text-green-500'}`} />
          </div>
        </div>
        
        {/* Sparkles container */}
        <div className="absolute w-full h-full pointer-events-none">
          {sparkles.map(sparkle => (
            <div
              key={sparkle.id}
              className="absolute animate-ping opacity-70"
              style={{
                bottom: `${safeProgress}%`,
                left: `${sparkle.left}%`,
                width: `${sparkle.size}px`,
                height: `${sparkle.size}px`,
                backgroundColor: safeProgress < 30 ? '#ef4444' : safeProgress < 70 ? '#eab308' : '#22c55e',
                borderRadius: '50%',
                filter: 'blur(1px)',
                animation: 'ping 0.8s cubic-bezier(0, 0, 0.2, 1)'
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Progress percentage text */}
      <div className="mt-2 font-bold text-lg text-white">
        {safeProgress}%
      </div>
    </div>
  );
};

export default ModernVerticalProgressBar;