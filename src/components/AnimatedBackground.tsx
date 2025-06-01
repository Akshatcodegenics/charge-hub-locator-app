
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating Geometric Shapes */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full animate-float animation-delay-2000 blur-sm"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full animate-float blur-sm"></div>
      <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full animate-float animation-delay-4000 blur-sm"></div>
      
      {/* 3D Rotating Elements */}
      <div className="absolute top-1/2 right-1/3 perspective-1000">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500/30 to-purple-600/30 transform-3d animate-rotate-3d"></div>
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-r border-white/20"></div>
          ))}
        </div>
      </div>
      
      {/* Animated Lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.3"/>
          </linearGradient>
        </defs>
        <path
          d="M0,100 Q150,50 300,100 T600,100"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          fill="none"
          className="animate-pulse"
        />
        <path
          d="M0,200 Q200,150 400,200 T800,200"
          stroke="url(#line-gradient)"
          strokeWidth="1"
          fill="none"
          className="animate-pulse animation-delay-2000"
        />
      </svg>
      
      {/* Particle Effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
