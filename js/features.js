/**
 * BtwUs Features Component Module
 * Manages rendering of dynamic interactive mockup views and active tab styles.
 */

// Data for interactive features tabs
const featuresData = {
  'timeline': {
    title: "📸 Chronological Memory Timeline",
    desc: "Preserve all your relationship events chronologically. Capture texts, photos, videos, and files in a beautifully formatted scrollable feed. Easily search tags, emotions, or keyword notes locally.",
    bullets: [
      "Auto-grouped by dates and relationship milestones",
      "Includes local voice memos and media details",
      "Optional biometric vault lock protection"
    ],
    mockup: `
      <div id="visual-content" class="w-full space-y-4">
        <div class="bg-white p-3 rounded-lg shadow-sm border border-brand-divider max-w-[280px] mx-auto text-left flex items-start space-x-3">
          <div class="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent font-bold">❤️</div>
          <div>
            <p class="text-xs font-bold text-brand-text">First Date Met</p>
            <p class="text-[10px] text-brand-muted">Met at The Daily Bean cafe</p>
          </div>
        </div>
        <div class="bg-white p-3 rounded-lg shadow-sm border border-brand-divider max-w-[280px] mx-auto text-left flex items-start space-x-3">
          <div class="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent font-bold">💍</div>
          <div>
            <p class="text-xs font-bold text-brand-text">Engaged!</p>
            <p class="text-[10px] text-brand-muted">She said YES under the stars</p>
          </div>
        </div>
      </div>
    `
  },
  'whatsapp': {
    title: "💬 Local WhatsApp Chat Parser",
    desc: "Transform your raw, export chat logs into readable relationship chronicles. Open your exported WhatsApp `.txt` file locally inside BtwUs to parse, filter, and search messages natively.",
    bullets: [
      "100% offline parsing: no text lines are sent to cloud APIs",
      "Filter by sentiments (fights, declarations of love, etc.)",
      "Render chats in matching threaded messaging bubbles"
    ],
    mockup: `
      <div id="visual-content" class="w-full space-y-3">
        <div class="bg-brand-accent/10 border border-brand-accent/20 p-2 rounded-lg max-w-[240px] text-left text-[11px] text-brand-accent font-bold mx-auto">
          📂 whatsapp_chat_with_her.txt loaded
        </div>
        <div class="space-y-1 max-w-[260px] mx-auto">
          <div class="bg-white p-2 rounded-lg text-left text-xs border border-brand-divider">
            <span class="font-bold text-brand-accent">Her:</span> Happy anniversary sweetie! ❤️
          </div>
          <div class="bg-brand-accent text-white p-2 rounded-lg text-right text-xs">
            Happy anniversary! I love you!
          </div>
        </div>
      </div>
    `
  },
  'commitments': {
    title: "🤝 Accountability & Promise Streaks",
    desc: "Define commitments, goals, and promises with your partner. Log daily updates, track accountability streaks, and resolve friction together using clear status indicators.",
    bullets: [
      "Streak tracking for good habits (e.g. weekly date nights)",
      "Status color indicators: Green (Done), Orange (Pending), Red (Overdue)",
      "Partner confirmation checks for added fun accountability"
    ],
    mockup: `
      <div id="visual-content" class="w-full space-y-3">
        <div class="bg-white p-3 rounded-lg border-l-4 border-green-500 shadow-sm max-w-[260px] mx-auto text-left">
          <p class="text-xs font-bold text-brand-text">Weekly Date Night</p>
          <div class="flex items-center justify-between pt-1">
            <span class="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">Active Streak: 5 weeks</span>
            <span class="text-[9px] text-brand-muted">Saturday 7 PM</span>
          </div>
        </div>
        <div class="bg-white p-3 rounded-lg border-l-4 border-orange-500 shadow-sm max-w-[260px] mx-auto text-left">
          <p class="text-xs font-bold text-brand-text">No Phones During Dinner</p>
          <div class="flex items-center justify-between pt-1">
            <span class="text-[10px] text-orange-600 font-bold bg-orange-50 px-1.5 py-0.5 rounded">Pending check-in</span>
            <span class="text-[9px] text-brand-muted">Daily at 8 PM</span>
          </div>
        </div>
      </div>
    `
  },
  'local-ai': {
    title: "🤖 Intelligent On-Device AI Classification",
    desc: "Harness local machine learning algorithms to automatically enrich your relationship records. BtwUs uses on-device Google ML Kit models for categorization and search index generation.",
    bullets: [
      "Auto-categorization of fights, sweet notes, and dates",
      "Smart replies suggestions for chat drafts generated locally",
      "Zero telemetry: models operate with zero network connections"
    ],
    mockup: `
      <div id="visual-content" class="w-full space-y-3">
        <div class="bg-white p-2.5 rounded-lg border border-brand-divider max-w-[280px] mx-auto text-left space-y-2">
          <p class="text-[10px] text-brand-muted font-bold uppercase tracking-wider">AI Sentiment Analysis</p>
          <p class="text-xs text-brand-text italic">"I'm sorry we argued about the bills. Let's talk it out over dinner."</p>
          <div class="flex space-x-2">
            <span class="text-[9px] font-bold bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">Resolved Dispute</span>
            <span class="text-[9px] font-bold bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full">Date Planned</span>
          </div>
        </div>
      </div>
    `
  }
};

export function initFeatures() {
  const tabs = {
    'timeline': document.getElementById('tab-timeline'),
    'whatsapp': document.getElementById('tab-whatsapp'),
    'commitments': document.getElementById('tab-commitments'),
    'local-ai': document.getElementById('tab-local-ai')
  };

  Object.entries(tabs).forEach(([key, btn]) => {
    if (btn) {
      btn.addEventListener('click', () => showFeature(key, btn));
    }
  });
}

/**
 * Updates UI copy and layouts matching selected features
 * @param {string} featureKey - Key in featuresData map
 * @param {HTMLButtonElement} button - The button clicked
 */
function showFeature(featureKey, button) {
  // Toggle button active state style and ARIA selected states (WCAG Tablist Pattern)
  const buttons = button.parentNode.querySelectorAll('button');
  buttons.forEach(btn => {
    btn.className = "px-5 py-2.5 rounded-full font-outfit text-sm font-semibold text-brand-muted hover:text-brand-text transition-all duration-300";
    btn.setAttribute('aria-selected', 'false');
  });
  
  button.className = "px-5 py-2.5 rounded-full font-outfit text-sm font-bold bg-white text-brand-accent border border-brand-divider shadow-sm transition-all duration-300 active-feature-tab";
  button.setAttribute('aria-selected', 'true');

  // Load data
  const data = featuresData[featureKey];
  if (!data) return;

  const featureTitle = document.getElementById('feature-title');
  const featureDesc = document.getElementById('feature-desc');
  const bulletsList = document.getElementById('feature-bullets');
  const mockContainer = document.getElementById('feature-mock');
  const featurePanel = document.getElementById('feature-panel');

  if (featureTitle) featureTitle.textContent = data.title;
  if (featureDesc) featureDesc.textContent = data.desc;
  
  // Load bullets
  if (bulletsList) {
    bulletsList.innerHTML = '';
    data.bullets.forEach(bullet => {
      const li = document.createElement('li');
      li.className = "flex items-center space-x-2";
      li.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-brand-accent"></span><span>${bullet}</span>`;
      bulletsList.appendChild(li);
    });
  }

  // Load mockup
  if (mockContainer) {
    mockContainer.innerHTML = data.mockup;
  }

  // Update panel label association (A11y)
  if (featurePanel) {
    featurePanel.setAttribute('aria-labelledby', button.id);
  }
}
