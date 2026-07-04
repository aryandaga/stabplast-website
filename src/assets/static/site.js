/* Progressive enhancement only. The site is fully functional without JS. */
(function () {
  "use strict";

  // ---- Mobile nav toggle (open/close, backdrop, scroll-lock, a11y) ----
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  var backdrop = document.querySelector("[data-nav-backdrop]");
  var navClose = document.querySelector("[data-nav-close]");
  if (toggle && nav) {
    var isOpen = function () { return nav.getAttribute("data-open") === "true"; };
    var setMenu = function (open) {
      nav.setAttribute("data-open", String(open));
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("nav-open", open);
      if (backdrop) {
        if (open) {
          backdrop.hidden = false;
          requestAnimationFrame(function () { backdrop.classList.add("is-open"); });
        } else {
          backdrop.classList.remove("is-open");
          setTimeout(function () { backdrop.hidden = true; }, 250);
        }
      }
    };
    toggle.addEventListener("click", function () { setMenu(!isOpen()); });
    if (navClose) navClose.addEventListener("click", function () { setMenu(false); toggle.focus(); });
    if (backdrop) backdrop.addEventListener("click", function () { setMenu(false); });
    // Close when any menu link (including Products category dropdown links) is tapped
    nav.addEventListener("click", function (e) {
      if (e.target.closest(".nav__link, .nav__dropdown-link")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) { setMenu(false); toggle.focus(); }
    });
  }

  // ---- Scroll-to-top (visibility + reliable click) ----
  var toTop = document.querySelector("[data-to-top]");
  if (toTop) {
    var onScroll = function () {
      if (window.scrollY > 600) toTop.classList.add("is-visible");
      else toTop.classList.remove("is-visible");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ---- Overlay header: transparent over hero, solid on scroll ----
  var overlayHeader = document.querySelector(".site-header--overlay");
  if (overlayHeader) {
    var onHeadScroll = function () {
      overlayHeader.classList.toggle("is-solid", window.scrollY > 60);
    };
    window.addEventListener("scroll", onHeadScroll, { passive: true });
    onHeadScroll();
  }

  // ---- Hero slider (fade, autoplay, dots + arrows, reduced-motion aware) ----
  var slider = document.querySelector("[data-slider]");
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll("[data-slide]"));
    var dots = Array.prototype.slice.call(slider.querySelectorAll("[data-dot]"));
    var idx = 0;
    var timer = null;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var DELAY = 4800; // 1.25x faster autoplay

    var go = function (n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, i) {
        var active = i === idx;
        s.classList.toggle("is-active", active);
        s.setAttribute("aria-hidden", active ? "false" : "true");
      });
      dots.forEach(function (d, i) {
        var active = i === idx;
        d.classList.toggle("is-active", active);
        d.setAttribute("aria-selected", active ? "true" : "false");
      });
    };
    var next = function () { go(idx + 1); };
    var prev = function () { go(idx - 1); };
    var stop = function () { if (timer) { clearInterval(timer); timer = null; } };
    var start = function () { if (!reduce && slides.length > 1) { stop(); timer = setInterval(next, DELAY); } };

    var nextBtn = slider.querySelector("[data-next]");
    var prevBtn = slider.querySelector("[data-prev]");
    if (nextBtn) nextBtn.addEventListener("click", function () { next(); start(); });
    if (prevBtn) prevBtn.addEventListener("click", function () { prev(); start(); });
    dots.forEach(function (d, i) {
      d.addEventListener("click", function () { go(i); start(); });
    });

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);

    go(0);
    start();
  }

  // ---- Contact form → Apps Script (Turnstile-gated, appends to Google Sheet) ----
  var cform = document.querySelector("[data-contact-form]");
  if (cform) {
    var statusEl = cform.querySelector("[data-form-status]");
    var setStatus = function (msg, kind) {
      if (!statusEl) return;
      statusEl.textContent = msg;
      statusEl.className = "form-status" + (kind ? " form-status--" + kind : "");
    };
    cform.addEventListener("submit", function (e) {
      var action = cform.getAttribute("action");
      if (!action || action === "#") return; // endpoint not configured yet → no-op
      e.preventDefault();
      var hp = cform.querySelector('[name="_gotcha"]');
      if (hp && hp.value) return; // honeypot tripped → silently drop
      var token = cform.querySelector('[name="cf-turnstile-response"]');
      if (!token || !token.value) {
        setStatus("Please complete the verification below and try again.", "error");
        return;
      }
      var btn = cform.querySelector('button[type="submit"]');
      if (btn) btn.disabled = true;
      setStatus("Sending your enquiry…", "");
      fetch(action, { method: "POST", body: new FormData(cform), mode: "no-cors" })
        .then(function () {
          cform.reset();
          if (window.turnstile) { try { window.turnstile.reset(); } catch (err) {} }
          setStatus("Thank you! Your enquiry has been sent — we'll get back to you within one business day.", "ok");
        })
        .catch(function () {
          setStatus("Sorry, something went wrong. Please email us instead.", "error");
        })
        .finally(function () { if (btn) btn.disabled = false; });
    });
  }

  // ---- Count-up stats (animate 0→target when scrolled into view) ----
  var statsBand = document.querySelector("[data-stats]");
  if (statsBand) {
    var nums = Array.prototype.slice.call(statsBand.querySelectorAll("[data-count]"));
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var fmt = function (n) { return n.toLocaleString("en-IN"); };
    var runCount = function () {
      nums.forEach(function (el) {
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var suffix = el.getAttribute("data-suffix") || "";
        if (reduceMotion) { el.textContent = fmt(target) + suffix; return; }
        var startTs = null;
        var dur = 2500;
        var tick = function (ts) {
          if (!startTs) startTs = ts;
          var p = Math.min((ts - startTs) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = fmt(Math.round(target * eased)) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        };
        el.textContent = "0" + suffix;
        requestAnimationFrame(tick);
      });
    };
    if ("IntersectionObserver" in window) {
      var statsObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { runCount(); statsObs.disconnect(); } });
      }, { threshold: 0.35 });
      statsObs.observe(statsBand);
    } else {
      runCount();
    }
  }
})();
