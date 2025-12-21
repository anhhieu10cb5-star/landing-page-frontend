// src/components/common/AnimatedBackground.js
import React, { useEffect, useRef } from 'react';

function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles (small dots only)
    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor(window.innerWidth / 25);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          speedY: Math.random() * 0.3 + 0.1,
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      // Background gradient (gần như đen, hint xanh rất nhẹ)
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      bgGradient.addColorStop(0, '#040806');    // Tâm: gần đen, hint xanh rất nhẹ
      bgGradient.addColorStop(0.5, '#020403');  // Giữa
      bgGradient.addColorStop(1, '#000000');    // Viền đen
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Subtle glow ở giữa (rất rất nhẹ)
      const centerGlow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height * 0.4, 0,
        canvas.width / 2, canvas.height * 0.4, canvas.width * 0.4
      );
      centerGlow.addColorStop(0, 'rgba(0, 230, 122, 0.03)');
      centerGlow.addColorStop(0.5, 'rgba(0, 230, 122, 0.01)');
      centerGlow.addColorStop(1, 'rgba(0, 230, 122, 0)');
      
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw and update particles
      particles.forEach((particle) => {
        particle.y -= particle.speedY;
        
        // Reset particle when it goes off screen
        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 230, 122, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}

export default AnimatedBackground;