/* ==========================================================================
   FutureSelf Landing Page — script.js
   ========================================================================== */

(function () {
  'use strict';

  // --- Starfield ---
  function createStarfield() {
    var container = document.getElementById('starfield');
    if (!container) return;
    var count = Math.min(80, Math.floor(window.innerWidth / 15));
    for (var i = 0; i < count; i++) {
      var star = document.createElement('div');
      star.className = 'star';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      var size = Math.random() * 1.5 + 0.5;
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      star.style.setProperty('--dur', (Math.random() * 4 + 2) + 's');
      star.style.setProperty('--min-o', (Math.random() * 0.15).toFixed(2));
      star.style.setProperty('--max-o', (Math.random() * 0.5 + 0.2).toFixed(2));
      star.style.animationDelay = (Math.random() * 5) + 's';
      container.appendChild(star);
    }
  }

  // --- Scroll-triggered fade-in (Intersection Observer) ---
  function initFadeIn() {
    var elements = document.querySelectorAll('.fade-in');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // --- Navbar scroll effect ---
  function initNavScroll() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    var scrolled = false;
    function checkScroll() {
      var isScrolled = window.scrollY > 40;
      if (isScrolled !== scrolled) {
        scrolled = isScrolled;
        nav.classList.toggle('scrolled', scrolled);
      }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // --- Smooth scroll for anchor links ---
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // --- Subtle parallax on hero ---
  function initHeroParallax() {
    var heroVisual = document.querySelector('.hero-visual');
    if (!heroVisual || window.innerWidth < 768) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var scrollY = window.scrollY;
          if (scrollY < window.innerHeight) {
            heroVisual.style.transform = 'translateY(' + (scrollY * 0.08) + 'px)';
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // --- Button hover ripple effect ---
  function initButtonEffects() {
    document.querySelectorAll('.btn-primary').forEach(function (btn) {
      btn.addEventListener('mouseenter', function () {
        this.style.transition = 'transform 0.2s, box-shadow 0.2s';
      });
    });
  }

  // --- Init ---
  document.addEventListener('DOMContentLoaded', function () {
    createStarfield();
    initFadeIn();
    initNavScroll();
    initSmoothScroll();
    initHeroParallax();
    initButtonEffects();
  });
})();
