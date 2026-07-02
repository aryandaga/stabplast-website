/* Progressive enhancement only. The site is fully functional without JS. */
(function () {
  "use strict";

  // ---- Mobile nav toggle ----
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Open menu" : "Close menu");
    });
    // Close on link click (mobile)
    nav.addEventListener("click", function (e) {
      if (e.target.closest(".nav__link")) {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.getAttribute("data-open") === "true") {
        nav.setAttribute("data-open", "false");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  // ---- Scroll-to-top visibility ----
  var toTop = document.querySelector("[data-to-top]");
  if (toTop) {
    var onScroll = function () {
      if (window.scrollY > 600) toTop.classList.add("is-visible");
      else toTop.classList.remove("is-visible");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
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
    var DELAY = 6000;

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
})();
