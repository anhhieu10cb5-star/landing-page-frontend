// src/components/three/ThreeBackground.js

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ParticleSystem from './ParticleSystem';
import sceneConfig from './sceneConfig';

const ThreeBackground = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particleSystemRef = useRef(null);
  const nebulaRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameIdRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(sceneConfig.background.color);
    scene.fog = new THREE.FogExp2(sceneConfig.background.color, sceneConfig.background.fogDensity);
    
    // Nebula background with shader
    const nebulaGeometry = new THREE.SphereGeometry(400, 64, 64);
    const nebulaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        float random(vec2 st) {
          return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }
        
        float noise(vec2 st) {
          vec2 i = floor(st);
          vec2 f = fract(st);
          float a = random(i);
          float b = random(i + vec2(1.0, 0.0));
          float c = random(i + vec2(0.0, 1.0));
          float d = random(i + vec2(1.0, 1.0));
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
        }
        
        void main() {
          vec2 uv = vUv * 2.0;
          float n = noise(uv * 3.0 + time * 0.0001);
          
          vec3 color1 = vec3(0.02, 0.0, 0.1);
          vec3 color2 = vec3(0.05, 0.02, 0.15);
          vec3 color3 = vec3(0.0, 0.05, 0.15);
          vec3 color4 = vec3(0.1, 0.0, 0.2);
          
          float mixValue = sin(vUv.x * 4.0 + time * 0.0002) * cos(vUv.y * 4.0 + time * 0.0003);
          vec3 color = mix(color1, color2, n);
          color = mix(color, color3, mixValue * 0.5 + 0.5);
          color = mix(color, color4, vUv.y * 0.3);
          
          float alpha = 0.4 * (1.0 - vUv.y * 0.5);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      depthWrite: false
    });
    
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
    scene.add(nebula);
    nebulaRef.current = nebula;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      sceneConfig.camera.fov,
      window.innerWidth / window.innerHeight,
      sceneConfig.camera.near,
      sceneConfig.camera.far
    );
    camera.position.set(
      sceneConfig.camera.position.x,
      sceneConfig.camera.position.y,
      sceneConfig.camera.position.z
    );

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: sceneConfig.renderer.alpha,
      antialias: sceneConfig.renderer.antialias
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(sceneConfig.renderer.pixelRatio);

    // Lights
    const ambientLight = new THREE.AmbientLight(
      sceneConfig.lights.ambient.color,
      sceneConfig.lights.ambient.intensity
    );
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      sceneConfig.lights.directional.color,
      sceneConfig.lights.directional.intensity
    );
    directionalLight.position.set(
      sceneConfig.lights.directional.position.x,
      sceneConfig.lights.directional.position.y,
      sceneConfig.lights.directional.position.z
    );
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(
      sceneConfig.lights.point.color,
      sceneConfig.lights.point.intensity
    );
    pointLight.position.set(
      sceneConfig.lights.point.position.x,
      sceneConfig.lights.point.position.y,
      sceneConfig.lights.point.position.z
    );
    scene.add(pointLight);

    // Particle system
    const particleSystem = new ParticleSystem(
      scene, 
      sceneConfig.performance.maxParticles,
      sceneConfig.performance.starCount
    );

    // Store refs
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    particleSystemRef.current = particleSystem;

    // Mouse move handler
    const handleMouseMove = (event) => {
      mouseRef.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    // Resize handler
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Animation loop
    const animate = (time) => {
      frameIdRef.current = requestAnimationFrame(animate);

      // Update nebula shader time
      if (nebulaRef.current && nebulaRef.current.material.uniforms) {
        nebulaRef.current.material.uniforms.time.value = time;
      }

      // Camera follows mouse
      if (cameraRef.current) {
        cameraRef.current.position.x += (mouseRef.current.x * 10 - cameraRef.current.position.x) * sceneConfig.performance.mouseInfluence;
        cameraRef.current.position.y += (mouseRef.current.y * 10 - cameraRef.current.position.y) * sceneConfig.performance.mouseInfluence;
        cameraRef.current.lookAt(sceneRef.current.position);
      }

      // Animate particles
      if (particleSystemRef.current) {
        particleSystemRef.current.animate(time, mouseRef.current.x, mouseRef.current.y);
      }

      // Render scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate(0);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }

      if (particleSystemRef.current) {
        particleSystemRef.current.dispose();
      }

      if (nebulaRef.current) {
        nebulaRef.current.geometry.dispose();
        nebulaRef.current.material.dispose();
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ThreeBackground;