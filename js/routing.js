/**
 * BtwUs Routing & Scroll Spy Manager
 * Manages legal tab changes based on URL hashes, smooth scroll offset corrections, and active menu highlights.
 */

export function initRouting() {
  // A. Check if we are on the Legal Page (privacy.html)
  const isLegalPage = !!document.getElementById('privacy-section');

  if (isLegalPage) {
    initLegalTabs();
    initLegalScrollSpy();
  } else {
    initLandingScrollSpy();
  }

  // B. Rectify smooth scroll offset for anchor links to compensate for sticky header
  initSmoothScrollFix();
}

/**
 * Manages tab-switching between Privacy Policy and Terms of Service via hashes
 */
function initLegalTabs() {
  const tabPrivacyBtn = document.getElementById('tab-privacy-btn');
  const tabTermsBtn = document.getElementById('tab-terms-btn');
  
  if (!tabPrivacyBtn || !tabTermsBtn) return;

  const privacySection = document.getElementById('privacy-section');
  const termsSection = document.getElementById('terms-section');
  const privacyNav = document.getElementById('privacy-nav');
  const termsNav = document.getElementById('terms-nav');
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');

  const activeClasses = ['bg-gradient-to-r', 'from-brand-start', 'to-brand-end', 'text-white', 'shadow-sm'];
  const inactiveClasses = ['text-brand-muted', 'hover:text-brand-text'];

  const switchTab = (tab) => {
    if (tab === 'privacy') {
      // Toggle sections
      privacySection.classList.remove('hidden');
      privacySection.classList.add('block');
      termsSection.classList.add('hidden');
      termsSection.classList.remove('block');
      
      // Toggle sidebar nav groups
      privacyNav.classList.remove('hidden');
      privacyNav.classList.add('block');
      termsNav.classList.add('hidden');
      termsNav.classList.remove('block');

      // Update button styles
      activeClasses.forEach(c => {
        tabPrivacyBtn.classList.add(c);
        tabTermsBtn.classList.remove(c);
      });
      inactiveClasses.forEach(c => {
        tabPrivacyBtn.classList.remove(c);
        tabTermsBtn.classList.add(c);
      });

      // Update Hero display copy
      heroTitle.textContent = "BtwUs Privacy Policy";
      heroSubtitle.textContent = "Your relationship data is sacred. That is why it is stored locally and completely encrypted. No cloud, no catch.";
    } else {
      // Toggle sections
      termsSection.classList.remove('hidden');
      termsSection.classList.add('block');
      privacySection.classList.add('hidden');
      privacySection.classList.remove('block');

      // Toggle sidebar nav groups
      termsNav.classList.remove('hidden');
      termsNav.classList.add('block');
      privacyNav.classList.add('hidden');
      privacyNav.classList.remove('block');

      // Update button styles
      activeClasses.forEach(c => {
        tabTermsBtn.classList.add(c);
        tabPrivacyBtn.classList.remove(c);
      });
      inactiveClasses.forEach(c => {
        tabTermsBtn.classList.remove(c);
        tabPrivacyBtn.classList.add(c);
      });

      // Update Hero display copy
      heroTitle.textContent = "BtwUs Terms of Service";
      heroSubtitle.textContent = "Please read these simple terms carefully. By using our offline app, you agree to these rules and ownership disclaimers.";
    }
  };

  // Route initial loading state depending on URL hash
  const routeCurrentHash = () => {
    const hash = window.location.hash;
    if (hash.startsWith('#terms')) {
      switchTab('terms');
    } else {
      switchTab('privacy');
    }
  };

  // Setup tab click event listeners
  tabPrivacyBtn.addEventListener('click', () => {
    window.location.hash = 'privacy';
    switchTab('privacy');
  });

  tabTermsBtn.addEventListener('click', () => {
    window.location.hash = 'terms';
    switchTab('terms');
  });

  // Listen to external hash changes (e.g. clicking logo or footer links)
  window.addEventListener('hashchange', routeCurrentHash);
  routeCurrentHash(); // Run once on startup
}

/**
 * Highlights side navbar links on privacy.html dynamically as the user scrolls
 */
function initLegalScrollSpy() {
  const sections = document.querySelectorAll('#privacy-section section, #terms-section section');
  const links = document.querySelectorAll('aside nav a');
  if (sections.length === 0 || links.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.className = 'flex items-center px-3 py-2 text-sm font-semibold rounded-lg text-brand-accent bg-white border border-brand-divider shadow-brand-soft';
          } else {
            link.className = 'flex items-center px-3 py-2 text-sm font-medium rounded-lg text-brand-muted hover:text-brand-text hover:bg-white/50 transition';
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * Highlights main header links on index.html dynamically as the user scrolls
 */
function initLandingScrollSpy() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('#desktop-menu a.nav-link');
  if (sections.length === 0 || navLinks.length === 0) return;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === `#${activeId}`) {
            link.classList.add('text-brand-accent');
            link.classList.remove('text-brand-text/80');
          } else {
            link.classList.remove('text-brand-accent');
            link.classList.add('text-brand-text/80');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/**
 * Rectifies anchor jumps to prevent sticky header overlays on anchor targets
 */
function initSmoothScrollFix() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const targetElement = document.querySelector(href);
      if (targetElement) {
        e.preventDefault();
        
        // Calculate offset (Sticky header is ~76px high)
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update URL hash without breaking default scrolling behaviors
        history.pushState(null, null, href);
      }
    });
  });
}
