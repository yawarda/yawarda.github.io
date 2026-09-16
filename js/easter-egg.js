/* ==========================================================================
   YA.WARDA ROMANCE EASTER EGG ENGINE
   Interactive Floating Bloom, Emotional Doodles & High-Conversion Funnel
   ========================================================================== */

const EasterEggEngine = {
  clickCount: 0,
  maxClicks: 3,
  currentRole: null, // 'boyfriend' | 'girlfriend'
  audioCtx: null,

  init() {
    this.createTriggerElement();
    this.createModalElement();
    this.bindEvents();
    this.checkFirstTimeVisit();
  },

  /**
   * Generates the floating blooming lily/rose SVG button
   */
  createTriggerElement() {
    if (document.getElementById('easter-egg-trigger')) return;

    const trigger = document.createElement('button');
    trigger.id = 'easter-egg-trigger';
    trigger.className = 'easter-egg-trigger';
    trigger.setAttribute('aria-label', 'Secret Romance Bloom Easter Egg');
    trigger.setAttribute('title', 'Tap this bloom 3 times for a secret surprise');

    trigger.innerHTML = `
      <div class="bloom-aura"></div>
      
      <!-- Luxury Bloomed Flower SVG (Rose & Lily fusion) -->
      <svg class="bloom-flower-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="roseGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FF9EAA"/>
            <stop offset="60%" stop-color="#E85D75"/>
            <stop offset="100%" stop-color="#8F2B0C"/>
          </radialGradient>
          <radialGradient id="goldCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFF3D4"/>
            <stop offset="70%" stop-color="#C5A880"/>
            <stop offset="100%" stop-color="#8F7249"/>
          </radialGradient>
          <filter id="bloomGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feComposite in="SourceGraphic" in2="blur" operator="over"/>
          </filter>
        </defs>

        <!-- Outer Calyx & Fresh Green Leaves -->
        <path d="M22 68 C15 78, 30 88, 42 78 C35 72, 28 68, 22 68 Z" fill="#2D5A43" opacity="0.9"/>
        <path d="M78 68 C85 78, 70 88, 58 78 C65 72, 72 68, 78 68 Z" fill="#3B6E54" opacity="0.9"/>

        <!-- Layer 1: Outer Petals -->
        <path d="M50 12 C34 26, 28 42, 50 62 C72 42, 66 26, 50 12 Z" fill="url(#roseGradient)" opacity="0.95"/>
        <path d="M18 42 C14 60, 32 72, 50 60 C38 46, 26 34, 18 42 Z" fill="url(#roseGradient)" opacity="0.9"/>
        <path d="M82 42 C86 60, 68 72, 50 60 C62 46, 74 34, 82 42 Z" fill="url(#roseGradient)" opacity="0.9"/>

        <!-- Layer 2: Mid Blooming Petals -->
        <path d="M30 32 C26 50, 42 64, 50 56 C44 44, 36 34, 30 32 Z" fill="#F78CA0"/>
        <path d="M70 32 C74 50, 58 64, 50 56 C56 44, 64 34, 70 32 Z" fill="#F8708C"/>
        <path d="M50 24 C38 38, 42 56, 50 54 C58 56, 62 38, 50 24 Z" fill="#FFB7C5"/>

        <!-- Center Bud & Stamen Sparkle -->
        <circle cx="50" cy="46" r="9" fill="url(#goldCore)" filter="url(#bloomGlow)"/>
        <circle cx="50" cy="46" r="4.5" fill="#FAF8F5"/>
        <circle cx="47" cy="43" r="1.5" fill="#C5A880"/>
        <circle cx="53" cy="43" r="1.5" fill="#C5A880"/>
        <circle cx="50" cy="49" r="1.5" fill="#C5A880"/>
      </svg>

      <!-- Click Progress Pill -->
      <span class="bloom-count-pill" id="bloom-count-pill">0/3</span>

      <!-- Interactive First-Time Tooltip -->
      <div class="bloom-tooltip" id="bloom-tooltip">
        <div class="bloom-tooltip-header">
          <span class="bloom-tooltip-tag">✨ Secret Romance Bloom</span>
          <button class="bloom-tooltip-close" id="bloom-tooltip-close" aria-label="Close tooltip">&times;</button>
        </div>
        <p class="bloom-tooltip-body" id="bloom-tooltip-text">
          Psst! Tap this magical bloom <strong>3 times</strong> to reveal a romantic secret & surprise!
        </p>
        <div class="bloom-tooltip-progress">
          <div class="bloom-progress-bar">
            <div class="bloom-progress-fill" id="bloom-progress-fill"></div>
          </div>
          <span class="bloom-progress-text" id="bloom-progress-text">0/3 Taps</span>
        </div>
      </div>
    `;

    document.body.appendChild(trigger);
  },

  /**
   * Creates the dark blur modal structure
   */
  createModalElement() {
    if (document.getElementById('easter-egg-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'easter-egg-modal';
    modal.className = 'easter-egg-modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');

    modal.innerHTML = `
      <div class="easter-egg-modal-card" id="easter-egg-card">
        <button class="easter-egg-close-btn" id="easter-egg-close" aria-label="Close modal">&times;</button>
        <div id="easter-egg-dynamic-content">
          <!-- Rendered dynamically (Question View or Story View) -->
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  },

  /**
   * Check if user is on their first visit to show the guide tooltip
   */
  checkFirstTimeVisit() {
    const tooltip = document.getElementById('bloom-tooltip');
    if (!tooltip) return;

    // Show with a brief delay so user notices it smoothly
    setTimeout(() => {
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
    }, 1200);
  },

  /**
   * Binds click and keyboard handlers
   */
  bindEvents() {
    const trigger = document.getElementById('easter-egg-trigger');
    const closeBtn = document.getElementById('easter-egg-close');
    const tooltipClose = document.getElementById('bloom-tooltip-close');
    const modal = document.getElementById('easter-egg-modal');

    if (trigger) {
      trigger.addEventListener('click', (e) => {
        // Prevent click bubbling
        if (e.target.closest('#bloom-tooltip-close')) return;
        this.handleBloomClick(e);
      });
    }

    if (tooltipClose) {
      tooltipClose.addEventListener('click', (e) => {
        e.stopPropagation();
        this.dismissTooltip();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal();
        }
      });
    }

    // Keyboard ESC close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeModal();
      }
    });
  },

  /**
   * Handles user tapping the bloom button
   */
  handleBloomClick(e) {
    this.clickCount++;
    const trigger = document.getElementById('easter-egg-trigger');
    const pill = document.getElementById('bloom-count-pill');
    const text = document.getElementById('bloom-tooltip-text');
    const fill = document.getElementById('bloom-progress-fill');
    const progressText = document.getElementById('bloom-progress-text');

    // Play cheerful chime
    this.playTone(280 + this.clickCount * 140, 'triangle', 0.15);

    // Spawn floating particle sparkles from click location
    this.spawnSparkle(e.clientX || 45, e.clientY || (window.innerHeight - 50));

    // Update trigger animation class
    if (trigger) {
      trigger.classList.remove('tap-1', 'tap-2', 'tap-3');
      void trigger.offsetWidth; // trigger reflow
      trigger.classList.add(`tap-${this.clickCount}`);
    }

    // Update progress pill
    if (pill) {
      pill.textContent = `${this.clickCount}/${this.maxClicks}`;
    }

    // Update tooltip guidance
    if (fill) {
      fill.style.width = `${(this.clickCount / this.maxClicks) * 100}%`;
    }
    if (progressText) {
      progressText.textContent = `${this.clickCount}/${this.maxClicks} Taps`;
    }

    if (this.clickCount === 1) {
      if (text) text.innerHTML = "You found it! 🌸 <strong>Tap 2 more times</strong> to unlock...";
    } else if (this.clickCount === 2) {
      if (text) text.innerHTML = "Almost there! ✨ <strong>Just 1 more tap</strong> for the secret!";
    } else if (this.clickCount >= this.maxClicks) {
      if (text) text.innerHTML = "✨ <strong>Surprise Unlocked!</strong> Loading secret romance...";
      
      // Play celebratory harp fanfare
      this.playHarpFanfare();

      // Launch modal after brief visual celebration
      setTimeout(() => {
        this.openModal();
        this.resetCounter();
      }, 500);
    }
  },

  resetCounter() {
    this.clickCount = 0;
    const trigger = document.getElementById('easter-egg-trigger');
    const pill = document.getElementById('bloom-count-pill');
    const fill = document.getElementById('bloom-progress-fill');
    const progressText = document.getElementById('bloom-progress-text');
    const text = document.getElementById('bloom-tooltip-text');

    if (trigger) trigger.classList.remove('tap-1', 'tap-2', 'tap-3');
    if (pill) pill.textContent = `0/3`;
    if (fill) fill.style.width = `0%`;
    if (progressText) progressText.textContent = `0/3 Taps`;
    if (text) text.innerHTML = "Psst! Tap this magical bloom <strong>3 times</strong> to reveal a romantic secret & surprise!";
  },

  dismissTooltip() {
    const tooltip = document.getElementById('bloom-tooltip');
    if (tooltip) {
      tooltip.style.opacity = '0';
      tooltip.style.pointerEvents = 'none';
      setTimeout(() => { tooltip.style.display = 'none'; }, 300);
    }
  },

  spawnSparkle(x, y) {
    const icons = ['🌸', '✨', '🌹', '💛', '💖'];
    const count = 3;
    for (let i = 0; i < count; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'bloom-sparkle';
      sparkle.textContent = icons[Math.floor(Math.random() * icons.length)];
      sparkle.style.left = `${x + (Math.random() * 40 - 20)}px`;
      sparkle.style.top = `${y + (Math.random() * 40 - 20)}px`;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }
  },

  /**
   * Sound engine via Web Audio API (Zero external network requests)
   */
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  },

  playTone(freq, type = 'sine', duration = 0.2) {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay restrictions gracefully handled
    }
  },

  playHarpFanfare() {
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'triangle', 0.45);
      }, idx * 90);
    });
  },

  /**
   * Open the immersive dark blur modal
   */
  openModal() {
    const modal = document.getElementById('easter-egg-modal');
    if (!modal) return;

    this.renderQuestionView();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.dismissTooltip();
  },

  closeModal() {
    this.clearAnimationTimeouts();
    const modal = document.getElementById('easter-egg-modal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';
  },

  /**
   * Screen 1: The Question ("Who are you?")
   */
  renderQuestionView() {
    this.clearAnimationTimeouts();
    const container = document.getElementById('easter-egg-dynamic-content');
    if (!container) return;

    container.innerHTML = `
      <div class="easter-egg-question-view">
        <span class="easter-egg-tag">Secret Chapter · YA.WARDA</span>
        <h2 class="easter-egg-title">Who are you?</h2>
        <p class="easter-egg-subtitle">
          Select your perspective to unlock the sweetest secret behind fresh flowers, emotions & romance...
        </p>

        <div class="choice-grid">
          <!-- Choice 1: Boyfriend -->
          <div class="choice-card" onclick="EasterEggEngine.selectRole('boyfriend')">
            <div class="choice-icon-wrap">👦</div>
            <h3 class="choice-role">A Boyfriend</h3>
            <p class="choice-desc">
              Looking to make her day, fix a moody moment, or remind her why you love her?
            </p>
            <span class="choice-btn">See Her Reaction &rarr;</span>
          </div>

          <!-- Choice 2: Girlfriend -->
          <div class="choice-card" onclick="EasterEggEngine.selectRole('girlfriend')">
            <div class="choice-icon-wrap">👧</div>
            <h3 class="choice-role">A Girlfriend</h3>
            <p class="choice-desc">
              Surprise him before anyone else does, drop a subtle hint, or treat yourself like a queen?
            </p>
            <span class="choice-btn">Watch The Magic &rarr;</span>
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Handles user selecting their role
   */
  selectRole(role) {
    this.currentRole = role;
    this.playTone(520, 'sine', 0.25);
    this.renderStoryView(role);
  },

  /**
   * Screen 2: The Animated Cartoon Doodle Story + Conversion Box
   */
  renderStoryView(role) {
    const container = document.getElementById('easter-egg-dynamic-content');
    if (!container) return;

    const isBoyfriend = role === 'boyfriend';

    container.innerHTML = `
      <div class="story-theater-container">
        <div class="story-back-nav">
          <button class="story-back-btn" onclick="EasterEggEngine.renderQuestionView()">
            &larr; Switch Perspective
          </button>
          <span class="story-mode-badge">${isBoyfriend ? 'Boyfriend Mode' : 'Girlfriend Mode'}</span>
        </div>

        <!-- Animated Doodle Cartoon Stage -->
        <div class="doodle-stage" id="doodle-stage">
          <!-- Step Indicator Pill -->
          <div class="story-step-pill" id="story-step-pill">
            <span class="step-dot"></span>
            <span id="step-pill-text">Scene 1: Feeling sad & down... 🌧️</span>
          </div>

          <!-- Replay Button -->
          <button class="story-replay-btn" onclick="EasterEggEngine.replayStory()" title="Replay bouquet handover animation">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M23 4v6h-6"></path><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
            Replay
          </button>

          ${isBoyfriend ? this.getBoyfriendStoryDoodle() : this.getGirlfriendStoryDoodle()}
        </div>

        <!-- Story Headline & Narrative Copy -->
        <h3 class="story-headline" id="story-headline">
          ${isBoyfriend 
            ? 'Fresh Flowers Melt Any Mood in 3 Seconds 🌹' 
            : 'Love is a Sweet Two-Way Street 💐'}
        </h3>
        <p class="story-lead" id="story-lead">
          ${isBoyfriend
            ? 'Science confirms that receiving hand-tied fresh blooms instantly releases dopamine, dissolving frustration into pure warmth. Don\'t wait for an anniversary — be the hero who makes her feel cherished today.'
            : 'Did you know men secretly cherish the rare moment they receive fresh flowers? Whether surprising your partner with thoughtful blooms or pampering yourself like the queen you are — you deserve every petal.'}
        </p>

        <!-- High-Impact Sales Conversion Card -->
        <div class="conversion-card">
          <div class="perk-pill">
            <span>🎁 Secret Romance Code:</span>
            <span class="perk-code" id="perk-code-text">${isBoyfriend ? 'SMILE10' : 'QUEEN10'}</span>
            <button class="perk-copy-btn" onclick="EasterEggEngine.copyCode('${isBoyfriend ? 'SMILE10' : 'QUEEN10'}')">Copy</button>
          </div>
          <p class="perk-details">
            ${isBoyfriend 
              ? '<strong>10% OFF</strong> any luxury bouquet + complimentary handwritten calligraphy love card & satin ribbon upgrade!'
              : '<strong>10% OFF</strong> + complimentary luxury fragrance misting & handwritten note!'}
          </p>

          <div class="conversion-actions">
            ${isBoyfriend ? `
              <!-- Boyfriend WhatsApp Order CTA -->
              <a href="${this.getWhatsAppOrderUrl('boyfriend')}" target="_blank" class="btn-whatsapp-romance">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                <span>Make Her Smile on WhatsApp</span>
              </a>
              <button class="btn-outline-romance" onclick="EasterEggEngine.browseRomanticBouquets()">
                Explore Romance Bouquets &rarr;
              </button>
            ` : `
              <!-- Girlfriend "Drop a Hint" Viral Button -->
              <a href="${this.getHintShareUrl()}" target="_blank" class="btn-hint-romance">
                <span>💌 Drop a Hint to Him on WhatsApp</span>
              </a>
              <!-- Girlfriend Self-Love Order CTA -->
              <a href="${this.getWhatsAppOrderUrl('girlfriend')}" target="_blank" class="btn-whatsapp-romance">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                <span>Treat Myself on WhatsApp 👑</span>
              </a>
            `}
          </div>
        </div>

        <div class="story-switch-route">
          Curious about the other side? 
          <button class="story-switch-btn" onclick="EasterEggEngine.renderStoryView('${isBoyfriend ? 'girlfriend' : 'boyfriend'}')">
            See ${isBoyfriend ? 'Girlfriend' : 'Boyfriend'} Edition
          </button>
        </div>
      </div>
    `;

    // Start timed physical bouquet handover animation
    this.startHandoverSequence(isBoyfriend);
  },

  replayStory() {
    this.renderStoryView(this.currentRole);
  },

  /**
   * SVG Doodle: Boyfriend physically gives flowers to sad Girlfriend
   */
  getBoyfriendStoryDoodle() {
    return `
      <svg class="doodle-canvas-svg" viewBox="0 0 500 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#555566"/>
            <stop offset="100%" stop-color="#333344"/>
          </linearGradient>
        </defs>

        <!-- Floor Shadows -->
        <ellipse cx="150" cy="195" rx="45" ry="8" fill="rgba(0,0,0,0.35)"/>
        <ellipse cx="340" cy="195" rx="45" ry="8" fill="rgba(0,0,0,0.35)"/>

        <!-- 1. RECEIVER: GIRLFRIEND (Seated on left at x = 150) -->
        <g id="receiver-group" class="receiver-group">
          <!-- Wooden Stool -->
          <line x1="130" y1="175" x2="125" y2="195" stroke="#777" stroke-width="3" stroke-linecap="round"/>
          <line x1="170" y1="175" x2="175" y2="195" stroke="#777" stroke-width="3" stroke-linecap="round"/>
          <rect x="120" y="165" width="60" height="10" rx="5" fill="#555"/>

          <!-- Legs & Feet -->
          <path d="M138 150 Q134 168 130 186" stroke="#FAF8F5" stroke-width="5" stroke-linecap="round"/>
          <path d="M162 150 Q166 168 170 186" stroke="#FAF8F5" stroke-width="5" stroke-linecap="round"/>

          <!-- Cozy Dress -->
          <path d="M132 120 C132 120, 122 148, 134 165 L166 165 C178 148, 168 120, 168 120 Z" fill="#E88295" stroke="#FAF8F5" stroke-width="3"/>

          <!-- Head & Flowing Hair -->
          <path d="M125 90 C120 65, 180 65, 175 90 C185 125, 175 145, 172 150 C165 148, 168 120, 168 100 C132 100, 135 148, 128 150 C125 145, 115 125, 125 90 Z" fill="#4A3728"/>
          <circle cx="150" cy="98" r="22" fill="#FFE5D9" stroke="#FAF8F5" stroke-width="3"/>
          <!-- Bangs -->
          <path d="M132 85 C140 78, 160 78, 168 85 C165 92, 158 94, 150 92 C142 94, 135 92, 132 85 Z" fill="#4A3728"/>

          <!-- Eyes (Initially Sad Slanted) -->
          <g id="receiver-eyes">
            <line x1="140" y1="96" x2="145" y2="98" stroke="#333" stroke-width="3" stroke-linecap="round"/>
            <line x1="155" y1="98" x2="160" y2="96" stroke="#333" stroke-width="3" stroke-linecap="round"/>
          </g>

          <!-- Mouth (Initially Pouty Frown) -->
          <path id="receiver-mouth" d="M144 109 Q150 105 156 109" stroke="#333" stroke-width="2.5" stroke-linecap="round" fill="none"/>

          <!-- Cheeks -->
          <circle id="receiver-blush-l" cx="137" cy="103" r="4" fill="#FFAAA6" opacity="0.3"/>
          <circle id="receiver-blush-r" cx="163" cy="103" r="4" fill="#FFAAA6" opacity="0.3"/>

          <!-- Teardrop -->
          <ellipse id="receiver-teardrop" class="tear-drop" cx="142" cy="103" rx="2" ry="3" fill="#64B5F6"/>

          <!-- Arms (Initially Crossed over chest) -->
          <path id="receiver-arms" d="M128 128 Q150 142 172 128" stroke="#FAF8F5" stroke-width="5" stroke-linecap="round" fill="none"/>

          <!-- Sad Rain Cloud -->
          <g id="sad-rain-cloud" class="sad-cloud" style="transition: opacity 0.5s ease;">
            <path d="M130 48 C125 48, 120 42, 125 36 C125 30, 135 28, 140 32 C145 24, 160 24, 165 32 C172 30, 178 36, 175 42 C180 48, 172 54, 166 52 C160 55, 135 55, 130 48 Z" fill="url(#cloudGrad)"/>
            <line x1="135" y1="56" x2="132" y2="64" stroke="#90CAF9" stroke-width="2" stroke-linecap="round"/>
            <line x1="150" y1="56" x2="147" y2="65" stroke="#90CAF9" stroke-width="2" stroke-linecap="round"/>
            <line x1="165" y1="56" x2="162" y2="63" stroke="#90CAF9" stroke-width="2" stroke-linecap="round"/>
          </g>
        </g>

        <!-- 2. GIVER: BOYFRIEND (Standing on right at x = 340) -->
        <g id="giver-group" class="giver-group standing">
          <!-- Pants & Shoes -->
          <line x1="330" y1="150" x2="326" y2="190" stroke="#37474F" stroke-width="6" stroke-linecap="round"/>
          <line x1="350" y1="150" x2="354" y2="190" stroke="#37474F" stroke-width="6" stroke-linecap="round"/>
          <!-- Shirt -->
          <path d="M320 115 C320 115, 315 145, 325 155 L355 155 C365 145, 360 115, 360 115 Z" fill="#2E7D32" stroke="#FAF8F5" stroke-width="3"/>

          <!-- Head & Hair -->
          <circle cx="340" cy="92" r="20" fill="#FFE5D9" stroke="#FAF8F5" stroke-width="3"/>
          <path d="M322 88 C320 70, 360 68, 358 88 C354 85, 345 84, 340 85 C335 84, 326 86, 322 88 Z" fill="#263238"/>

          <!-- Warm Eyes & Smile -->
          <circle cx="333" cy="90" r="2.5" fill="#222"/>
          <circle cx="347" cy="90" r="2.5" fill="#222"/>
          <path d="M334 99 Q340 106 346 99" stroke="#222" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <circle cx="330" cy="96" r="3.5" fill="#FFAB91" opacity="0.6"/>
          <circle cx="350" cy="96" r="3.5" fill="#FFAB91" opacity="0.6"/>

          <!-- Arms (Dynamic: holding, extending, or retracted) -->
          <path id="giver-arms" d="M325 124 Q305 130 295 125" stroke="#FAF8F5" stroke-width="5" stroke-linecap="round" fill="none"/>
        </g>

        <!-- 3. ANIMATED GLOWING BOUQUET (Independent Element that glides across) -->
        <g id="animated-bouquet" class="animated-bouquet state-giver">
          <!-- Bouquet Kraft Wrapping -->
          <polygon points="-16,24 -24,-10 24,-10 16,24 0,36" fill="#C5A880" stroke="#8F7249" stroke-width="2"/>
          <polygon points="-12,20 0,30 12,20" fill="#FAF8F5" opacity="0.85"/>
          <path d="M-8,26 C-14,21 -14,30 -8,26 C-2,21 8,21 2,26 C8,30 8,21 2,25" fill="#AE3712"/>

          <!-- Fresh Roses & Blooms -->
          <circle cx="-10" cy="-18" r="10" fill="#E85D75"/>
          <circle cx="0" cy="-26" r="12" fill="#FF758F"/>
          <circle cx="10" cy="-18" r="10" fill="#FF9EAA"/>
          <circle cx="0" cy="-12" r="8" fill="#FAF8F5"/>
          <circle cx="-14" cy="-28" r="6" fill="#FFF0F5"/>
          <circle cx="14" cy="-28" r="6" fill="#FFE4E1"/>

          <!-- Golden Aura -->
          <circle cx="0" cy="-18" r="22" stroke="#FFD700" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.7"/>
        </g>

        <!-- 4. CELEBRATION PARTICLES -->
        <g id="celebration-particles" style="opacity: 0; transition: opacity 0.6s ease;">
          <text x="130" y="45" font-size="20" class="heart-pop" fill="#E91E63">💖</text>
          <text x="170" y="35" font-size="16" class="heart-pop" style="animation-delay: 0.4s;" fill="#E91E63">💕</text>
          <text x="210" y="60" font-size="20" class="heart-pop" style="animation-delay: 0.8s;" fill="#E91E63">✨</text>
          <text x="150" y="25" font-size="26" class="star-glow">☀️</text>
        </g>
      </svg>
    `;
  },

  /**
   * SVG Doodle: Girlfriend physically gives flowers to slouching Boyfriend
   */
  getGirlfriendStoryDoodle() {
    return `
      <svg class="doodle-canvas-svg" viewBox="0 0 500 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cloudGradBf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4A5568"/>
            <stop offset="100%" stop-color="#2D3748"/>
          </linearGradient>
        </defs>

        <!-- Floor Shadows -->
        <ellipse cx="150" cy="195" rx="45" ry="8" fill="rgba(0,0,0,0.35)"/>
        <ellipse cx="340" cy="195" rx="45" ry="8" fill="rgba(0,0,0,0.35)"/>

        <!-- 1. RECEIVER: BOYFRIEND (Sitting slouched on left at x = 150) -->
        <g id="receiver-group" class="receiver-group">
          <!-- Stool -->
          <line x1="130" y1="175" x2="125" y2="195" stroke="#777" stroke-width="3" stroke-linecap="round"/>
          <line x1="170" y1="175" x2="175" y2="195" stroke="#777" stroke-width="3" stroke-linecap="round"/>
          <rect x="120" y="165" width="60" height="10" rx="5" fill="#555"/>

          <!-- Legs -->
          <path d="M138 152 Q132 170 128 188" stroke="#37474F" stroke-width="6" stroke-linecap="round"/>
          <path d="M162 152 Q168 170 172 188" stroke="#37474F" stroke-width="6" stroke-linecap="round"/>
          <!-- Slumped Hoodie -->
          <path d="M130 120 C125 130, 122 155, 132 165 L168 165 C178 155, 175 130, 170 120 Z" fill="#455A64" stroke="#FAF8F5" stroke-width="3"/>

          <!-- Head (Slouched) -->
          <circle cx="150" cy="100" r="21" fill="#FFE5D9" stroke="#FAF8F5" stroke-width="3"/>
          <path d="M131 94 C128 74, 170 72, 169 94 C165 90, 155 88, 150 90 C145 88, 135 90, 131 94 Z" fill="#263238"/>

          <!-- Eyes (Initially Tired/Sad) -->
          <g id="receiver-eyes">
            <line x1="139" y1="98" x2="145" y2="101" stroke="#333" stroke-width="3" stroke-linecap="round"/>
            <line x1="155" y1="101" x2="161" y2="98" stroke="#333" stroke-width="3" stroke-linecap="round"/>
          </g>

          <!-- Mouth (Initially Sighing) -->
          <path id="receiver-mouth" d="M143 111 Q150 108 157 111" stroke="#333" stroke-width="2.5" stroke-linecap="round" fill="none"/>

          <!-- Arms (Initially Resting limply on lap) -->
          <path id="receiver-arms" d="M130 130 Q150 152 170 130" stroke="#FAF8F5" stroke-width="5" stroke-linecap="round" fill="none"/>

          <!-- Stress / Sigh Cloud -->
          <g id="sad-rain-cloud" class="sad-cloud" style="transition: opacity 0.5s ease;">
            <path d="M126 50 C120 50, 116 44, 121 38 C121 32, 131 30, 136 34 C141 26, 156 26, 161 34 C168 32, 174 38, 171 44 C176 50, 168 56, 162 54 C156 57, 131 57, 126 50 Z" fill="url(#cloudGradBf)"/>
            <text x="133" y="47" font-size="10" fill="#E2E8F0" font-family="sans-serif">sigh...</text>
          </g>
        </g>

        <!-- 2. GIVER: GIRLFRIEND (Standing on right at x = 340) -->
        <g id="giver-group" class="giver-group standing">
          <!-- Flowing Purple Dress -->
          <path d="M322 135 L310 188 L370 188 L358 135 Z" fill="#9C27B0" stroke="#FAF8F5" stroke-width="3"/>

          <!-- Head & Waves -->
          <circle cx="340" cy="94" r="21" fill="#FFE5D9" stroke="#FAF8F5" stroke-width="3"/>
          <path d="M318 90 C314 65, 366 65, 362 90 C368 115, 360 135, 356 140 C350 135, 354 110, 354 96 C326 96, 330 135, 324 140 C320 135, 312 115, 318 90 Z" fill="#5D4037"/>

          <!-- Queen Crown Sparkle -->
          <text x="330" y="70" font-size="16">👑</text>

          <!-- Confident Warm Smile -->
          <circle cx="333" cy="92" r="2.5" fill="#222"/>
          <circle cx="347" cy="92" r="2.5" fill="#222"/>
          <path d="M334 100 Q340 108 346 100" stroke="#222" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <circle cx="328" cy="98" r="4" fill="#FF80AB" opacity="0.6"/>
          <circle cx="352" cy="98" r="4" fill="#FF80AB" opacity="0.6"/>

          <!-- Arms (Holding, Extending, or Retracted) -->
          <path id="giver-arms" d="M324 126 Q305 132 295 128" stroke="#FAF8F5" stroke-width="5" stroke-linecap="round" fill="none"/>
        </g>

        <!-- 3. ANIMATED SUNFLOWER & ROSE BOUQUET -->
        <g id="animated-bouquet" class="animated-bouquet state-giver">
          <!-- Wrap -->
          <polygon points="-16,24 -24,-10 24,-10 16,24 0,36" fill="#F4ECE1" stroke="#C5A880" stroke-width="2"/>
          <polygon points="-12,20 0,30 12,20" fill="#FAF8F5" opacity="0.85"/>
          <path d="M-8,26 C-14,21 -14,30 -8,26 C-2,21 8,21 2,26 C8,30 8,21 2,25" fill="#E85D75"/>

          <!-- Sunflowers & Blooms -->
          <circle cx="0" cy="-24" r="14" fill="#FFB300"/>
          <circle cx="0" cy="-24" r="7" fill="#4E342E"/>
          <circle cx="-12" cy="-14" r="8" fill="#FF5252"/>
          <circle cx="12" cy="-14" r="8" fill="#FF77A9"/>
          <circle cx="0" cy="-10" r="6" fill="#FFF"/>

          <!-- Halo -->
          <circle cx="0" cy="-18" r="22" stroke="#FFD700" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.7"/>
        </g>

        <!-- 4. CELEBRATION PARTICLES -->
        <g id="celebration-particles" style="opacity: 0; transition: opacity 0.6s ease;">
          <text x="130" y="45" font-size="20" class="heart-pop" fill="#E91E63">💖</text>
          <text x="170" y="35" font-size="16" class="heart-pop" style="animation-delay: 0.4s;" fill="#E91E63">💕</text>
          <text x="210" y="60" font-size="20" class="heart-pop" style="animation-delay: 0.8s;" fill="#E91E63">✨</text>
          <text x="150" y="25" font-size="26" class="star-glow">🌟</text>
        </g>
      </svg>
    `;
  },

  /**
   * Orchestrates the 3-Scene Physical Bouquet Handover Animation
   */
  startHandoverSequence(isBoyfriend) {
    this.clearAnimationTimeouts();
    if (!this.timeouts) this.timeouts = [];

    const pillText = document.getElementById('step-pill-text');
    const bouquet = document.getElementById('animated-bouquet');
    const giverGroup = document.getElementById('giver-group');
    const giverArms = document.getElementById('giver-arms');
    const receiverArms = document.getElementById('receiver-arms');
    const receiverEyes = document.getElementById('receiver-eyes');
    const receiverMouth = document.getElementById('receiver-mouth');
    const cloud = document.getElementById('sad-rain-cloud');
    const celebration = document.getElementById('celebration-particles');
    const teardrop = document.getElementById('receiver-teardrop');

    // SCENE 1: (0ms - 1200ms) - Receiver is sad, Giver stands with flowers
    if (pillText) {
      pillText.innerHTML = isBoyfriend 
        ? "Scene 1: She's feeling sad & distant... 🌧️"
        : "Scene 1: He's exhausted & stressed out... 🌧️";
    }

    // SCENE 2: (1200ms - 2500ms) - Giver steps in, extends arms, offers bouquet
    this.timeouts.push(setTimeout(() => {
      if (pillText) {
        pillText.innerHTML = isBoyfriend
          ? "Scene 2: He steps in with a fresh bouquet surprise! 💐"
          : "Scene 2: She arrives with fresh vibrant blooms! 💐";
      }

      // Giver leans forward
      if (giverGroup) {
        giverGroup.className = 'giver-group leaning';
      }

      // Giver extends arms forward
      if (giverArms) {
        giverArms.setAttribute('d', 'M315 120 Q260 126 215 122');
      }

      // Bouquet moves to offering position between them
      if (bouquet) {
        bouquet.className = 'animated-bouquet state-offering';
      }

      // Receiver looks up in surprise
      if (receiverEyes) {
        receiverEyes.innerHTML = `
          <circle cx="142" cy="97" r="3.5" fill="#222"/>
          <circle cx="158" cy="97" r="3.5" fill="#222"/>
        `;
      }
      if (receiverMouth) {
        receiverMouth.setAttribute('d', 'M146 108 Q150 114 154 108');
      }
      if (receiverArms) {
        receiverArms.setAttribute('d', 'M128 126 Q150 134 172 126');
      }

      // Gentle offering chime
      this.playTone(440, 'triangle', 0.2);
    }, 1200));

    // SCENE 3: (2600ms+) - Bouquet arrives in Receiver's arms, Hugged tight, Pure joy!
    this.timeouts.push(setTimeout(() => {
      if (pillText) {
        pillText.innerHTML = isBoyfriend
          ? "Scene 3: Bouquet received! Mood completely melted! 🥰💖"
          : "Scene 3: Bouquet received! Pure delight & happiness! 🥰💖";
      }

      // Bouquet physically lands on Receiver's chest
      if (bouquet) {
        bouquet.className = 'animated-bouquet state-received';
      }

      // Receiver wraps arms lovingly around the bouquet!
      if (receiverArms) {
        receiverArms.setAttribute('d', 'M125 120 Q122 150 150 150 Q178 150 175 120');
      }

      // Receiver group bounces with happiness
      const receiverGroup = document.getElementById('receiver-group');
      if (receiverGroup) {
        receiverGroup.className = 'receiver-group happy-hug';
      }

      // Receiver eyes sparkle with stars!
      if (receiverEyes) {
        receiverEyes.innerHTML = isBoyfriend ? `
          <text x="137" y="100" font-size="11" fill="#E91E63">★</text>
          <text x="156" y="100" font-size="11" fill="#E91E63">★</text>
        ` : `
          <text x="137" y="102" font-size="11" fill="#2E7D32">★</text>
          <text x="156" y="102" font-size="11" fill="#2E7D32">★</text>
        `;
      }

      // Receiver big joyful smile
      if (receiverMouth) {
        receiverMouth.setAttribute('d', 'M144 105 Q150 116 156 105 Z');
        receiverMouth.setAttribute('fill', '#E53935');
      }

      // Rosy blush
      const blushL = document.getElementById('receiver-blush-l');
      const blushR = document.getElementById('receiver-blush-r');
      if (blushL) blushL.setAttribute('opacity', '0.9');
      if (blushR) blushR.setAttribute('opacity', '0.9');

      // Hide raincloud & teardrop
      if (cloud) cloud.style.opacity = '0';
      if (teardrop) teardrop.style.opacity = '0';

      // Giver hands retract slightly with proud happy gesture
      if (giverGroup) {
        giverGroup.className = 'giver-group happy-retreat';
      }
      if (giverArms) {
        giverArms.setAttribute('d', 'M320 125 Q305 138 295 135');
      }

      // Celebration hearts & sunshine bloom
      if (celebration) celebration.style.opacity = '1';

      // Celebratory harp fanfare
      this.playHarpFanfare();
    }, 2600));
  },

  clearAnimationTimeouts() {
    if (this.timeouts && this.timeouts.length > 0) {
      this.timeouts.forEach(t => clearTimeout(t));
      this.timeouts = [];
    }
  },

  /**
   * Copies secret promo code to clipboard
   */
  copyCode(code) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        this.showCopiedNotice();
      }).catch(() => {
        this.fallbackCopy(code);
      });
    } else {
      this.fallbackCopy(code);
    }
  },

  fallbackCopy(code) {
    const input = document.createElement('input');
    input.value = code;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
    this.showCopiedNotice();
  },

  showCopiedNotice() {
    const btn = document.querySelector('.perk-copy-btn');
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = 'COPIED! ✓';
      btn.style.background = '#25D366';
      btn.style.color = '#FFF';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '#C5A880';
        btn.style.color = '#121212';
      }, 2000);
    }
  },

  /**
   * Generates prefilled WhatsApp Concierge URL
   */
  getWhatsAppOrderUrl(role) {
    const phone = "916235828338";
    let msg = "";
    if (role === 'boyfriend') {
      msg = "Hello YA.WARDA! 🌹 I unlocked your secret Easter Egg experience.\n\n" +
            "I want to surprise my girlfriend with a gorgeous fresh flower bouquet today to make her smile! 🥰\n\n" +
            "Please apply my secret perk code: *SMILE10* (10% off + free handwritten calligraphy card). What are your quickest delivery arrangements for Kuttiady/Kozhikode?";
    } else {
      msg = "Hello YA.WARDA! 👑 I unlocked your secret Easter Egg experience.\n\n" +
            "I am treating myself to fresh luxury blooms with my secret perk code: *QUEEN10* (10% off + luxury packaging)! 🌸\n\n" +
            "Can you share your best recommended fresh flower bouquets available for delivery?";
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  },

  /**
   * Generates viral "Drop a Hint" prefilled WhatsApp link to send to her partner
   */
  getHintShareUrl() {
    const text = "Hey handsome 🥰 Look at what I stumbled across on YA.WARDA...\n\n" +
                 "Just leaving this here in case you were wondering what would make me smile today 😉💐✨\n\n" +
                 "They even gave me a secret 10% OFF code: *QUEEN10* for fresh luxury flowers in Kozhikode & Kuttiady! Check them out: https://yawarda.com";
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  },

  /**
   * Closes modal and smoothly scrolls to catalog with highlight on roses/luxury
   */
  browseRomanticBouquets() {
    this.closeModal();
    const catalog = document.getElementById('shop-section');
    if (catalog) {
      catalog.scrollIntoView({ behavior: 'smooth' });

      // Automatically filter by roses
      const rosesTab = document.querySelector('.filter-tab[data-filter="roses"]');
      if (rosesTab) {
        rosesTab.click();
      }
    }
  }
};

// Auto-initialize when document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => EasterEggEngine.init());
} else {
  EasterEggEngine.init();
}
