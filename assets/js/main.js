/* ==========================================================
   Fono Agency India - fonoapp.in
   assets/js/main.js - vanilla JavaScript, no libraries.
   Handles: registration/download link settings, mobile menu,
   sticky header, smooth section scrolling, active nav states,
   and scroll reveal.
   ========================================================== */

/* ----------------------------------------------------------
   SITE LINK SETTINGS  (the only place you need to edit)
   Paste a VERIFIED official URL between the quotes.
   While a value is empty, the matching buttons open WhatsApp
   (+91 8132958338) with a message asking for the current link,
   and the "Download" button stays hidden.
   ---------------------------------------------------------- */
var FONO_LINKS = {
  hostRegistration: '',    // e.g. 'https://...'  -> every "JOIN AS HOST" registration button
  agencyRegistration: '',  // e.g. 'https://...'  -> every "JOIN AS AGENCY" registration button
  appDownload: ''          // e.g. 'https://...'  -> "Download the FONO App" buttons
};

(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js');

  /* ---------- Configurable registration / download links ---------- */
  function isUrl(v) { return typeof v === 'string' && /^https:\/\/\S+$/i.test(v.trim()); }

  document.querySelectorAll('[data-link]').forEach(function (el) {
    var key = el.getAttribute('data-link');
    var url = FONO_LINKS[key];
    if (!isUrl(url)) return;
    el.setAttribute('href', url.trim());
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
    if (el.hasAttribute('hidden')) el.removeAttribute('hidden');
  });
  // Notes such as "the button opens WhatsApp..." are hidden once a real link is set
  document.querySelectorAll('[data-link-note]').forEach(function (el) {
    if (isUrl(FONO_LINKS[el.getAttribute('data-link-note')])) el.setAttribute('hidden', '');
  });
  // Content shown only when a link is configured
  document.querySelectorAll('[data-link-show]').forEach(function (el) {
    if (isUrl(FONO_LINKS[el.getAttribute('data-link-show')])) el.removeAttribute('hidden');
  });

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 960) setMenu(false);
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        header.classList.toggle('scrolled', window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Smooth scroll to #about-us / #contact when arriving from another page ---------- */
  var isHome = document.body.classList.contains('page-home');
  if (isHome && location.hash && /^#[\w-]+$/.test(location.hash)) {
    var target = document.querySelector(location.hash);
    if (target && !reduce) {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
      window.addEventListener('load', function () {
        window.scrollTo(0, 0);
        setTimeout(function () { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 120);
      });
    }
  }

  /* ---------- Active state for About Us / Contact on the homepage ---------- */
  if (isHome && 'IntersectionObserver' in window) {
    var navLinks = {
      'about-us': document.querySelector('.site-nav a[data-section="about-us"]'),
      'contact': document.querySelector('.site-nav a[data-section="contact"]')
    };
    var homeLink = document.querySelector('.site-nav a[data-section="home"]');
    var visible = {};
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      var current = visible.contact ? 'contact' : (visible['about-us'] ? 'about-us' : null);
      Object.keys(navLinks).forEach(function (k) {
        if (navLinks[k]) navLinks[k].classList.toggle('is-active', k === current);
      });
      if (homeLink) {
        if (current) homeLink.removeAttribute('aria-current');
        else homeLink.setAttribute('aria-current', 'page');
      }
    }, { rootMargin: '-40% 0px -50% 0px' });
    ['about-us', 'contact'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || reduce) {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
