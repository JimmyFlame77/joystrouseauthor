/* ============================================================
   Joy Strouse Author Site — Main JavaScript
   Vanilla JS only. No dependencies.
   ============================================================ */

(function () {
  'use strict';

  /* ── 1. MOBILE MENU (page-turn fold) ── */
  const hamburger  = document.querySelector('[data-hamburger]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  const overlay    = document.querySelector('[data-menu-overlay]');

  function openMenu() {
    mobileMenu.classList.add('is-open');
    overlay.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    overlay.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (hamburger && mobileMenu && overlay) {
    hamburger.addEventListener('click', function () {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        hamburger.focus();
      }
    });

    // Close menu on nav link click (single-page anchor navigation)
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ── 2. ACTIVE NAV HIGHLIGHT ── */
  // Marks current page link as active based on pathname
  const currentPath = window.location.pathname;
  document.querySelectorAll('.site-nav a, .mobile-menu a').forEach(function (link) {
    if (link.getAttribute('href') === currentPath ||
        (currentPath.startsWith('/blog') && link.getAttribute('href') === '/blog/')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ── 3. SCROLL REVEAL (lightweight, no library) ── */
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

})();
