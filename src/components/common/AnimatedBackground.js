import React from 'react';

function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-white">
      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)',
        }}
      />
      {/* Subtle dots pattern */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
}

export default AnimatedBackground;
