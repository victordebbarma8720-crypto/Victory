/* ==========================================================
   Fono Agency India - fonoapp.in
   assets/js/main.js - vanilla JavaScript, no libraries.
   Handles: referral-code popup for app links, mobile menu,
   sticky header, smooth section scrolling, active nav states,
   and scroll reveal.
   ========================================================== */

/* ----------------------------------------------------------
   APP LINK + REFERRAL CODE  (edit here and in the HTML buttons)
   Every "JOIN AS HOST", "JOIN AS AGENCY" and "DOWNLOAD FONO APP"
   button links to the same app download and carries
   data-referral. Clicking one opens a popup that shows the
   referral code (with a Copy button) before the download.
   ---------------------------------------------------------- */
var FONO_APP = {
  url: 'https://frnd1.blr1.digitaloceanspaces.com/Fono.apk',
  referralCode: 'ALFVVDRU'
};

(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js');

  /* ---------- Referral code popup ---------- */
  var modal = null, lastTrigger = null, continueLink = null, copyBtn = null, codeEl = null;

  function buildModal() {
    modal = document.createElement('div');
    modal.className = 'ref-modal';
    modal.setAttribute('hidden', '');
    modal.innerHTML =
      '<div class="ref-backdrop" data-close></div>' +
      '<div class="ref-dialog" role="dialog" aria-modal="true" aria-labelledby="ref-title" aria-describedby="ref-desc">' +
        '<button type="button" class="ref-close" data-close aria-label="Close">&times;</button>' +
        '<p class="ref-kicker">Take agency or become host on Fono.<br><span lang="hi">Fono \u092a\u0930 \u0939\u094b\u0938\u094d\u091f \u092c\u0928\u0947\u0902 \u092f\u093e \u090f\u091c\u0947\u0902\u0938\u0940 \u0932\u0947\u0902</span></p>' +
        '<h2 id="ref-title">Use my referral code</h2>' +
        '<p id="ref-desc">Enter this code when you register as a host or agency in the FONO app.</p>' +
        '<div class="ref-code-row"><span class="ref-code"></span><button type="button" class="btn btn-outline btn-sm ref-copy">Copy code</button></div>' +
        '<ol class="ref-steps"><li>Download and install the FONO app (Android).</li><li>Choose <b>Host</b> or <b>Agency</b>.</li><li>Enter referral code <b class="ref-code-inline"></b>.</li></ol>' +
        '<a class="btn btn-primary btn-block ref-continue" rel="nofollow noopener">Continue to download</a>' +
      '</div>';
    document.body.appendChild(modal);
    continueLink = modal.querySelector('.ref-continue');
    copyBtn = modal.querySelector('.ref-copy');
    codeEl = modal.querySelector('.ref-code');

    modal.addEventListener('click', function (e) {
      if (e.target.closest('[data-close]')) closeModal();
    });
    continueLink.addEventListener('click', function () { setTimeout(closeModal, 300); });
    copyBtn.addEventListener('click', function () { copyCode(codeEl.textContent); });
    modal.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeModal(); return; }
      if (e.key !== 'Tab') return;
      var f = modal.querySelectorAll('button, a[href]');
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  function copyCode(code) {
    function done(ok) {
      copyBtn.textContent = ok ? 'Copied \u2713' : 'Copy failed';
      setTimeout(function () { copyBtn.textContent = 'Copy code'; }, 2000);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(code).then(function () { done(true); }, function () { done(fallbackCopy(code)); });
    } else {
      done(fallbackCopy(code));
    }
  }

  function fallbackCopy(code) {
    var t = document.createElement('textarea');
    t.value = code; t.setAttribute('readonly', ''); t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    document.body.removeChild(t);
    return ok;
  }

  function openModal(trigger) {
    if (!modal) buildModal();
    lastTrigger = trigger;
    var code = trigger.getAttribute('data-referral') || FONO_APP.referralCode;
    codeEl.textContent = code;
    modal.querySelector('.ref-code-inline').textContent = code;
    continueLink.setAttribute('href', trigger.getAttribute('href') || FONO_APP.url);
    modal.removeAttribute('hidden');
    document.body.classList.add('modal-open');
    copyBtn.focus();
  }

  function closeModal() {
    if (!modal || modal.hasAttribute('hidden')) return;
    modal.setAttribute('hidden', '');
    document.body.classList.remove('modal-open');
    if (lastTrigger) lastTrigger.focus();
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[data-referral]');
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    openModal(a);
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
