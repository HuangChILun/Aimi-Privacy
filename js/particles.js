/**
 * 3D Particle Background Effect
 * Aimi Landing Page
 * Uses Three.js for WebGL-powered particle animation
 */

(function () {
  'use strict';

  // Check if reduced motion is preferred
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) {
    console.log('Particles disabled due to reduced motion preference');
    return;
  }

  // Check if WebGL is available
  if (!window.THREE) {
    console.warn('Three.js not loaded, particles disabled');
    return;
  }

  const canvas = document.getElementById('particles-canvas');
  if (!canvas) {
    console.warn('Particles canvas not found');
    return;
  }

  // ========== Configuration ==========
  const CONFIG = {
    particleCount: window.innerWidth < 768 ? 50 : 100,
    particleSize: 3,
    particleColor: 0xffc9d9, // Rose pink
    moveSpeed: 0.2,
    mouseInfluence: 50,
    connectionDistance: 150,
    connectionOpacity: 0.2,
  };

  // ========== Scene Setup ==========
  let scene, camera, renderer;
  let particles, particlePositions, particleVelocities;
  let mouseX = 0,
    mouseY = 0;
  let targetMouseX = 0,
    targetMouseY = 0;

  function init() {
    // Create scene
    scene = new THREE.Scene();

    // Create camera
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    // Create renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    createParticles();

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);

    // Start animation
    animate();

    console.log('✨ 3D Particles initialized');
  }

  // ========== Particle Creation ==========
  function createParticles() {
    const geometry = new THREE.BufferGeometry();
    particlePositions = new Float32Array(CONFIG.particleCount * 3);
    particleVelocities = [];

    // Initialize particle positions and velocities
    for (let i = 0; i < CONFIG.particleCount; i++) {
      const i3 = i * 3;

      // Random position
      particlePositions[i3] = (Math.random() - 0.5) * 800; // x
      particlePositions[i3 + 1] = (Math.random() - 0.5) * 800; // y
      particlePositions[i3 + 2] = (Math.random() - 0.5) * 400; // z

      // Random velocity
      particleVelocities.push({
        x: (Math.random() - 0.5) * CONFIG.moveSpeed,
        y: (Math.random() - 0.5) * CONFIG.moveSpeed,
        z: (Math.random() - 0.5) * CONFIG.moveSpeed * 0.5,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Create material with gradient colors
    const colors = new Float32Array(CONFIG.particleCount * 3);
    const color = new THREE.Color();

    for (let i = 0; i < CONFIG.particleCount; i++) {
      // Create gradient from rose pink to lavender
      const t = i / CONFIG.particleCount;
      color.setHSL(0.92 + t * 0.08, 0.7, 0.8);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create material
    const material = new THREE.PointsMaterial({
      size: CONFIG.particleSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    // Create particle system
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
  }

  // ========== Mouse Interaction ==========
  function onMouseMove(event) {
    targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
    targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  }

  // ========== Window Resize ==========
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  // ========== Animation Loop ==========
  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse following
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Update particle positions
    updateParticles();

    // Rotate camera slightly based on mouse
    camera.position.x = mouseX * CONFIG.mouseInfluence;
    camera.position.y = mouseY * CONFIG.mouseInfluence;
    camera.lookAt(scene.position);

    // Render scene
    renderer.render(scene, camera);
  }

  // ========== Particle Updates ==========
  function updateParticles() {
    const positions = particles.geometry.attributes.position.array;

    for (let i = 0; i < CONFIG.particleCount; i++) {
      const i3 = i * 3;
      const velocity = particleVelocities[i];

      // Update positions
      positions[i3] += velocity.x;
      positions[i3 + 1] += velocity.y;
      positions[i3 + 2] += velocity.z;

      // Boundary checking - wrap around
      if (Math.abs(positions[i3]) > 400) {
        positions[i3] = -positions[i3];
      }
      if (Math.abs(positions[i3 + 1]) > 400) {
        positions[i3 + 1] = -positions[i3 + 1];
      }
      if (Math.abs(positions[i3 + 2]) > 200) {
        positions[i3 + 2] = -positions[i3 + 2];
      }

      // Add some organic movement
      const time = Date.now() * 0.0001;
      positions[i3] += Math.sin(time + i) * 0.1;
      positions[i3 + 1] += Math.cos(time + i) * 0.1;
    }

    particles.geometry.attributes.position.needsUpdate = true;

    // Rotate particle system slowly
    particles.rotation.y += 0.0005;
  }

  // ========== Initialize when DOM is ready ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
