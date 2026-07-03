/* ============================================================
   ALL FLORIDA CPTED LLC — Shared JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Hamburger / Mobile Nav ---------- */
  function initMobileNav() {
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    if (!hamburger || !mobileNav) return;

    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Hero Slider ---------- */
  function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length < 2) return;

    let current = 0;
    let timer;

    function goTo(idx) {
      slides[current].classList.remove('active');
      current = (idx + slides.length) % slides.length;
      slides[current].classList.add('active');
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() {
      timer = setInterval(next, 5000);
    }

    function resetAuto() {
      clearInterval(timer);
      startAuto();
    }

    const btnPrev = document.querySelector('.hero-arrow.prev');
    const btnNext = document.querySelector('.hero-arrow.next');
    if (btnPrev) btnPrev.addEventListener('click', function () { prev(); resetAuto(); });
    if (btnNext) btnNext.addEventListener('click', function () { next(); resetAuto(); });

    slides[0].classList.add('active');
    startAuto();
  }

  /* ---------- Active nav item ---------- */
  function initActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.main-nav a, .mobile-nav a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) return;
      // Normalize
      const normalizedHref = href.replace(/\/+$/, '') || '/';
      const normalizedPath = path.replace(/\/+$/, '') || '/';
      if (normalizedPath === normalizedHref || (normalizedHref !== '' && normalizedPath.startsWith(normalizedHref) && normalizedHref !== '/')) {
        link.classList.add('nav-active');
      }
    });

    // Highlight dropdown parent when on fl-statutes
    if (path.includes('fl-statutes') || path.includes('7-security-measures')) {
      document.querySelectorAll('.nav-dropdown > a').forEach(function (a) {
        a.classList.add('nav-active');
      });
    }
  }

  /* ---------- Contact form (Web3Forms) ---------- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const origText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      const data = new FormData(form);

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data
      })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (json.success) {
            form.innerHTML = '<p style="color:#0B4A45;font-weight:600;font-size:1.05rem;padding:20px 0;">Thank you! Your message has been sent. We\'ll be in touch shortly.</p>';
          } else {
            btn.textContent = origText;
            btn.disabled = false;
            alert('There was a problem submitting your form. Please try again or call us at (352) 559-4295.');
          }
        })
        .catch(function () {
          btn.textContent = origText;
          btn.disabled = false;
          alert('There was a problem submitting your form. Please try again or call us at (352) 559-4295.');
        });
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initHeroSlider();
    initActiveNav();
    initContactForm();
  });
})();
