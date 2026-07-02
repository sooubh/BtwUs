/**
 * BtwUs FAQ Accordion Module
 * Handles expand/collapse transitions and accessibility (ARIA) updates.
 */

export function initFaqs() {
  const faqButtons = document.querySelectorAll('[id^="faq-btn-"]');
  faqButtons.forEach(button => {
    button.addEventListener('click', () => toggleFaq(button));
  });
}

/**
 * Toggles a single FAQ accordion item and collapses others
 * @param {HTMLButtonElement} button - The button triggered by the user
 */
function toggleFaq(button) {
  const content = button.nextElementSibling;
  const indicator = button.querySelector('span:last-child');
  
  if (!content || !indicator) return;

  // Close all other FAQs
  document.querySelectorAll('.faq-content').forEach(c => {
    if (c !== content) {
      c.style.maxHeight = null;
      const otherBtn = c.previousElementSibling;
      if (otherBtn) {
        const otherIndicator = otherBtn.querySelector('span:last-child');
        if (otherIndicator) otherIndicator.style.transform = 'rotate(0deg)';
        otherBtn.setAttribute('aria-expanded', 'false');
      }
      c.setAttribute('aria-hidden', 'true');
    }
  });

  // Toggle active FAQ
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    indicator.style.transform = 'rotate(0deg)';
    button.setAttribute('aria-expanded', 'false');
    content.setAttribute('aria-hidden', 'true');
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
    indicator.style.transform = 'rotate(45deg)';
    button.setAttribute('aria-expanded', 'true');
    content.setAttribute('aria-hidden', 'false');
  }
}
