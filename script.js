/**
 * BtwUs Main Script Controller
 * Orchestrates modular page functionalities, header layout changes, and mobile navigation drawers.
 */

import { initFeatures } from './js/features.js';
import { initFaqs } from './js/faq.js';
import { initRouting } from './js/routing.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize global header scrolling styling
  initHeaderScroll();

  // 2. Initialize mobile navigation drawer
  initMobileMenu();

  // 3. Initialize feature tabs (if on index.html)
  if (document.getElementById('features')) {
    initFeatures();
  }

  // 4. Initialize FAQs (if on index.html)
  if (document.getElementById('faqs')) {
    initFaqs();
  }

  // 5. Initialize hash-routing and IntersectionObserver scroll navigation
  initRouting();
});

/**
 * Adds scroll listener to shrink and style header dynamically
 */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.remove('bg-white/70');
      header.classList.add('bg-white/95', 'shadow-sm');
    } else {
      header.classList.remove('bg-white/95', 'shadow-sm');
      header.classList.add('bg-white/70');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
}

/**
 * Attaches hamburger trigger and panel controls for responsive mobile navigation
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (!mobileMenuBtn || !mobileMenu) return;

  // Toggle drawer and menu icon path
  const toggleMenu = () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      menuIcon.setAttribute('d', 'M6 18L18 6M6 6l12 12'); // 'X' close icon
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    } else {
      mobileMenu.classList.add('hidden');
      menuIcon.setAttribute('d', 'M4 6h16M4 12h16m-7 6h7'); // Hamburger icon
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
  };

  mobileMenuBtn.addEventListener('click', toggleMenu);

  // Close menu drawer when clicking a link inside it
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('hidden')) {
        toggleMenu();
      }
    });
  });
}
