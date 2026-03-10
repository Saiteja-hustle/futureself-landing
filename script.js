/* ==========================================================================
   FutureSelf Landing Page - script.js
   ========================================================================== */

(function () {
  'use strict';

  // --- Supabase Setup ---
  var SUPABASE_URL = 'https://odcmrhnwxzgyfodoscqw.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kY21yaG53eHpneWZvZG9zY3F3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3NzA5NTUsImV4cCI6MjA4ODM0Njk1NX0.dbTm2SsVo7iAWfoULhfRgayKBmAO8v7Y2Q-fHzvzSPQ';
  var CHROME_STORE_URL = '#pricing'; // Replace with actual Chrome Web Store URL when available

  var supabaseClient = null;
  if (window.supabase && window.supabase.createClient) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

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

  // --- Hamburger menu ---
  function initHamburger() {
    var hamburger = document.getElementById('nav-hamburger');
    var navLinks = document.getElementById('nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
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

  // --- Auth Modal ---
  function initAuthModal() {
    var modal = document.getElementById('auth-modal');
    var closeBtn = document.getElementById('auth-modal-close');
    if (!modal || !closeBtn) return;

    var tabs = modal.querySelectorAll('.auth-tab');
    var signupContent = document.getElementById('auth-tab-signup');
    var loginContent = document.getElementById('auth-tab-login');

    function openModal(tab) {
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      switchTab(tab || 'signup');
      clearMessages();
    }

    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }

    function switchTab(tabName) {
      tabs.forEach(function (t) {
        t.classList.toggle('active', t.getAttribute('data-tab') === tabName);
      });
      if (signupContent) signupContent.style.display = tabName === 'signup' ? 'block' : 'none';
      if (loginContent) loginContent.style.display = tabName === 'login' ? 'block' : 'none';
      clearMessages();
    }

    function clearMessages() {
      var errors = modal.querySelectorAll('.auth-error');
      var successes = modal.querySelectorAll('.auth-success');
      errors.forEach(function (el) { el.textContent = ''; });
      successes.forEach(function (el) { el.textContent = ''; });
    }

    // Tab switching
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        switchTab(this.getAttribute('data-tab'));
      });
    });

    // Close button
    closeBtn.addEventListener('click', closeModal);

    // Click outside to close
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    // Escape key to close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.style.display === 'flex') closeModal();
    });

    // Signup form
    var signupForm = document.getElementById('auth-signup-form');
    if (signupForm && supabaseClient) {
      signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = document.getElementById('signup-email').value.trim();
        var password = document.getElementById('signup-password').value;
        var errorEl = document.getElementById('signup-error');
        var successEl = document.getElementById('signup-success');
        errorEl.textContent = '';
        successEl.textContent = '';

        if (password.length < 6) {
          errorEl.textContent = 'Password must be at least 6 characters.';
          return;
        }

        var submitBtn = signupForm.querySelector('.auth-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Creating account...';

        supabaseClient.auth.signUp({ email: email, password: password })
          .then(function (result) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Join Waitlist';
            if (result.error) {
              errorEl.textContent = result.error.message;
            } else {
              successEl.textContent = 'Check your email to confirm your account!';
              signupForm.reset();
            }
          })
          .catch(function (err) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Join Waitlist';
            errorEl.textContent = 'Something went wrong. Please try again.';
          });
      });
    }

    // Login form
    var loginForm = document.getElementById('auth-login-form');
    if (loginForm && supabaseClient) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = document.getElementById('login-email').value.trim();
        var password = document.getElementById('login-password').value;
        var errorEl = document.getElementById('login-error');
        var successEl = document.getElementById('login-success');
        errorEl.textContent = '';
        successEl.textContent = '';

        var submitBtn = loginForm.querySelector('.auth-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Logging in...';

        supabaseClient.auth.signInWithPassword({ email: email, password: password })
          .then(function (result) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Log In';
            if (result.error) {
              errorEl.textContent = result.error.message;
            } else {
              successEl.textContent = "You're logged in! Install the extension.";
              closeModal();
              updateUIForAuth(result.data.session);
            }
          })
          .catch(function (err) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Log In';
            errorEl.textContent = 'Something went wrong. Please try again.';
          });
      });
    }

    // Expose openModal for CTA buttons
    window._openAuthModal = openModal;
  }

  // --- CTA Button Handlers ---
  function initCTAButtons() {
    // Free trial CTAs open the auth modal (signup tab)
    document.querySelectorAll('.cta-free-trial').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (window._openAuthModal) {
          window._openAuthModal('signup');
        }
      });
    });
  }

  // --- Auth State Management ---
  function updateUIForAuth(session) {
    var navUser = document.getElementById('nav-user');
    var navUserEmail = document.getElementById('nav-user-email');
    var navCtaBtn = document.getElementById('nav-cta-btn');
    var freeTrialBtns = document.querySelectorAll('.cta-free-trial');

    if (session && session.user) {
      // Logged in
      if (navUser) navUser.style.display = 'flex';
      if (navUserEmail) navUserEmail.textContent = session.user.email;
      if (navCtaBtn) {
        navCtaBtn.textContent = 'Install Extension';
        navCtaBtn.href = CHROME_STORE_URL;
        navCtaBtn.classList.remove('cta-free-trial');
      }

      freeTrialBtns.forEach(function (btn) {
        btn.textContent = 'Install Extension';
        btn.href = CHROME_STORE_URL;
        btn.classList.remove('cta-free-trial');
        // Remove old click handler by cloning
        var newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
      });
    } else {
      // Not logged in
      if (navUser) navUser.style.display = 'none';
      if (navCtaBtn) {
        navCtaBtn.textContent = 'Install Extension';
        navCtaBtn.href = '#pricing';
      }
    }
  }

  function initAuthState() {
    if (!supabaseClient) return;

    supabaseClient.auth.getSession().then(function (result) {
      var session = result.data ? result.data.session : null;
      updateUIForAuth(session);
    });

    // Listen for auth changes
    supabaseClient.auth.onAuthStateChange(function (event, session) {
      updateUIForAuth(session);
    });
  }

  // --- Logout ---
  function initLogout() {
    var logoutBtn = document.getElementById('nav-logout');
    if (!logoutBtn || !supabaseClient) return;

    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      supabaseClient.auth.signOut().then(function () {
        updateUIForAuth(null);
      });
    });
  }

  // --- Init ---
  document.addEventListener('DOMContentLoaded', function () {
    createStarfield();
    initFadeIn();
    initNavScroll();
    initHamburger();
    initSmoothScroll();
    initHeroParallax();
    initAuthModal();
    initCTAButtons();
    initAuthState();
    initLogout();
  });
})();
