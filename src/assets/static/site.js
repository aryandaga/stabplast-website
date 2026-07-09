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
    // Close when any menu link (dropdown links + the drawer's quote CTA) is tapped
    nav.addEventListener("click", function (e) {
      if (e.target.closest(".nav__link, .nav__dropdown-link, .nav__cta a")) setMenu(false);
    });
    // Mobile accordions: sub-menus stay collapsed until their chevron is tapped
    Array.prototype.forEach.call(nav.querySelectorAll("[data-subtoggle]"), function (btn) {
      btn.addEventListener("click", function () {
        var li = btn.closest(".nav__item");
        var open = li.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
      });
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

  // ---- Hero slider (fade, autoplay w/ progress-bar tabs, reduced-motion aware) ----
  var slider = document.querySelector("[data-slider]");
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll("[data-slide]"));
    var dots = Array.prototype.slice.call(slider.querySelectorAll("[data-dot]"));
    var fills = dots.map(function (d) { return d.querySelector(".hero-slider__tab-fill"); });
    var idx = 0;
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var DELAY = 4800;
    var raf = null;
    var startTs = 0;
    var elapsed = 0; // ms already counted toward the current slide (survives pause)
    var progress = 0; // 0..1 fill of the active tab (JS-tracked, never read back from the DOM)
    var playing = false;

    var setFill = function (i, p) { if (fills[i]) fills[i].style.transform = "scaleX(" + p + ")"; };

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
      fills.forEach(function (f) { if (f) f.style.transform = "scaleX(0)"; });
      elapsed = 0;
      progress = 0;
      startTs = 0;
    };
    var next = function () { go(idx + 1); };

    // One rAF loop owns both the visual fill and the slide advance, so the bar
    // and the timer stay perfectly in sync and pause/resume together.
    var frame = function (ts) {
      if (!startTs) startTs = ts;
      progress = Math.min((elapsed + (ts - startTs)) / DELAY, 1);
      setFill(idx, progress);
      if (progress >= 1) next();
      if (playing) raf = window.requestAnimationFrame(frame);
    };
    var start = function () {
      if (reduce || slides.length < 2 || playing) return;
      playing = true;
      startTs = 0;
      raf = window.requestAnimationFrame(frame);
    };
    var stop = function () {
      if (!playing) return;
      playing = false;
      if (raf) { window.cancelAnimationFrame(raf); raf = null; }
      elapsed = progress * DELAY; // freeze from JS state (not the DOM) so resume is exact
      startTs = 0;
    };

    dots.forEach(function (d, i) {
      d.addEventListener("click", function () { go(i); stop(); start(); });
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
      // Same-origin endpoint (/api/contact → Netlify Function → Apps Script).
      // Never a cross-origin script.google.com/.../exec URL — that is the phishing
      // signature that got this domain flagged. See contact.njk / netlify.toml.
      var endpoint = cform.getAttribute("action") || "/api/contact";
      e.preventDefault(); // never let the browser POST this form natively
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
      // Same-origin now, so drop no-cors and read the JSON {ok} the function returns.
      fetch(endpoint, { method: "POST", body: new FormData(cform) })
        .then(function (res) {
          return res.json().catch(function () { return { ok: res.ok }; });
        })
        .then(function (data) {
          if (!data || !data.ok) throw new Error("submit-failed");
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

  // ---- Cookie notice (minimal, dismiss remembered) ----
  var cookieNotice = document.querySelector("[data-cookie-notice]");
  if (cookieNotice) {
    var acked = false;
    try { acked = localStorage.getItem("cookieAck") === "1"; } catch (e) {}
    if (!acked) cookieNotice.hidden = false;
    var cookieOk = cookieNotice.querySelector("[data-cookie-ok]");
    if (cookieOk) cookieOk.addEventListener("click", function () {
      cookieNotice.hidden = true;
      try { localStorage.setItem("cookieAck", "1"); } catch (e) {}
    });
  }
})();
