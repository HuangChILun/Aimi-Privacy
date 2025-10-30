/**
 * i18n (Internationalization) System
 * Aimi Landing Page
 * Supports: Traditional Chinese (繁體中文), Japanese (日本語), English
 */

(function () {
  'use strict';

  // ========== Configuration ==========
  const CONFIG = {
    defaultLang: 'en',
    supportedLangs: ['zh-TW', 'ja', 'en'],
    storageKey: 'aimi_language',
    translations: {}, // Will be populated by translation files
  };

  // ========== State ==========
  let currentLang = CONFIG.defaultLang;

  // ========== Utility Functions ==========

  /**
   * Detect browser language
   */
  function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;

    // Check for exact match
    if (CONFIG.supportedLangs.includes(browserLang)) {
      return browserLang;
    }

    // Check for language prefix (e.g., 'zh' in 'zh-TW')
    const langPrefix = browserLang.split('-')[0];

    // Map language prefixes to supported languages
    const langMap = {
      'zh': 'zh-TW',  // Chinese -> Traditional Chinese
      'ja': 'ja',     // Japanese
      'en': 'en',     // English
    };

    return langMap[langPrefix] || CONFIG.defaultLang;
  }

  /**
   * Get language from URL parameter
   */
  function getLangFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');

    if (lang && CONFIG.supportedLangs.includes(lang)) {
      return lang;
    }

    return null;
  }

  /**
   * Get saved language from localStorage
   */
  function getSavedLanguage() {
    const saved = localStorage.getItem(CONFIG.storageKey);

    if (saved && CONFIG.supportedLangs.includes(saved)) {
      return saved;
    }

    return null;
  }

  /**
   * Save language preference
   */
  function saveLanguage(lang) {
    try {
      localStorage.setItem(CONFIG.storageKey, lang);
    } catch (error) {
      console.warn('Could not save language preference:', error);
    }
  }

  /**
   * Get nested translation by key path
   * e.g., 'hero.title.line1' -> translations.hero.title.line1
   */
  function getTranslation(key, lang = currentLang) {
    const translations = CONFIG.translations[lang];

    if (!translations) {
      console.warn(`No translations found for language: ${lang}`);
      return key;
    }

    const keys = key.split('.');
    let value = translations;

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key} (lang: ${lang})`);
        return key;
      }
    }

    return value;
  }

  /**
   * Update all elements with data-i18n attribute
   */
  function updatePageContent(lang) {
    // Update text content
    document.querySelectorAll('[data-i18n]').forEach((element) => {
      const key = element.getAttribute('data-i18n');
      const translation = getTranslation(key, lang);

      // Check if element has data-i18n-html attribute (for HTML content)
      if (element.hasAttribute('data-i18n-html')) {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
      const key = element.getAttribute('data-i18n-placeholder');
      const translation = getTranslation(key, lang);
      element.placeholder = translation;
    });

    // Update aria-labels
    document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
      const key = element.getAttribute('data-i18n-aria');
      const translation = getTranslation(key, lang);
      element.setAttribute('aria-label', translation);
    });

    // Update titles (tooltips)
    document.querySelectorAll('[data-i18n-title]').forEach((element) => {
      const key = element.getAttribute('data-i18n-title');
      const translation = getTranslation(key, lang);
      element.title = translation;
    });

    // Update document language attribute
    document.documentElement.lang = lang;

    console.log(`✅ Language updated to: ${lang}`);
  }

  /**
   * Switch to a specific language
   */
  function switchLanguage(lang) {
    if (!CONFIG.supportedLangs.includes(lang)) {
      console.error(`Unsupported language: ${lang}`);
      return;
    }

    if (!CONFIG.translations[lang]) {
      console.error(`Translations not loaded for: ${lang}`);
      return;
    }

    currentLang = lang;
    saveLanguage(lang);
    updatePageContent(lang);

    // Update language selector UI
    updateLanguageSelectorUI(lang);

    // Dispatch custom event
    document.dispatchEvent(new CustomEvent('languageChanged', {
      detail: { language: lang }
    }));
  }

  /**
   * Update language selector UI to reflect current language
   */
  function updateLanguageSelectorUI(lang) {
    // Update active state on language buttons
    document.querySelectorAll('.lang-option').forEach((btn) => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update current language display
    const currentLangDisplay = document.querySelector('.current-lang');
    if (currentLangDisplay) {
      const langNames = {
        'zh-TW': '繁中',
        'ja': '日本語',
        'en': 'English',
      };
      currentLangDisplay.textContent = langNames[lang] || lang;
    }
  }

  /**
   * Initialize language selector UI
   */
  function initLanguageSelector() {
    // Find all language option buttons
    document.querySelectorAll('.lang-option').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const lang = btn.getAttribute('data-lang');
        if (lang) {
          switchLanguage(lang);

          // Close dropdown after selection
          const dropdown = document.getElementById('lang-dropdown');
          const toggle = document.getElementById('lang-toggle');
          if (dropdown && toggle) {
            dropdown.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
          }
        }
      });
    });

    console.log('🌐 Language selector initialized');
  }

  /**
   * Register translations for a language
   */
  function registerTranslations(lang, translations) {
    if (!CONFIG.supportedLangs.includes(lang)) {
      console.warn(`Attempting to register unsupported language: ${lang}`);
      return;
    }

    CONFIG.translations[lang] = translations;
    console.log(`📦 Translations loaded for: ${lang}`);
  }

  /**
   * Initialize i18n system
   */
  function init() {
    // Determine initial language (priority: URL > Saved > Browser > Default)
    const urlLang = getLangFromURL();
    const savedLang = getSavedLanguage();
    const browserLang = detectBrowserLanguage();

    const initialLang = urlLang || savedLang || browserLang || CONFIG.defaultLang;

    console.log('🌍 i18n Initialization:', {
      urlLang,
      savedLang,
      browserLang,
      initialLang,
    });

    // Wait for all translations to be loaded before switching
    // (Translation files will call registerTranslations)

    // Small delay to ensure translation files are loaded
    setTimeout(() => {
      console.log('Available translations:', Object.keys(CONFIG.translations));

      if (CONFIG.translations[initialLang]) {
        switchLanguage(initialLang);
      } else {
        console.warn(`Translations not available for ${initialLang}, falling back to ${CONFIG.defaultLang}`);
        if (CONFIG.translations[CONFIG.defaultLang]) {
          switchLanguage(CONFIG.defaultLang);
        } else {
          console.error('No translations loaded! Please check translation files.');
        }
      }

      // Initialize language selector UI
      initLanguageSelector();
    }, 200);
  }

  // ========== Public API ==========
  window.i18n = {
    init,
    switchLanguage,
    getCurrentLanguage: () => currentLang,
    getTranslation,
    registerTranslations,
    supportedLanguages: CONFIG.supportedLangs,
  };

  // ========== Auto-initialize ==========
  // Wait for DOM to be fully ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Add small delay to ensure all scripts are loaded
      setTimeout(init, 50);
    });
  } else {
    // Add small delay to ensure all scripts are loaded
    setTimeout(init, 50);
  }
})();
