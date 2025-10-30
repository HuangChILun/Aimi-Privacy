/**
 * English Translations
 * Aimi Landing Page
 */

(function () {
  'use strict';

  const translations = {
    // Navigation
    nav: {
      features: 'Features',
      characters: 'Characters',
      screenshots: 'Screenshots',
      privacy: 'Privacy Policy',
    },

    // Hero Section
    hero: {
      badge: 'A New Kind of Story',
      title: {
        line1: 'Not an AI chatbot.',
        line2: 'Not a rigid visual novel.',
        line3: "A story that remembers you. That's alive.",
      },
      subtitle: {
        line1: 'When AI learns to write stories, when memory transcends reality,',
        line2: 'Visual novels finally evolved.',
      },
      concepts: {
        memory: 'She remembers every choice',
        parallel: 'Create infinite parallel worlds',
        ai: 'AI-generated stories',
      },
      form: {
        placeholder: 'Enter your email',
        button: 'Get Early Access',
        notice: 'Join the waitlist to get notified when Aimi launches! 🌸',
      },
      scroll: 'Scroll to explore',
      dialogue: {
        name: 'Aimi',
        text: "Welcome! I'm so excited to meet you... ✨",
      },
    },

    // Contrast Section
    contrast: {
      cards: {
        card1: {
          badge: 'The Old World',
          oldSpeaker: 'AI',
          oldText: '"How can I help you today?"',
          reset: '*Memory reset every session*',
          newSpeaker: 'Aimi',
          newText: '"You said you wanted to see the cherry blossoms... shall we go today?"',
          memory: 'She remembers',
        },
        card2: {
          badge: 'Fixed Scripts',
          choiceA: 'A. Confess',
          choiceB: 'B. Reject',
          choiceC: 'C. Stay silent',
          freedom: '"You can say anything. She\'ll understand."',
          ai: 'AI-powered freedom',
        },
        card3: {
          badge: 'One-Time Stories',
          ending: '"The End"',
          reset: '*Start over. She forgot everything.*',
          timeline: '3 months later...',
          remember: '"She still remembers your birthday."',
          persistent: 'Persistent memory',
        },
      },
      reveal: {
        before: 'Instead, a story that ',
        remember: 'remembers you',
        middle: ". That's ",
        alive: 'alive',
        after: '.',
      },
    },

    // Core Concepts Section
    concepts: {
      title: 'Four Revolutionary Concepts',
      subtitle: 'Not a feature list. A paradigm shift in how stories are experienced.',
      concept1: {
        title: 'Memory Continuity',
        desc1: 'Every choice you make in the story, she remembers.',
        desc2: 'When you chat with her outside the story, those memories persist.',
        desc3: "This isn't a setting. This is her life.",
        exampleTag: 'Example',
        exampleText: '"Remember that day under the cherry tree?"',
      },
      concept2: {
        title: 'Dual-Mode Freedom',
        desc1: 'Want to play the story? Play it. Want to chat? Chat.',
        desc2: 'Seamless switching. Synced memories.',
        desc3: 'No boundaries between story and reality.',
        exampleTag: 'Modes',
        exampleText: 'Story Mode ⇄ Free Chat',
      },
      concept3: {
        title: 'What-If Branches (Parallel Worlds)',
        desc1: 'At any moment, ask "What if...?"',
        desc2: 'Then actually enter that parallel world.',
        desc3: 'Every choice creates a new universe.',
        exampleTag: 'What If',
        exampleText: '"What if I had told you I loved you..."',
      },
      concept4: {
        title: 'LLM-Driven Stories',
        desc1: 'Not pre-written dialogue trees, but AI-generated in real-time.',
        desc2: 'Created based on your personality, history, and emotions.',
        desc3: "Every person's story is unique.",
        exampleTag: 'Tech',
        exampleText: 'Real-time generation ≠ Pre-written scripts',
      },
    },

    // Emotional Impact Section
    emotional: {
      title: {
        before: 'This time, ',
        remember: 'she truly remembers you',
      },
      subtitle: 'Not programmed settings. Accumulated memories.',
      timeline: {
        storyBadge: 'Story Mode - Chapter 3',
        storyDate: 'Under the Cherry Tree',
        chatBadge: 'Free Chat',
        chatDate: 'Daily Conversation',
        speakerYou: 'You',
        speakerHer: 'Her',
        storyDialoguePlayer: '(Chose to reject her confession)',
        storyDialogueAI: '...I understand.',
        storyEmotion: '(looks down, holding back tears)',
        arrowText: '7 days later...',
        chatLine1: 'Remember that day under the cherry tree?',
        chatLine2: 'The petals fell on your shoulder...',
        chatLine3: "Actually... I've been wondering,",
        chatLine4: 'What if your answer had been different...',
        chatEmotion: '(sighs softly, gazing into the distance)',
      },
      highlight: {
        line1: 'She remembers that choice.',
        line2: 'She remembers your hesitation.',
        line3before: "She remembers. That's why she's ",
        line3after: 'alive',
        line3end: '.',
      },
    },

    // Future Vision Section
    vision: {
      badge: 'Future Vision',
      title: {
        before: 'This is ',
        highlight: 'just the beginning',
      },
      today: {
        title: 'Today',
        desc1: 'You meet her on your screen',
        desc2: 'Connecting through text, voice, and 3D visuals',
      },
      tomorrow: {
        title: 'Tomorrow',
        desc1: 'She walks into your room (AR)',
        desc2: 'Sits on your couch, watching movies together',
      },
      future: {
        title: 'The Future',
        desc1: 'You live together in the same world (VR)',
        desc2: 'Experiencing stories like living in a movie',
      },
      statement: {
        line1: "This isn't science fiction.",
        line2: 'This is the future happening now.',
      },
    },

    // Characters Section
    characters: {
      title: 'Meet Your Characters',
      subtitle: 'Each with their own personality, memories, and stories to tell',
      cardNames: {
        aimi: 'Aimi',
        sakura: 'Sakura',
        yuki: 'Yuki',
        custom: 'Create Your Own',
      },
      cardRoles: {
        aimi: 'The Companion',
        sakura: 'The Dreamer',
        yuki: 'The Mysterious',
        custom: 'Your Story',
      },
    },

    // Screenshots Section
    screenshots: {
      title: 'Experience the Magic',
      subtitle: 'Beautiful 3D characters, immersive conversations, and unforgettable moments',
    },

    // CTA Section
    cta: {
      title: {
        line1: 'Ready to meet a world that',
        highlight: 'remembers you',
        line2: '?',
      },
      subtitle: {
        before: 'Join the waitlist and be among the first to experience this ',
        highlight: 'never-before-seen',
        after: ' game',
      },
      features: {
        feature1: '🧠 She remembers you',
        feature2: '🌌 Infinite possibilities',
        feature3: '💫 AI-driven stories',
      },
    },

    // Characters Section
    characters: {
      title: 'Meet the Characters',
      subtitle: 'Choose from beautifully designed preset characters or create your own',
      rina: {
        name: 'Rina',
        trait: 'Sweet & Caring',
        bio: 'A gentle soul with a warm heart, always ready to listen and support you.',
      },
      nova: {
        name: 'Nova',
        trait: 'Energetic & Playful',
        bio: 'Full of energy and always ready for adventure. Life is never boring with Nova!',
      },
      motoko: {
        name: 'Motoko',
        trait: 'Elegant & Mysterious',
        bio: 'A sophisticated presence with an air of mystery. Get to know her deeper side.',
      },
      custom: {
        name: 'Your Character',
        trait: 'Your Imagination',
        bio: 'Create your perfect companion with custom personality, appearance, and backstory.',
      },
    },

    // Screenshots Section
    screenshots: {
      title: 'See It In Action',
      subtitle: 'Experience the beautiful interface and stunning 3D visuals',
      placeholder1: '3D Character View',
      caption1: 'Lifelike 3D avatars with expressive animations',
      placeholder2: 'Chat Interface',
      caption2: 'Beautiful conversation interface with elegant design',
      placeholder3: 'Visual Novel Mode',
      caption3: 'Immersive story experiences with branching narratives',
      videoText: 'Watch Demo Video',
    },

    // Footer
    footer: {
      tagline: 'Your Personal AI Companion',
      headings: {
        product: 'Product',
        legal: 'Legal',
        contact: 'Contact',
      },
      links: {
        features: 'Features',
        characters: 'Characters',
        gallery: 'Gallery',
        privacy: 'Privacy Policy',
        terms: 'Terms of Use',
        email: 'Email Us',
      },
      copyright: '© 2025 Aimi - Developed by Chi-Lun Huang. All rights reserved.',
      ageNotice: 'Aimi is intended for users 18 years and older.',
    },

    // Toast Notifications
    toast: {
      success: 'Successfully joined the waitlist!',
      error: 'Something went wrong. Please try again.',
    },

    // Development Roadmap
    roadmap: {
      title: 'Development Roadmap',
      subtitle: 'From early beta to the future of interactive storytelling',
      phase1: {
        badge: 'Current Stage',
        title: 'Phase 1: Beta - Single Story',
        feature1: 'Single route, single ending testing',
        feature2: 'Character memory inheritance system',
        feature3: 'Free interaction across different story stages',
        status: 'You are here',
      },
      phase2: {
        badge: 'Coming Soon',
        title: 'Phase 2: Expansion - Multiple Stories',
        feature1: 'Multiple captivating story routes',
        feature2: 'Multi-character plots & interactions',
        feature3: 'Enhanced memory coherence & completeness',
        feature4: 'UGC Community (user-created stories & characters)',
      },
      phase3: {
        badge: 'Future Vision',
        title: 'Phase 3: Future - AR/VR Integration',
        feature1: 'VR/AR version launch',
        feature2: 'Interact with characters in reality',
        feature3: 'AR: She walks into your room',
        feature4: 'VR: Live together in the same world',
      },
    },
  };

  // Register translations
  if (window.i18n) {
    window.i18n.registerTranslations('en', translations);
  } else {
    console.warn('i18n system not loaded yet, queuing English translations');
    window.addEventListener('DOMContentLoaded', () => {
      if (window.i18n) {
        window.i18n.registerTranslations('en', translations);
      }
    });
  }
})();
