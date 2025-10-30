/**
 * Loops Email API Integration
 * Aimi Landing Page
 * Handles email signup form submission
 */

(function () {
  'use strict';

  // ========== Configuration ==========
  const CONFIG = {
    // TODO: Replace with your actual Loops API key
    apiKey: 'YOUR_LOOPS_API_KEY_HERE',
    apiEndpoint: 'https://app.loops.so/api/v1/contacts/create',

    // Form validation
    emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Rate limiting
    rateLimitDelay: 2000, // ms between submissions
  };

  // ========== State Management ==========
  const state = {
    isSubmitting: false,
    lastSubmitTime: 0,
  };

  // ========== DOM Elements ==========
  const forms = {
    form1: document.getElementById('email-signup-form'),
    form2: document.getElementById('email-signup-form-2'),
  };

  const inputs = {
    input1: document.getElementById('email-input'),
    input2: document.getElementById('email-input-2'),
  };

  // ========== Utility Functions ==========

  /**
   * Validate email format
   */
  function isValidEmail(email) {
    return CONFIG.emailRegex.test(email);
  }

  /**
   * Check rate limiting
   */
  function isRateLimited() {
    const now = Date.now();
    return now - state.lastSubmitTime < CONFIG.rateLimitDelay;
  }

  /**
   * Sanitize email input
   */
  function sanitizeEmail(email) {
    return email.trim().toLowerCase();
  }

  /**
   * Show loading state on button
   */
  function setButtonLoading(button, isLoading) {
    if (isLoading) {
      button.disabled = true;
      button.style.opacity = '0.6';
      button.style.cursor = 'not-allowed';
      const btnText = button.querySelector('.btn-text');
      if (btnText) {
        btnText.textContent = 'Submitting...';
      }
    } else {
      button.disabled = false;
      button.style.opacity = '1';
      button.style.cursor = 'pointer';
      const btnText = button.querySelector('.btn-text');
      if (btnText) {
        btnText.textContent = 'Get Early Access';
      }
    }
  }

  /**
   * Show error state on input
   */
  function setInputError(input, hasError, message = '') {
    if (hasError) {
      input.style.borderColor = '#FF8BA7';
      input.setAttribute('aria-invalid', 'true');
      if (message) {
        input.setAttribute('title', message);
      }
    } else {
      input.style.borderColor = '';
      input.removeAttribute('aria-invalid');
      input.removeAttribute('title');
    }
  }

  // ========== API Functions ==========

  /**
   * Submit email to Loops API
   */
  async function submitToLoops(email) {
    // Check if API key is configured
    if (CONFIG.apiKey === 'YOUR_LOOPS_API_KEY_HERE') {
      console.warn('Loops API key not configured');
      // Simulate successful submission for demo
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Demo mode: Email would be submitted:', email);
          resolve({ success: true, message: 'Demo mode - API key not configured' });
        }, 1000);
      });
    }

    try {
      const response = await fetch(CONFIG.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${CONFIG.apiKey}`,
        },
        body: JSON.stringify({
          email: email,
          source: 'Landing Page',
          userGroup: 'Waitlist',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Loops API error:', error);
      throw error;
    }
  }

  /**
   * Store email locally as backup
   */
  function storeEmailLocally(email) {
    try {
      const emails = JSON.parse(localStorage.getItem('aimi_waitlist') || '[]');
      if (!emails.includes(email)) {
        emails.push(email);
        localStorage.setItem('aimi_waitlist', JSON.stringify(emails));
        console.log('Email stored locally as backup');
      }
    } catch (error) {
      console.warn('Could not store email locally:', error);
    }
  }

  // ========== Form Handling ==========

  /**
   * Handle form submission
   */
  async function handleSubmit(event, form, input) {
    event.preventDefault();

    // Get email value
    const email = sanitizeEmail(input.value);

    // Reset error state
    setInputError(input, false);

    // Validation checks
    if (!email) {
      setInputError(input, true, 'Please enter your email');
      window.showToast('Please enter your email address', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      setInputError(input, true, 'Please enter a valid email');
      window.showToast('Please enter a valid email address', 'error');
      return;
    }

    // Rate limiting check
    if (isRateLimited()) {
      window.showToast('Please wait a moment before trying again', 'error');
      return;
    }

    // Check if already submitting
    if (state.isSubmitting) {
      return;
    }

    // Set submitting state
    state.isSubmitting = true;
    state.lastSubmitTime = Date.now();

    // Get submit button
    const submitButton = form.querySelector('.submit-btn');
    setButtonLoading(submitButton, true);

    try {
      // Submit to Loops API
      const result = await submitToLoops(email);

      // Store locally as backup
      storeEmailLocally(email);

      // Show success message
      window.showToast('Successfully joined the waitlist! Check your email.', 'success');

      // Clear form
      input.value = '';

      // Track conversion (if analytics is set up)
      if (window.gtag) {
        gtag('event', 'signup', {
          event_category: 'Waitlist',
          event_label: 'Email Signup',
        });
      }

      console.log('Email submitted successfully:', email);
    } catch (error) {
      console.error('Submission error:', error);

      // Show error message
      const errorMessage =
        error.message || 'Something went wrong. Please try again.';
      window.showToast(errorMessage, 'error');

      setInputError(input, true, errorMessage);
    } finally {
      // Reset submitting state
      state.isSubmitting = false;
      setButtonLoading(submitButton, false);
    }
  }

  // ========== Event Listeners ==========

  /**
   * Setup form listeners
   */
  function setupFormListeners() {
    // Form 1 (Hero section)
    if (forms.form1 && inputs.input1) {
      forms.form1.addEventListener('submit', (e) =>
        handleSubmit(e, forms.form1, inputs.input1)
      );

      // Clear error state on input
      inputs.input1.addEventListener('input', () => {
        setInputError(inputs.input1, false);
      });
    }

    // Form 2 (CTA section)
    if (forms.form2 && inputs.input2) {
      forms.form2.addEventListener('submit', (e) =>
        handleSubmit(e, forms.form2, inputs.input2)
      );

      // Clear error state on input
      inputs.input2.addEventListener('input', () => {
        setInputError(inputs.input2, false);
      });
    }
  }

  /**
   * Setup keyboard shortcuts
   */
  function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + Enter to submit from any focused input
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const activeElement = document.activeElement;
        if (
          activeElement === inputs.input1 ||
          activeElement === inputs.input2
        ) {
          e.preventDefault();
          const form = activeElement.closest('form');
          if (form) {
            form.dispatchEvent(new Event('submit'));
          }
        }
      }
    });
  }

  // ========== Initialization ==========

  function init() {
    setupFormListeners();
    setupKeyboardShortcuts();

    // Check for email in URL parameters (e.g., from referral links)
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get('email');
    if (emailParam && isValidEmail(emailParam)) {
      if (inputs.input1) inputs.input1.value = emailParam;
      if (inputs.input2) inputs.input2.value = emailParam;
    }

    console.log('📧 Loops integration initialized');

    // Warn if API key is not configured
    if (CONFIG.apiKey === 'YOUR_LOOPS_API_KEY_HERE') {
      console.warn(
        '⚠️  Loops API key not configured. Update CONFIG.apiKey in loops-integration.js'
      );
      console.warn('   Forms will work in demo mode (emails stored locally only)');
    }
  }

  // ========== Start ==========
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ========== Public API ==========
  window.LoopsIntegration = {
    submitEmail: async (email) => {
      const sanitized = sanitizeEmail(email);
      if (!isValidEmail(sanitized)) {
        throw new Error('Invalid email format');
      }
      return submitToLoops(sanitized);
    },
    config: CONFIG,
  };
})();
