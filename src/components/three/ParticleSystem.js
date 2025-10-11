// src/components/three/ParticleSystem.js - FULL VIP EDITION
// Part 1: Class setup + Basic systems

import * as THREE from 'three';

class ParticleSystem {
  constructor(scene, count = 800, starCount = 3000) {
    this.scene = scene;
    this.count = count;
    this.starCount = starCount;
    
    // Existing systems
    this.particles = null;
    this.stars = null;
    this.milkyWay = null;
    this.geometricShapes = [];
    this.shootingStars = [];
    this.constellationLines = null;
    
    // NEW VIP SYSTEMS
    this.nebulaClouds = [];
    this.planets = [];
    this.particleTrails = [];
    this.auroraEffect = null;
    this.starfieldLayers = [];
    this.mousePosition = { x: 0, y: 0 };
    this.targetMousePosition = { x: 0, y: 0 };
    
    this.init();
  }

  init() {
    this.createStarfieldLayers(); // NEW: Multi-layer parallax stars
    this.createStarfield();
    this.createMilkyWay();
    this.createNebulaClouds(); // NEW: Nebula clouds
    this.createPlanets(); // NEW: Planets
    this.createAuroraEffect(); // NEW: Aurora
    this.createParticles();
    this.createParticleTrails(); // NEW: Particle trails
    this.createGeometricShapes();
    this.createShootingStars();
    this.createConstellationLines();
  }

  // NEW: Multi-layer starfield for parallax effect
  createStarfieldLayers() {
    const layers = [
      { count: 2000, range: 800, speed: 0.00002, size: [0.3, 1.0], name: 'far' },
      { count: 1500, range: 500, speed: 0.00005, size: [0.8, 2.0], name: 'mid' },
      { count: 1000, range: 300, speed: 0.0001, size: [1.5, 3.0], name: 'near' }
    ];

    layers.forEach((layer, layerIndex) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(layer.count * 3);
      const colors = new Float32Array(layer.count * 3);
      const sizes = new Float32Array(layer.count);
      const alphas = new Float32Array(layer.count);

      for (let i = 0; i < layer.count; i++) {
        const i3 = i * 3;
        
        positions[i3] = (Math.random() - 0.5) * layer.range;
        positions[i3 + 1] = (Math.random() - 0.5) * layer.range;
        positions[i3 + 2] = (Math.random() - 0.5) * layer.range;

        const colorChoice = Math.random();
        if (colorChoice > 0.95) {
          colors[i3] = 0.5 + Math.random() * 0.5;
          colors[i3 + 1] = 0.8 + Math.random() * 0.2;
          colors[i3 + 2] = 1.0;
        } else if (colorChoice > 0.9) {
          colors[i3] = 1.0;
          colors[i3 + 1] = 0.9 + Math.random() * 0.1;
          colors[i3 + 2] = 0.8 + Math.random() * 0.2;
        } else {
          colors[i3] = 0.9 + Math.random() * 0.1;
          colors[i3 + 1] = 0.9 + Math.random() * 0.1;
          colors[i3 + 2] = 1.0;
        }

        sizes[i] = layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]);
        
        // Depth of field effect
        const distance = Math.sqrt(
          positions[i3] ** 2 + 
          positions[i3 + 1] ** 2 + 
          positions[i3 + 2] ** 2
        );
        const normalizedDistance = distance / layer.range;
        alphas[i] = layerIndex === 0 ? 0.3 + normalizedDistance * 0.3 : 0.6 + normalizedDistance * 0.4;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 }
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          attribute float alpha;
          varying vec3 vColor;
          varying float vAlpha;
          
          void main() {
            vColor = color;
            vAlpha = alpha;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform float time;
          varying vec3 vColor;
          varying float vAlpha;
          
          float star5(vec2 p, float r, float rf) {
            const vec2 k1 = vec2(0.809016994375, -0.587785252292);
            const vec2 k2 = vec2(-k1.x, k1.y);
            p.x = abs(p.x);
            p -= 2.0 * max(dot(k1, p), 0.0) * k1;
            p -= 2.0 * max(dot(k2, p), 0.0) * k2;
            p.x = abs(p.x);
            p.y -= r;
            vec2 ba = rf * vec2(-k1.y, k1.x) - vec2(0, 1);
            float h = clamp(dot(p, ba) / dot(ba, ba), 0.0, r);
            return length(p - ba * h) * sign(p.y * ba.x - p.x * ba.y);
          }
          
          void main() {
            vec2 center = gl_PointCoord - 0.5;
            float dist = star5(center * 2.0, 0.5, 0.4);
            
            float alpha = 1.0 - smoothstep(0.0, 0.1, dist);
            float glow = exp(-dist * 8.0) * 0.5;
            alpha += glow;
            
            float twinkle = sin(time * 0.002 + gl_FragCoord.x * 0.1) * 0.3 + 0.7;
            alpha *= twinkle * vAlpha;
            
            vec3 finalColor = vColor * (1.0 + glow * 0.5);
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });

      const points = new THREE.Points(geometry, material);
      this.scene.add(points);
      
      this.starfieldLayers.push({
        points,
        speed: layer.speed,
        name: layer.name
      });
    });
  }

  createStarfield() {
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(this.starCount * 3);
    const starColors = new Float32Array(this.starCount * 3);
    const starSizes = new Float32Array(this.starCount);
    
    for (let i = 0; i < this.starCount; i++) {
      const i3 = i * 3;
      
      starPositions[i3] = (Math.random() - 0.5) * 600;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 600;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 600;
      
      const colorChoice = Math.random();
      if (colorChoice > 0.95) {
        starColors[i3] = 0.5 + Math.random() * 0.5;
        starColors[i3 + 1] = 0.8 + Math.random() * 0.2;
        starColors[i3 + 2] = 1.0;
      } else if (colorChoice > 0.9) {
        starColors[i3] = 1.0;
        starColors[i3 + 1] = 0.9 + Math.random() * 0.1;
        starColors[i3 + 2] = 0.8 + Math.random() * 0.2;
      } else {
        starColors[i3] = 0.9 + Math.random() * 0.1;
        starColors[i3 + 1] = 0.9 + Math.random() * 0.1;
        starColors[i3 + 2] = 1.0;
      }
      
      starSizes[i] = Math.random() * 2.5 + 0.5;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
    
    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePos: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vSize;
        uniform vec2 mousePos;
        
        void main() {
          vColor = color;
          vSize = size;
          
          vec3 pos = position;
          
          // Interactive: stars avoid mouse
          vec2 mouseInfluence = mousePos * 100.0;
          float distToMouse = length(pos.xy - mouseInfluence);
          if (distToMouse < 50.0) {
            vec2 away = normalize(pos.xy - mouseInfluence);
            pos.xy += away * (50.0 - distToMouse) * 0.3;
          }
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vColor;
        varying float vSize;
        
        float star5(vec2 p, float r, float rf) {
          const vec2 k1 = vec2(0.809016994375, -0.587785252292);
          const vec2 k2 = vec2(-k1.x, k1.y);
          p.x = abs(p.x);
          p -= 2.0 * max(dot(k1, p), 0.0) * k1;
          p -= 2.0 * max(dot(k2, p), 0.0) * k2;
          p.x = abs(p.x);
          p.y -= r;
          vec2 ba = rf * vec2(-k1.y, k1.x) - vec2(0, 1);
          float h = clamp(dot(p, ba) / dot(ba, ba), 0.0, r);
          return length(p - ba * h) * sign(p.y * ba.x - p.x * ba.y);
        }
        
        void main() {
          vec2 center = gl_PointCoord - 0.5;
          float dist = star5(center * 2.0, 0.5, 0.4);
          
          float alpha = 1.0 - smoothstep(0.0, 0.1, dist);
          float glow = exp(-dist * 8.0) * 0.5;
          alpha += glow;
          
          float twinkle = sin(time * 0.002 + vSize * 100.0) * 0.3 + 0.7;
          alpha *= twinkle;
          
          vec3 finalColor = vColor * (1.0 + glow * 0.5);
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    this.stars = new THREE.Points(starGeometry, starMaterial);
    this.scene.add(this.stars);
  }

  createMilkyWay() {
    const milkyWayCount = 5000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(milkyWayCount * 3);
    const colors = new Float32Array(milkyWayCount * 3);
    const sizes = new Float32Array(milkyWayCount);
    
    for (let i = 0; i < milkyWayCount; i++) {
      const i3 = i * 3;
      
      const angle = Math.random() * Math.PI * 2;
      const radius = 150 + Math.random() * 100;
      const thickness = (Math.random() - 0.5) * 30;
      const curve = Math.sin(angle * 3) * 20;
      
      positions[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * 50;
      positions[i3 + 1] = thickness + curve;
      positions[i3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * 50;
      
      const colorType = Math.random();
      if (colorType > 0.7) {
        colors[i3] = 0.6 + Math.random() * 0.3;
        colors[i3 + 1] = 0.4 + Math.random() * 0.3;
        colors[i3 + 2] = 0.8 + Math.random() * 0.2;
      } else if (colorType > 0.4) {
        colors[i3] = 0.4 + Math.random() * 0.3;
        colors[i3 + 1] = 0.6 + Math.random() * 0.3;
        colors[i3 + 2] = 0.9 + Math.random() * 0.1;
      } else {
        colors[i3] = 0.85 + Math.random() * 0.15;
        colors[i3 + 1] = 0.85 + Math.random() * 0.15;
        colors[i3 + 2] = 0.9 + Math.random() * 0.1;
      }
      
      sizes[i] = Math.random() * 1.5 + 0.3;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vColor;
        
        float star5(vec2 p, float r, float rf) {
          const vec2 k1 = vec2(0.809016994375, -0.587785252292);
          const vec2 k2 = vec2(-k1.x, k1.y);
          p.x = abs(p.x);
          p -= 2.0 * max(dot(k1, p), 0.0) * k1;
          p -= 2.0 * max(dot(k2, p), 0.0) * k2;
          p.x = abs(p.x);
          p.y -= r;
          vec2 ba = rf * vec2(-k1.y, k1.x) - vec2(0, 1);
          float h = clamp(dot(p, ba) / dot(ba, ba), 0.0, r);
          return length(p - ba * h) * sign(p.y * ba.x - p.x * ba.y);
        }
        
        void main() {
          vec2 center = gl_PointCoord - 0.5;
          float dist = star5(center * 2.0, 0.5, 0.35);
          
          float alpha = 1.0 - smoothstep(-0.05, 0.15, dist);
          float glow = exp(-dist * 6.0) * 0.6;
          alpha += glow;
          
          vec3 finalColor = vColor * (1.0 + glow * 0.8);
          
          gl_FragColor = vec4(finalColor, alpha * 0.7);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    this.milkyWay = new THREE.Points(geometry, material);
    this.milkyWay.rotation.x = Math.PI / 6;
    this.scene.add(this.milkyWay);
  }

  // Continue in Part 2...
  // NEW: Nebula clouds - Volumetric clouds in space
  createNebulaClouds() {
    const cloudCount = 5;
    
    for (let i = 0; i < cloudCount; i++) {
      const particleCount = 800;
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const sizes = new Float32Array(particleCount);
      
      const centerX = (Math.random() - 0.5) * 400;
      const centerY = (Math.random() - 0.5) * 400;
      const centerZ = -100 - Math.random() * 200;
      const cloudSize = 40 + Math.random() * 60;
      
      for (let j = 0; j < particleCount; j++) {
        const j3 = j * 3;
        
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = Math.random() * cloudSize;
        
        positions[j3] = centerX + r * Math.sin(phi) * Math.cos(theta);
        positions[j3 + 1] = centerY + r * Math.sin(phi) * Math.sin(theta);
        positions[j3 + 2] = centerZ + r * Math.cos(phi);
        
        const colorType = Math.random();
        if (colorType > 0.6) {
          colors[j3] = 0.4 + Math.random() * 0.2;
          colors[j3 + 1] = 0.2 + Math.random() * 0.2;
          colors[j3 + 2] = 0.6 + Math.random() * 0.3;
        } else if (colorType > 0.3) {
          colors[j3] = 0.2 + Math.random() * 0.2;
          colors[j3 + 1] = 0.4 + Math.random() * 0.2;
          colors[j3 + 2] = 0.7 + Math.random() * 0.2;
        } else {
          colors[j3] = 0.5 + Math.random() * 0.2;
          colors[j3 + 1] = 0.3 + Math.random() * 0.2;
          colors[j3 + 2] = 0.5 + Math.random() * 0.2;
        }
        
        sizes[j] = 3 + Math.random() * 8;
      }
      
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
      
      const material = new THREE.PointsMaterial({
        size: 5,
        vertexColors: true,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        depthWrite: false
      });
      
      const cloud = new THREE.Points(geometry, material);
      this.scene.add(cloud);
      
      this.nebulaClouds.push({
        mesh: cloud,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.0003,
          y: (Math.random() - 0.5) * 0.0005,
          z: (Math.random() - 0.5) * 0.0003
        },
        driftSpeed: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01
        }
      });
    }
  }

  // NEW: Planets with rim lighting
  createPlanets() {
    const planetConfigs = [
      { radius: 15, color: 0x4a5568, emissive: 0x0ea5e9, position: { x: -120, y: 80, z: -200 } },
      { radius: 10, color: 0x6366f1, emissive: 0x8b5cf6, position: { x: 150, y: -60, z: -250 } },
      { radius: 8, color: 0x0891b2, emissive: 0x06b6d4, position: { x: 100, y: 100, z: -180 } }
    ];

    planetConfigs.forEach(config => {
      const geometry = new THREE.SphereGeometry(config.radius, 32, 32);
      
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          color: { value: new THREE.Color(config.color) },
          emissive: { value: new THREE.Color(config.emissive) }
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPosition = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float time;
          uniform vec3 color;
          uniform vec3 emissive;
          varying vec3 vNormal;
          varying vec3 vPosition;
          
          void main() {
            vec3 viewDirection = normalize(cameraPosition - vPosition);
            float rim = 1.0 - max(0.0, dot(viewDirection, vNormal));
            rim = pow(rim, 3.0);
            
            float fresnel = pow(1.0 - dot(viewDirection, vNormal), 2.0);
            
            vec3 finalColor = color + emissive * rim * 2.0;
            float alpha = 0.7 + rim * 0.3;
            
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        side: THREE.FrontSide,
        depthWrite: false
      });
      
      const planet = new THREE.Mesh(geometry, material);
      planet.position.set(config.position.x, config.position.y, config.position.z);
      
      this.scene.add(planet);
      this.planets.push({
        mesh: planet,
        rotationSpeed: (Math.random() - 0.5) * 0.002,
        orbitSpeed: (Math.random() - 0.5) * 0.0001,
        orbitRadius: Math.sqrt(config.position.x ** 2 + config.position.y ** 2),
        orbitAngle: Math.atan2(config.position.y, config.position.x)
      });
    });
  }

  // NEW: Aurora effect
  createAuroraEffect() {
    const geometry = new THREE.PlaneGeometry(400, 100, 64, 32);
    
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        uniform float time;
        
        void main() {
          vUv = uv;
          vPosition = position;
          
          vec3 pos = position;
          pos.z += sin(pos.x * 0.05 + time * 0.001) * 15.0;
          pos.z += cos(pos.y * 0.08 + time * 0.0008) * 10.0;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;
        
        vec3 palette(float t) {
          vec3 a = vec3(0.5, 0.5, 0.5);
          vec3 b = vec3(0.5, 0.5, 0.5);
          vec3 c = vec3(1.0, 1.0, 1.0);
          vec3 d = vec3(0.563, 0.416, 0.457);
          return a + b * cos(6.28318 * (c * t + d));
        }
        
        void main() {
          vec2 uv = vUv;
          
          float wave1 = sin(uv.x * 3.0 + time * 0.001) * 0.5 + 0.5;
          float wave2 = sin(uv.x * 5.0 - time * 0.0008) * 0.5 + 0.5;
          float wave3 = sin(uv.x * 7.0 + time * 0.0012) * 0.5 + 0.5;
          
          float combinedWave = (wave1 + wave2 + wave3) / 3.0;
          
          float fadeY = smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);
          float fadeX = smoothstep(0.0, 0.1, uv.x) * smoothstep(1.0, 0.9, uv.x);
          
          vec3 color1 = vec3(0.4, 0.2, 0.8);
          vec3 color2 = vec3(0.2, 0.6, 0.9);
          vec3 color3 = vec3(0.6, 0.3, 0.7);
          
          vec3 finalColor = mix(color1, color2, combinedWave);
          finalColor = mix(finalColor, color3, wave3);
          
          float alpha = combinedWave * fadeY * fadeX * 0.25;
          
          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    
    this.auroraEffect = new THREE.Mesh(geometry, material);
    this.auroraEffect.position.set(0, 50, -150);
    this.auroraEffect.rotation.x = -Math.PI / 6;
    this.scene.add(this.auroraEffect);
  }

  // NEW: Particle trails
  createParticleTrails() {
    const trailCount = 300;
    
    for (let i = 0; i < trailCount; i++) {
      const trailLength = 15;
      const points = [];
      const startPos = new THREE.Vector3(
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300,
        (Math.random() - 0.5) * 300
      );
      
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.5
      );
      
      for (let j = 0; j < trailLength; j++) {
        const point = startPos.clone().add(velocity.clone().multiplyScalar(-j));
        points.push(point);
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const colors = new Float32Array(trailLength * 3);
      
      const baseColor = new THREE.Color();
      baseColor.setHSL(0.55 + Math.random() * 0.15, 0.7, 0.6);
      
      for (let j = 0; j < trailLength; j++) {
        const j3 = j * 3;
        colors[j3] = baseColor.r;
        colors[j3 + 1] = baseColor.g;
        colors[j3 + 2] = baseColor.b;
      }
      
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
      });
      
      const line = new THREE.Line(geometry, material);
      this.scene.add(line);
      
      this.particleTrails.push({
        line,
        points,
        velocity,
        baseOpacity: 0.2 + Math.random() * 0.3
      });
    }
  }

  createParticles() {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.count * 3);
    const colors = new Float32Array(this.count * 3);
    const sizes = new Float32Array(this.count);

    for (let i = 0; i < this.count; i++) {
      const i3 = i * 3;
      
      positions[i3] = (Math.random() - 0.5) * 200;
      positions[i3 + 1] = (Math.random() - 0.5) * 200;
      positions[i3 + 2] = (Math.random() - 0.5) * 200;

      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.15 + 0.5, 0.6, 0.5);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec3 vColor;
        
        float star5(vec2 p, float r, float rf) {
          const vec2 k1 = vec2(0.809016994375, -0.587785252292);
          const vec2 k2 = vec2(-k1.x, k1.y);
          p.x = abs(p.x);
          p -= 2.0 * max(dot(k1, p), 0.0) * k1;
          p -= 2.0 * max(dot(k2, p), 0.0) * k2;
          p.x = abs(p.x);
          p.y -= r;
          vec2 ba = rf * vec2(-k1.y, k1.x) - vec2(0, 1);
          float h = clamp(dot(p, ba) / dot(ba, ba), 0.0, r);
          return length(p - ba * h) * sign(p.y * ba.x - p.x * ba.y);
        }
        
        void main() {
          vec2 center = gl_PointCoord - 0.5;
          float dist = star5(center * 2.0, 0.5, 0.4);
          
          float alpha = 1.0 - smoothstep(0.0, 0.12, dist);
          float glow = exp(-dist * 7.0) * 0.5;
          alpha += glow;
          
          vec3 finalColor = vColor * (1.0 + glow * 0.6);
          
          gl_FragColor = vec4(finalColor, alpha * 0.6);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  createGeometricShapes() {
    const shapes = [
      { geometry: new THREE.BoxGeometry(8, 8, 8), color: 0x1e3a8a, position: { x: -30, y: 20, z: -20 } },
      { geometry: new THREE.ConeGeometry(5, 12, 4), color: 0x0e7490, position: { x: 30, y: -20, z: -15 } },
      { geometry: new THREE.OctahedronGeometry(6), color: 0x1e40af, position: { x: 0, y: 30, z: -30 } },
      { geometry: new THREE.TorusGeometry(6, 2, 16, 100), color: 0x164e63, position: { x: -35, y: -25, z: -25 } },
      { geometry: new THREE.TetrahedronGeometry(7), color: 0x0c4a6e, position: { x: 35, y: 15, z: -20 } }
    ];

    shapes.forEach(shape => {
      const material = new THREE.MeshPhongMaterial({
        color: shape.color,
        transparent: true,
        opacity: 0.2,
        wireframe: true,
        emissive: shape.color,
        emissiveIntensity: 0.3
      });
      
      const mesh = new THREE.Mesh(shape.geometry, material);
      mesh.position.set(shape.position.x, shape.position.y, shape.position.z);
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      this.geometricShapes.push({
        mesh,
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.015
        }
      });
      
      this.scene.add(mesh);
    });
  }

  createShootingStars() {
    const shootingStarCount = 7;
    
    for (let i = 0; i < shootingStarCount; i++) {
      const points = [];
      const startPos = new THREE.Vector3(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 200
      );
      
      const direction = new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 0.5
      ).normalize();
      
      for (let j = 0; j < 20; j++) {
        const point = startPos.clone().add(direction.clone().multiplyScalar(j * 2));
        points.push(point);
      }
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color().setHSL(0.55 + Math.random() * 0.1, 0.8, 0.6),
        transparent: true,
        opacity: 0,
        linewidth: 2,
        blending: THREE.AdditiveBlending
      });
      
      const line = new THREE.Line(geometry, material);
      this.scene.add(line);
      
      this.shootingStars.push({
        line,
        startPos: startPos.clone(),
        direction: direction.clone(),
        speed: 0.3 + Math.random() * 0.5,
        life: 0,
        maxLife: 3 + Math.random() * 2,
        delay: Math.random() * 10,
        respawnDelay: 5 + Math.random() * 10
      });
    }
  }

  createConstellationLines() {
    const maxConnections = 150;
    const maxDistance = 30;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(maxConnections * 6);
    const colors = new Float32Array(maxConnections * 6);
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setDrawRange(0, 0);
    
    const material = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending
    });
    
    this.constellationLines = new THREE.LineSegments(geometry, material);
    this.scene.add(this.constellationLines);
    
    this.maxDistance = maxDistance;
    this.maxConnections = maxConnections;
  }

  updateConstellationLines() {
    if (!this.particles || !this.constellationLines) return;
    
    const positions = this.particles.geometry.attributes.position.array;
    const linePositions = this.constellationLines.geometry.attributes.position.array;
    const lineColors = this.constellationLines.geometry.attributes.color.array;
    
    let connectionCount = 0;
    
    for (let i = 0; i < this.count && connectionCount < this.maxConnections; i++) {
      const i3 = i * 3;
      const pos1 = new THREE.Vector3(positions[i3], positions[i3 + 1], positions[i3 + 2]);
      
      for (let j = i + 1; j < this.count && connectionCount < this.maxConnections; j++) {
        const j3 = j * 3;
        const pos2 = new THREE.Vector3(positions[j3], positions[j3 + 1], positions[j3 + 2]);
        
        const distance = pos1.distanceTo(pos2);
        
        if (distance < this.maxDistance) {
          const lineIndex = connectionCount * 6;
          
          linePositions[lineIndex] = pos1.x;
          linePositions[lineIndex + 1] = pos1.y;
          linePositions[lineIndex + 2] = pos1.z;
          linePositions[lineIndex + 3] = pos2.x;
          linePositions[lineIndex + 4] = pos2.y;
          linePositions[lineIndex + 5] = pos2.z;
          
          const alpha = 1 - (distance / this.maxDistance);
          const color = new THREE.Color().setHSL(0.55, 0.6, 0.5);
          
          lineColors[lineIndex] = color.r;
          lineColors[lineIndex + 1] = color.g;
          lineColors[lineIndex + 2] = color.b;
          lineColors[lineIndex + 3] = color.r;
          lineColors[lineIndex + 4] = color.g;
          lineColors[lineIndex + 5] = color.b;
          
          connectionCount++;
        }
      }
    }
    
    this.constellationLines.geometry.setDrawRange(0, connectionCount * 2);
    this.constellationLines.geometry.attributes.position.needsUpdate = true;
    this.constellationLines.geometry.attributes.color.needsUpdate = true;
  }

  // Continue to Part 3 for animate() and dispose()...
  // Method to update mouse position (call from ThreeBackground)
  updateMousePosition(x, y) {
    this.targetMousePosition.x = x;
    this.targetMousePosition.y = y;
  }

  animate(time, mouseX, mouseY) {
    // Smooth mouse interpolation
    this.mousePosition.x += (mouseX - this.mousePosition.x) * 0.05;
    this.mousePosition.y += (mouseY - this.mousePosition.y) * 0.05;
    
    // Update starfield layers with parallax
    this.starfieldLayers.forEach(layer => {
      if (layer.points.material.uniforms) {
        layer.points.material.uniforms.time.value = time;
      }
      layer.points.rotation.y = time * layer.speed;
      layer.points.rotation.x = time * layer.speed * 0.5;
      
      // Mouse parallax
      layer.points.rotation.z = this.mousePosition.x * 0.02 * (layer.speed / 0.0001);
    });

    // Update main stars with mouse interaction
    if (this.stars && this.stars.material.uniforms) {
      this.stars.material.uniforms.time.value = time;
      this.stars.material.uniforms.mousePos.value.set(this.mousePosition.x, this.mousePosition.y);
      this.stars.rotation.y = time * 0.00005;
      this.stars.rotation.x = time * 0.00003;
    }

    // Update milky way
    if (this.milkyWay && this.milkyWay.material.uniforms) {
      this.milkyWay.material.uniforms.time.value = time;
      this.milkyWay.rotation.y = time * 0.00002;
    }

    // Animate nebula clouds
    this.nebulaClouds.forEach(cloud => {
      cloud.mesh.rotation.x += cloud.rotationSpeed.x;
      cloud.mesh.rotation.y += cloud.rotationSpeed.y;
      cloud.mesh.rotation.z += cloud.rotationSpeed.z;
      
      cloud.mesh.position.x += Math.sin(time * 0.0001) * cloud.driftSpeed.x;
      cloud.mesh.position.y += Math.cos(time * 0.00008) * cloud.driftSpeed.y;
      
      // Pulsing opacity
      const pulse = Math.sin(time * 0.001) * 0.05 + 0.15;
      cloud.mesh.material.opacity = pulse;
    });

    // Animate planets with orbit and rim lighting
    this.planets.forEach(planet => {
      if (planet.mesh.material.uniforms) {
        planet.mesh.material.uniforms.time.value = time;
      }
      
      planet.mesh.rotation.y += planet.rotationSpeed;
      
      // Orbit animation
      planet.orbitAngle += planet.orbitSpeed;
      planet.mesh.position.x = Math.cos(planet.orbitAngle) * planet.orbitRadius;
      planet.mesh.position.y = Math.sin(planet.orbitAngle) * planet.orbitRadius;
    });

    // Animate aurora
    if (this.auroraEffect && this.auroraEffect.material.uniforms) {
      this.auroraEffect.material.uniforms.time.value = time;
      this.auroraEffect.rotation.z = Math.sin(time * 0.0003) * 0.1;
    }

    // Animate particle trails
    this.particleTrails.forEach(trail => {
      // Update trail positions
      for (let i = trail.points.length - 1; i > 0; i--) {
        trail.points[i].copy(trail.points[i - 1]);
      }
      
      // Update head position
      trail.points[0].add(trail.velocity);
      
      // Wrap around boundaries
      if (Math.abs(trail.points[0].x) > 300) trail.points[0].x *= -0.9;
      if (Math.abs(trail.points[0].y) > 300) trail.points[0].y *= -0.9;
      if (Math.abs(trail.points[0].z) > 300) trail.points[0].z *= -0.9;
      
      // Update geometry
      const positions = trail.line.geometry.attributes.position.array;
      for (let i = 0; i < trail.points.length; i++) {
        positions[i * 3] = trail.points[i].x;
        positions[i * 3 + 1] = trail.points[i].y;
        positions[i * 3 + 2] = trail.points[i].z;
      }
      trail.line.geometry.attributes.position.needsUpdate = true;
      
      // Fade trail based on speed
      const speed = trail.velocity.length();
      trail.line.material.opacity = trail.baseOpacity * (0.5 + speed * 2);
    });

    // Update main particles
    if (this.particles) {
      if (this.particles.material.uniforms) {
        this.particles.material.uniforms.time.value = time;
      }
      
      this.particles.rotation.y = time * 0.0003;
      this.particles.rotation.x = time * 0.0002;

      const positions = this.particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time * 0.001 + positions[i]) * 0.02;
        
        // Mouse interaction - wave effect
        const dx = positions[i] - this.mousePosition.x * 100;
        const dy = positions[i + 1] - this.mousePosition.y * 100;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 50) {
          const force = (50 - distance) / 50;
          positions[i + 2] += force * 0.5;
        }
      }
      this.particles.geometry.attributes.position.needsUpdate = true;
      
      this.updateConstellationLines();
    }

    // Animate geometric shapes
    this.geometricShapes.forEach(shape => {
      shape.mesh.rotation.x += shape.rotationSpeed.x;
      shape.mesh.rotation.y += shape.rotationSpeed.y;
      shape.mesh.rotation.z += shape.rotationSpeed.z;

      shape.mesh.position.x += Math.sin(time * 0.0005) * 0.02;
      shape.mesh.position.y += Math.cos(time * 0.0007) * 0.02;
    });

    // Animate shooting stars
    this.shootingStars.forEach(star => {
      star.life += 0.016;
      
      if (star.life < star.delay) {
        star.line.material.opacity = 0;
        return;
      }
      
      const lifeRatio = (star.life - star.delay) / star.maxLife;
      
      if (lifeRatio > 1) {
        star.life = -star.respawnDelay;
        
        star.startPos.set(
          (Math.random() - 0.5) * 400,
          (Math.random() - 0.5) * 400,
          (Math.random() - 0.5) * 200
        );
        
        star.direction.set(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 0.5
        ).normalize();
        
        const positions = star.line.geometry.attributes.position.array;
        for (let i = 0; i < positions.length; i += 3) {
          const point = star.startPos.clone().add(star.direction.clone().multiplyScalar((i / 3) * 2));
          positions[i] = point.x;
          positions[i + 1] = point.y;
          positions[i + 2] = point.z;
        }
        star.line.geometry.attributes.position.needsUpdate = true;
        return;
      }
      
      const fadeIn = Math.min(lifeRatio * 3, 1);
      const fadeOut = lifeRatio > 0.7 ? 1 - ((lifeRatio - 0.7) / 0.3) : 1;
      star.line.material.opacity = fadeIn * fadeOut * 0.8;
      
      const positions = star.line.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += star.direction.x * star.speed;
        positions[i + 1] += star.direction.y * star.speed;
        positions[i + 2] += star.direction.z * star.speed;
      }
      star.line.geometry.attributes.position.needsUpdate = true;
    });
  }

  dispose() {
    // Dispose starfield layers
    this.starfieldLayers.forEach(layer => {
      layer.points.geometry.dispose();
      layer.points.material.dispose();
      this.scene.remove(layer.points);
    });

    // Dispose main stars
    if (this.stars) {
      this.stars.geometry.dispose();
      this.stars.material.dispose();
      this.scene.remove(this.stars);
    }

    // Dispose milky way
    if (this.milkyWay) {
      this.milkyWay.geometry.dispose();
      this.milkyWay.material.dispose();
      this.scene.remove(this.milkyWay);
    }

    // Dispose nebula clouds
    this.nebulaClouds.forEach(cloud => {
      cloud.mesh.geometry.dispose();
      cloud.mesh.material.dispose();
      this.scene.remove(cloud.mesh);
    });

    // Dispose planets
    this.planets.forEach(planet => {
      planet.mesh.geometry.dispose();
      planet.mesh.material.dispose();
      this.scene.remove(planet.mesh);
    });

    // Dispose aurora
    if (this.auroraEffect) {
      this.auroraEffect.geometry.dispose();
      this.auroraEffect.material.dispose();
      this.scene.remove(this.auroraEffect);
    }

    // Dispose particle trails
    this.particleTrails.forEach(trail => {
      trail.line.geometry.dispose();
      trail.line.material.dispose();
      this.scene.remove(trail.line);
    });

    // Dispose main particles
    if (this.particles) {
      this.particles.geometry.dispose();
      this.particles.material.dispose();
      this.scene.remove(this.particles);
    }

    // Dispose geometric shapes
    this.geometricShapes.forEach(shape => {
      shape.mesh.geometry.dispose();
      shape.mesh.material.dispose();
      this.scene.remove(shape.mesh);
    });

    // Dispose shooting stars
    this.shootingStars.forEach(star => {
      star.line.geometry.dispose();
      star.line.material.dispose();
      this.scene.remove(star.line);
    });

    // Dispose constellation lines
    if (this.constellationLines) {
      this.constellationLines.geometry.dispose();
      this.constellationLines.material.dispose();
      this.scene.remove(this.constellationLines);
    }
  }
}

export default ParticleSystem;