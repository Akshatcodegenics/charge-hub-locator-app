
import React from 'react';
import { MapPin, Zap } from 'lucide-react';

interface Map3DProps {
  className?: string;
}

const Map3D: React.FC<Map3DProps> = ({ className = '' }) => {
  return (
    <div className={`relative perspective-1000 ${className}`}>
      <div className="transform-3d rotate-x-12 rotate-y-12 transition-transform duration-1000 hover:rotate-y-0 hover:rotate-x-0">
        {/* 3D Map Base */}
        <div className="relative w-80 h-60 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-white/20">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 320 240">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3b82f6" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Animated Roads */}
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse"></div>
            <div className="absolute top-2/3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500/50 to-transparent animate-pulse animation-delay-2000"></div>
            <div className="absolute left-1/3 top-0 bottom-0 w-2 bg-gradient-to-b from-transparent via-purple-500/50 to-transparent animate-pulse"></div>
            <div className="absolute left-2/3 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-orange-500/50 to-transparent animate-pulse animation-delay-4000"></div>
          </div>
          
          {/* Charging Station Markers */}
          <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse-glow"></div>
              <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-50 animate-ping"></div>
              <MapPin className="absolute top-0.5 left-0.5 w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="absolute top-1/2 right-1/3 transform translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse-glow animation-delay-2000"></div>
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-50 animate-ping animation-delay-2000"></div>
              <Zap className="absolute top-0.5 left-0.5 w-3 h-3 text-white" />
            </div>
          </div>
          
          <div className="absolute bottom-1/4 left-2/3 transform -translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse-glow animation-delay-4000"></div>
              <div className="absolute inset-0 bg-purple-500 rounded-full blur-md opacity-50 animate-ping animation-delay-4000"></div>
              <MapPin className="absolute top-0.5 left-0.5 w-3 h-3 text-white" />
            </div>
          </div>
          
          {/* Floating Data Points */}
          <div className="absolute top-1/6 right-1/4">
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-float"></div>
          </div>
          <div className="absolute bottom-1/6 left-1/6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-float animation-delay-2000"></div>
          </div>
          
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 pointer-events-none"></div>
        </div>
        
        {/* 3D Shadow */}
        <div className="absolute -bottom-4 -right-4 w-80 h-60 bg-black/20 rounded-2xl blur-xl -z-10 transform translate-z-[-50px]"></div>
      </div>
      
      {/* Floating Labels */}
      <div className="absolute -top-6 left-0 text-xs text-white/60 animate-fade-in">
        Real-time Data
      </div>
      <div className="absolute -bottom-6 right-0 text-xs text-white/60 animate-fade-in animation-delay-2000">
        3D Interactive Map
      </div>
    </div>
  );
};

export default Map3D;
