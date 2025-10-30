/**
 * Sakura (Cherry Blossom) Falling Animation
 * Aimi Landing Page
 * Canvas-based particle animation for Galgame aesthetic
 */

(function () {
  'use strict';

  // Check if reduced motion is preferred
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) {
    console.log('Sakura animation disabled due to reduced motion preference');
    return;
  }

  const canvas = document.getElementById('sakura-canvas');
  if (!canvas) {
    console.warn('Sakura canvas not found');
    return;
  }

  const ctx = canvas.getContext('2d');

  // ========== Configuration ==========
  const CONFIG = {
    petalCount: window.innerWidth < 768 ? 15 : 30,
    colors: [
      'rgba(255, 229, 236, 0.8)', // Sakura pink
      'rgba(255, 201, 217, 0.8)', // Rose pink
      'rgba(255, 179, 198, 0.8)', // Deep rose
      'rgba(240, 230, 255, 0.7)', // Lavender
    ],
    minSize: 8,
    maxSize: 16,
    minSpeed: 1,
    maxSpeed: 3,
    windSpeed: 0.5,
    rotationSpeed: 0.02,
  };

  // ========== Sakura Petal Class ==========
  class SakuraPetal {
    constructor() {
      this.reset();
      // Start at random height for initial render
      this.y = Math.random() * canvas.height;
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = -20;
      this.size = CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize);
      this.speed = CONFIG.minSpeed + Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed);
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * CONFIG.rotationSpeed;
      this.swingAmplitude = 50 + Math.random() * 50;
      this.swingSpeed = 0.01 + Math.random() * 0.02;
      this.swingPhase = Math.random() * Math.PI * 2;
      this.color = CONFIG.colors[Math.floor(Math.random() * CONFIG.colors.length)];
      this.opacity = 0.6 + Math.random() * 0.4;
    }

    update(time, wind) {
      // Falling motion
      this.y += this.speed;

      // Swinging motion (sine wave)
      const swingOffset = Math.sin(time * this.swingSpeed + this.swingPhase) * this.swingAmplitude;
      this.x += (swingOffset - this.lastSwingOffset || 0) * 0.01;
      this.lastSwingOffset = swingOffset;

      // Wind effect
      this.x += wind;

      // Rotation
      this.rotation += this.rotationSpeed;

      // Reset if out of bounds
      if (this.y > canvas.height + 20) {
        this.reset();
      }

      if (this.x < -50 || this.x > canvas.width + 50) {
        this.x = Math.random() * canvas.width;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);

      // Draw petal shape (simplified)
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;

      // Petal shape using bezier curves
      ctx.beginPath();
      ctx.moveTo(0, -this.size / 2);

      // Top curve
      ctx.bezierCurveTo(
        this.size / 2,
        -this.size / 2,
        this.size / 2,
        0,
        0,
        this.size / 2
      );

      // Bottom curve
      ctx.bezierCurveTo(
        -this.size / 2,
        0,
        -this.size / 2,
        -this.size / 2,
        0,
        -this.size / 2
      );

      ctx.fill();

      // Add subtle gradient for depth
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size / 2);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.restore();
    }
  }

  // ========== Animation State ==========
  let petals = [];
  let animationId;
  let lastTime = 0;
  let wind = 0;
  let targetWind = 0;

  // ========== Initialize Petals ==========
  function initPetals() {
    petals = [];
    for (let i = 0; i < CONFIG.petalCount; i++) {
      petals.push(new SakuraPetal());
    }
  }

  // ========== Resize Handler ==========
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // ========== Wind Simulation ==========
  function updateWind() {
    // Randomly change wind direction
    if (Math.random() < 0.01) {
      targetWind = (Math.random() - 0.5) * CONFIG.windSpeed * 2;
    }

    // Smooth wind transition
    wind += (targetWind - wind) * 0.02;
  }

  // ========== Animation Loop ==========
  function animate(currentTime) {
    animationId = requestAnimationFrame(animate);

    const deltaTime = currentTime - lastTime;
    lastTime = currentTime;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update wind
    updateWind();

    // Update and draw petals
    petals.forEach((petal) => {
      petal.update(currentTime * 0.001, wind);
      petal.draw();
    });
  }

  // ========== Mouse Interaction ==========
  let mouseX = 0;
  let mouseY = 0;

  function onMouseMove(event) {
    const prevX = mouseX;
    const prevY = mouseY;

    mouseX = event.clientX;
    mouseY = event.clientY;

    // Create wind effect based on mouse movement
    const deltaX = mouseX - prevX;
    targetWind += deltaX * 0.01;
  }

  // ========== Touch Interaction ==========
  function onTouchMove(event) {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      onMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
    }
  }

  // ========== Visibility Change Handler ==========
  function onVisibilityChange() {
    if (document.hidden) {
      // Pause animation when tab is hidden
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    } else {
      // Resume animation when tab is visible
      if (!animationId) {
        lastTime = performance.now();
        animate(lastTime);
      }
    }
  }

  // ========== Initialization ==========
  function init() {
    resizeCanvas();
    initPetals();

    // Event listeners
    window.addEventListener('resize', () => {
      resizeCanvas();
      // Adjust petal count on resize
      const newCount = window.innerWidth < 768 ? 15 : 30;
      if (newCount !== petals.length) {
        CONFIG.petalCount = newCount;
        initPetals();
      }
    });

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    // Start animation
    lastTime = performance.now();
    animate(lastTime);

    console.log('🌸 Sakura animation initialized');
  }

  // ========== Cleanup ==========
  window.addEventListener('beforeunload', () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  });

  // ========== Start ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ========== Public API ==========
  window.SakuraAnimation = {
    pause: () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    },
    resume: () => {
      if (!animationId) {
        lastTime = performance.now();
        animate(lastTime);
      }
    },
    setPetalCount: (count) => {
      CONFIG.petalCount = count;
      initPetals();
    },
    setWindSpeed: (speed) => {
      CONFIG.windSpeed = speed;
    },
  };
})();
