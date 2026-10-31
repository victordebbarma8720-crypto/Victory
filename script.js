/* ==========================================================
   Chamet Agency India - script.js
   Vanilla JavaScript only. Handles: mobile menu, sticky header
   shadow, scroll reveal, commission calculator, Beans estimator.
   ========================================================== */
(function () {
  'use strict';

  var doc = document.documentElement;
  doc.classList.add('js');

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
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) setMenu(false);
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
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

  /* ---------- Helpers ---------- */
  var usd = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  var plain = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

  function num(input) {
    if (!input) return NaN;
    var v = parseFloat(String(input.value).replace(/,/g, ''));
    return isFinite(v) ? v : NaN;
  }

  /* ---------- Commission calculator ----------
     Estimated commission = eligible earnings x (your ratio - sub-agent ratio).
     For direct hosts, leave the sub-agent ratio at 0. */
  document.querySelectorAll('form[data-calc="commission"]').forEach(function (form) {
    var earnings = form.querySelector('[name="earnings"]');
    var rate = form.querySelector('[name="rate"]');
    var sub = form.querySelector('[name="subrate"]');
    var out = form.querySelector('output');
    var detail = form.querySelector('.calc-detail');

    function update() {
      var e = num(earnings), r = num(rate), s = num(sub);
      if (isNaN(s)) s = 0;
      if (isNaN(e) || isNaN(r) || e < 0 || r < 0 || s < 0 || r > 100 || s > 100) {
        out.textContent = '--';
        detail.textContent = 'Enter eligible earnings and percentages between 0 and 100 to see an estimate.';
        return;
      }
      var diff = Math.max(0, r - s);
      var result = e * diff / 100;
      out.textContent = usd.format(result);
      if (s > r) {
        detail.textContent = 'The sub-agent ratio is higher than your ratio, so the estimated commission on these earnings is $0.00.';
      } else {
        detail.textContent = '(' + plain.format(r) + '% - ' + plain.format(s) + '%) x ' + usd.format(e) + ' = ' + usd.format(result) +
          '. Estimate only - actual commission is calculated by the platform.';
      }
    }

    form.addEventListener('input', update);
    form.addEventListener('submit', function (e) { e.preventDefault(); update(); });
    form.addEventListener('reset', function () { setTimeout(update, 0); });
    update();
  });

  /* ---------- Beans estimator ----------
     Estimated USD = Beans / (Beans per 1 USD). The rate must be entered
     by the visitor from the current rate shown in the app. */
  document.querySelectorAll('form[data-calc="beans"]').forEach(function (form) {
    var beans = form.querySelector('[name="beans"]');
    var ratio = form.querySelector('[name="ratio"]');
    var out = form.querySelector('output');
    var detail = form.querySelector('.calc-detail');

    function update() {
      var b = num(beans), r = num(ratio);
      if (isNaN(b) || isNaN(r) || b < 0 || r <= 0) {
        out.textContent = '--';
        detail.textContent = 'Enter your Beans and the current conversion rate shown in the Chamet app.';
        return;
      }
      var result = b / r;
      out.textContent = usd.format(result);
      detail.textContent = plain.format(b) + ' Beans / ' + plain.format(r) + ' Beans per $1 = ' + usd.format(result) +
        '. Estimate only - the platform rate and eligibility decide the real amount.';
    }

    form.addEventListener('input', update);
    form.addEventListener('submit', function (e) { e.preventDefault(); update(); });
    update();
  });

  /* ---------- Hide any image that fails to load ---------- */
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () { img.style.visibility = 'hidden'; });
  });
})();
