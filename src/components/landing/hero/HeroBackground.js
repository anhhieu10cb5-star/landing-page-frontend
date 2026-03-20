import React from 'react';

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900"></div>
      
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-blue-500/30 via-transparent to-transparent rounded-full blur-3xl"></div>
      
      {/* Dots pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      ></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl animate-float"></div>
      <div className="absolute bottom-40 right-32 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl animate-float-delay"></div>
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-float-slow"></div>
      
      {/* Grid lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Curved bottom edge - SVG wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}

export default HeroBackground;
