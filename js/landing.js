/**
 * Landing Page Main Script
 * Aimi - AI Companion App
 * Handles interactions, animations, and scroll effects
 */

(function () {
  'use strict';

  // ========== Configuration ==========
  const CONFIG = {
    scrollThreshold: 0.15, // Percentage of element visible to trigger animation
    tiltIntensity: 15, // Degrees for tilt effect
    parallaxIntensity: 0.5, // Multiplier for parallax effect
    smoothScrollDuration: 800, // ms
  };

  // ========== State Management ==========
  const state = {
    scrollY: 0,
    mouseX: 0,
    mouseY: 0,
    windowWidth: window.innerWidth,
    windowHeight: window.innerHeight,
    isReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };

  // ========== DOM Elements ==========
  const elements = {
    navbar: document.querySelector('.navbar'),
    navLinks: document.querySelectorAll('.nav-link'),
    featureCards: document.querySelectorAll('.feature-card[data-tilt]'),
    scrollIndicator: document.querySelector('.scroll-indicator'),
    characterCards: document.querySelectorAll('.character-card'),
    screenshotItems: document.querySelectorAll('.screenshot-item'),
  };

  // ========== Utility Functions ==========

  /**
   * Throttle function to limit execution rate
   */
  function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Check if element is in viewport
   */
  function isInViewport(element, threshold = CONFIG.scrollThreshold) {
    const rect = element.getBoundingClientRect();
    const elementHeight = rect.height;
    const visibleHeight = Math.min(rect.bottom, state.windowHeight) - Math.max(rect.top, 0);
    const visiblePercentage = visibleHeight / elementHeight;
    return visiblePercentage >= threshold;
  }

  /**
   * Map value from one range to another
   */
  function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  /**
   * Clamp value between min and max
   */
  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Get mouse position relative to element
   */
  function getMousePosition(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y, rect };
  }

  // ========== Navbar Scroll Effect ==========

  function handleNavbarScroll() {
    if (state.scrollY > 50) {
      elements.navbar?.classList.add('scrolled');
    } else {
      elements.navbar?.classList.remove('scrolled');
    }

    // Hide/show scroll indicator
    if (elements.scrollIndicator) {
      if (state.scrollY > state.windowHeight * 0.3) {
        elements.scrollIndicator.style.opacity = '0';
        elements.scrollIndicator.style.pointerEvents = 'none';
      } else {
        elements.scrollIndicator.style.opacity = '0.6';
        elements.scrollIndicator.style.pointerEvents = 'auto';
      }
    }
  }

  // ========== Smooth Scroll for Anchor Links ==========

  function setupSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for navbar height
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth',
          });
        }
      });
    });
  }

  // ========== Scroll-triggered Animations ==========

  function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll(
      '.feature-card, .character-card, .screenshot-item, .section-header'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    animatedElements.forEach((element, index) => {
      element.style.opacity = '0';
      element.style.animationDelay = `${index * 0.1}s`;
      observer.observe(element);
    });
  }

  // ========== 3D Tilt Effect for Cards ==========

  function setupTiltEffect() {
    if (state.isReducedMotion) return;

    elements.featureCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const { x, y, rect } = getMousePosition(e, card);
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = mapRange(y, 0, rect.height, CONFIG.tiltIntensity, -CONFIG.tiltIntensity);
        const rotateY = mapRange(x, 0, rect.width, -CONFIG.tiltIntensity, CONFIG.tiltIntensity);

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform =
          'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // ========== Parallax Effect ==========

  function setupParallaxEffect() {
    if (state.isReducedMotion) return;

    const parallaxElements = document.querySelectorAll('[data-parallax]');

    function updateParallax() {
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.5;
        const rect = element.getBoundingClientRect();
        const elementMiddle = rect.top + rect.height / 2;
        const viewportMiddle = state.windowHeight / 2;
        const distance = elementMiddle - viewportMiddle;
        const translateY = distance * speed * CONFIG.parallaxIntensity;

        element.style.transform = `translateY(${translateY}px)`;
      });
    }

    window.addEventListener('scroll', throttle(updateParallax, 10));
    updateParallax();
  }

  // ========== Mouse Follower Effect (Optional) ==========

  function setupMouseFollower() {
    if (state.isReducedMotion || state.windowWidth < 768) return;

    let trails = [];
    const maxTrails = 5;

    document.addEventListener('mousemove', throttle((e) => {
      if (trails.length >= maxTrails) {
        const oldTrail = trails.shift();
        oldTrail.remove();
      }

      const trail = document.createElement('div');
      trail.className = 'mouse-trail';
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
      document.body.appendChild(trail);
      trails.push(trail);

      setTimeout(() => {
        trail.remove();
        trails = trails.filter((t) => t !== trail);
      }, 600);
    }, 50));
  }

  // ========== Ripple Effect on Buttons ==========

  function setupRippleEffect() {
    const buttons = document.querySelectorAll('.submit-btn, .play-button');

    buttons.forEach((button) => {
      button.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'ripple-effect';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });
  }

  // ========== Character Carousel Scroll ==========

  function setupCharacterCarousel() {
    const track = document.querySelector('.characters-track');
    if (!track) return;

    // Auto-scroll on mouse wheel (horizontal)
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        track.scrollLeft += e.deltaY;
      }
    });

    // Touch drag (already handled by native scroll)
  }

  // ========== Video Placeholder Click ==========

  function setupVideoPlaceholder() {
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (!videoPlaceholder) return;

    videoPlaceholder.addEventListener('click', () => {
      // Here you can embed an actual video or open a modal
      alert('Video functionality - replace with actual video embed!');
      // Example: Replace with YouTube iframe
      // const iframe = document.createElement('iframe');
      // iframe.src = 'https://www.youtube.com/embed/YOUR_VIDEO_ID';
      // videoPlaceholder.parentElement.replaceChild(iframe, videoPlaceholder);
    });
  }

  // ========== Toast Notifications ==========

  function showToast(message, type = 'success') {
    const toastId = type === 'success' ? 'success-toast' : 'error-toast';
    const toast = document.getElementById(toastId);

    if (toast) {
      if (type === 'error') {
        const messageElement = document.getElementById('error-message');
        if (messageElement) {
          messageElement.textContent = message;
        }
      }

      toast.classList.remove('toast-hidden');

      setTimeout(() => {
        toast.classList.add('toast-hidden');
      }, 3000);
    }
  }

  // Make showToast available globally
  window.showToast = showToast;

  // ========== Active Nav Link Highlighting ==========

  function setupActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
      const scrollPosition = state.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          elements.navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', throttle(updateActiveLink, 100));
  }

  // ========== Keyboard Navigation ==========

  function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      // ESC key to close any open modals/overlays
      if (e.key === 'Escape') {
        // Add modal close logic here if needed
      }

      // Ctrl/Cmd + K for search (if implementing search)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // Add search functionality here
      }
    });
  }

  // ========== Window Resize Handler ==========

  function handleResize() {
    state.windowWidth = window.innerWidth;
    state.windowHeight = window.innerHeight;

    // Re-setup effects that depend on window size
    if (state.windowWidth < 768) {
      // Disable heavy effects on mobile
      elements.featureCards.forEach((card) => {
        card.style.transform = '';
      });
    }
  }

  // ========== Scroll Handler ==========

  function handleScroll() {
    state.scrollY = window.scrollY;
    handleNavbarScroll();
  }

  // ========== Performance Observer ==========

  function setupPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // Log slow operations in development
            if (entry.duration > 50) {
              console.warn('Slow operation detected:', entry.name, entry.duration + 'ms');
            }
          }
        });
        observer.observe({ entryTypes: ['measure'] });
      } catch (e) {
        console.warn('Performance monitoring not available');
      }
    }
  }

  /**
   * Setup language selector dropdown
   */
  function setupLanguageSelector() {
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');

    if (!langToggle || !langDropdown) {
      return;
    }

    // Toggle dropdown
    langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = langDropdown.classList.contains('open');

      if (isOpen) {
        closeLanguageDropdown();
      } else {
        openLanguageDropdown();
      }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
        closeLanguageDropdown();
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && langDropdown.classList.contains('open')) {
        closeLanguageDropdown();
        langToggle.focus();
      }
    });

    function openLanguageDropdown() {
      langDropdown.classList.add('open');
      langToggle.classList.add('open');
      langToggle.setAttribute('aria-expanded', 'true');
    }

    function closeLanguageDropdown() {
      langDropdown.classList.remove('open');
      langToggle.classList.remove('open');
      langToggle.setAttribute('aria-expanded', 'false');
    }

    console.log('🌐 Language selector initialized');
  }

  // ========== Error Handling ==========

  window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // You can send errors to analytics here
  });

  window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You can send errors to analytics here
  });

  // ========== Initialization ==========

  function init() {
    console.log('🌸 Aimi Landing Page Initialized');

    // Setup all features
    setupSmoothScroll();
    setupScrollAnimations();
    setupTiltEffect();
    setupParallaxEffect();
    setupRippleEffect();
    setupCharacterCarousel();
    setupVideoPlaceholder();
    setupActiveNavLink();
    setupKeyboardNavigation();
    setupLanguageSelector();

    // Optional effects (can be disabled)
    if (!state.isReducedMotion) {
      // setupMouseFollower(); // Commented out for now - can be CPU intensive
    }

    // Performance monitoring in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      setupPerformanceMonitoring();
    }

    // Event listeners
    window.addEventListener('scroll', throttle(handleScroll, 10));
    window.addEventListener('resize', throttle(handleResize, 200));

    // Initial calls
    handleScroll();
    handleResize();

    // Page load animation
    document.body.classList.add('page-transition');

    console.log('✨ All features loaded successfully');
  }

  // ========== DOM Ready ==========

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ========== Public API ==========

  window.AimiLanding = {
    showToast,
    config: CONFIG,
    state,
  };
})();
