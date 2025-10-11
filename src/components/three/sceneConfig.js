// src/components/three/sceneConfig.js

const sceneConfig = {
  camera: {
    fov: 75,
    near: 0.1,
    far: 1000,
    position: { x: 0, y: 0, z: 50 }
  },
  lights: {
    ambient: { color: 0x222244, intensity: 0.3 },
    directional: { color: 0x6688ff, intensity: 0.5, position: { x: 5, y: 10, z: 7.5 } },
    point: { color: 0x0ea5e9, intensity: 1.0, position: { x: 0, y: 0, z: 0 } }
  },
  renderer: {
    alpha: true,
    antialias: true,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
  },
  performance: {
    maxParticles: 800,
    starCount: 3000,
    animationSpeed: 0.001,
    mouseInfluence: 0.05
  },
  background: {
    color: 0x000510,
    fogDensity: 0.0015
  }
};

export default sceneConfig;