/* ============================================================
   My Portfolio — index.js
   Author: Jabulani Kapherachoka
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------
     DARK MODE (system default, localStorage override)
  ---------------------------------------------------------- */
  const html = document.documentElement;

  function getThemePreference() {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function applyTheme(theme) {
    html.classList.toggle("dark", theme === "dark");
    document.querySelectorAll("[id^='theme-icon']").forEach((icon) => {
      icon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    });
  }

  function toggleTheme() {
    const next = html.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem("theme", next);
    applyTheme(next);
  }

  applyTheme(getThemePreference());
  document.querySelectorAll("#theme-toggle, #theme-toggle-mobile").forEach((btn) => {
    btn?.addEventListener("click", toggleTheme);
  });

  /* ----------------------------------------------------------
     UNIFIED HEADER — entrance + transparent-to-glass nav
  ---------------------------------------------------------- */
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add("loaded")));

  const siteNav = document.getElementById("site-nav");
  const mobileBar = document.getElementById("mobile-bar");
  function onHeaderScroll() {
    const scrolled = window.scrollY > 40;
    siteNav?.classList.toggle("nav-scrolled", scrolled);
    mobileBar?.classList.toggle("nav-scrolled", scrolled);
  }
  window.addEventListener("scroll", onHeaderScroll, { passive: true });
  onHeaderScroll();

  /* ----------------------------------------------------------
     MOBILE MENU (overlay panel)
  ---------------------------------------------------------- */
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");

  function setMenu(open) {
    if (!mobileMenu || !menuBtn) return;
    mobileMenu.classList.toggle("hidden", !open);
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    if (menuIcon) menuIcon.className = open ? "fa fa-times text-orange-500 text-xl" : "fa fa-bars text-orange-500 text-xl";
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => setMenu(mobileMenu.classList.contains("hidden")));
    mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !mobileMenu.classList.contains("hidden")) {
        setMenu(false);
        menuBtn.focus();
      }
    });
    document.addEventListener("click", (e) => {
      if (!mobileMenu.classList.contains("hidden") && !menuBtn.contains(e.target) && !mobileMenu.contains(e.target)) setMenu(false);
    });
  }

  /* ----------------------------------------------------------
     PORTFOLIO TABS
  ---------------------------------------------------------- */
  window.showCategory = function (category) {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.classList.toggle("hidden", !(category === "all" || card.classList.contains(category)));
    });
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      const btnCategory = btn.getAttribute("onclick")?.match(/'([^']+)'/)?.[1];
      const isActive = btnCategory === category;
      btn.classList.toggle("active-tab", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });
  };
  showCategory("all");

  /* ----------------------------------------------------------
     TYPEWRITER EFFECT
  ---------------------------------------------------------- */
  const typewriterEl = document.getElementById("typewriter");
  const phrases = ["Backend Developer", "Software Developer", "Full-Stack Developer", "Front-End Developer"];
  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let isDeleting = false;

  function typeLoop() {
    if (!typewriterEl) return;
    const currentPhrase = phrases[phraseIndex];
    charIndex += isDeleting ? -1 : 1;
    typewriterEl.textContent = currentPhrase.substring(0, charIndex);
    let delay = isDeleting ? 40 : 80;
    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 1100;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 180;
    }
    setTimeout(typeLoop, delay);
  }

  if (typewriterEl) {
    typewriterEl.textContent = phrases[0];
    if (!prefersReducedMotion) setTimeout(typeLoop, 1400);
  }

  /* ----------------------------------------------------------
     ABOUT SPOTLIGHT — cards glow where the cursor is
  ---------------------------------------------------------- */
  if (!prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".about-card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        card.style.setProperty("--my", `${e.clientY - rect.top}px`);
      });
    });
  }

  /* ----------------------------------------------------------
     SERVICES EXPAND — reveal the remaining services
  ---------------------------------------------------------- */
  const servicesToggle = document.getElementById("services-toggle");
  const servicesLabel = document.getElementById("services-toggle-label");
  const servicesIcon = document.getElementById("services-toggle-icon");

  if (servicesToggle) {
    servicesToggle.addEventListener("click", () => {
      const extras = document.querySelectorAll(".extra-service");
      const isHidden = extras[0]?.classList.contains("hidden");
      extras.forEach((card) => card.classList.toggle("hidden", !isHidden));
      servicesToggle.setAttribute("aria-expanded", String(isHidden));
      if (servicesLabel) servicesLabel.textContent = isHidden ? "Show fewer services" : "Explore more services";
      if (servicesIcon) {
        servicesIcon.className = isHidden
          ? "fa-solid fa-chevron-up text-xs transition-transform duration-300"
          : "fa-solid fa-chevron-down text-xs transition-transform duration-300";
      }
      if (isHidden) extras[0]?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "nearest" });
    });
  }

  /* ----------------------------------------------------------
     SCROLLSPY — highlight active desktop nav link
  ---------------------------------------------------------- */
  const navLinks = document.querySelectorAll("[data-navlink]");
  const sections = [...navLinks]
    .map((a) => document.getElementById(a.getAttribute("data-navlink")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((a) => a.classList.toggle("nav-link-active", a.getAttribute("data-navlink") === entry.target.id));
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ----------------------------------------------------------
     REVEAL ON SCROLL + PROGRESS BARS
  ---------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("visible"), revealer.unobserve(e.target))),
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  const progressFills = document.querySelectorAll(".progress-fill[data-progress]");
  function fillBars() {
    progressFills.forEach((bar) => {
      bar.style.width = `${bar.getAttribute("data-progress")}%`;
    });
  }
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const barObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (fillBars(), barObs.disconnect())),
      { threshold: 0.3 }
    );
    const building = document.getElementById("currently-building");
    if (building) barObs.observe(building);
    else fillBars();
  } else {
    fillBars();
  }

  /* ----------------------------------------------------------
     ANIMATED COUNTERS
  ---------------------------------------------------------- */
  const counters = document.querySelectorAll("[data-count]");
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    if (Number.isNaN(target)) return;
    if (prefersReducedMotion) {
      el.textContent = String(target);
      return;
    }
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window) {
    const cObs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (animateCounter(e.target), cObs.unobserve(e.target))),
      { threshold: 0.5 }
    );
    counters.forEach((c) => cObs.observe(c));
  } else {
    counters.forEach(animateCounter);
  }

  /* ----------------------------------------------------------
     BACK TO TOP
  ---------------------------------------------------------- */
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => backToTop.classList.toggle("show", window.scrollY > 600), { passive: true });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));
  }

  /* ----------------------------------------------------------
     CONTACT FORM — inline validation + toast + fetch
  ---------------------------------------------------------- */
  const form = document.getElementById("contact-form");
  const toast = document.getElementById("form-toast");
  let toastTimer = null;

  function showToast(message, type = "") {
    if (!toast) return;
    toast.textContent = message;
    toast.className = type ? `show ${type}` : "show";
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show", "success", "error"), 4000);
  }

  function setError(input, message) {
    const err = document.querySelector(`[data-error-for="${input.id}"]`);
    if (err) err.textContent = message || "";
    input.classList.toggle("invalid", Boolean(message));
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("contact-name");
      const email = document.getElementById("contact-email");
      const message = document.getElementById("contact-message");
      let valid = true;

      if (!name.value.trim()) {
        setError(name, "Please enter your name.");
        valid = false;
      } else setError(name, "");

      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        setError(email, "Please enter a valid email.");
        valid = false;
      } else setError(email, "");

      if (!message.value.trim() || message.value.trim().length < 10) {
        setError(message, "Please write a message (10+ characters).");
        valid = false;
      } else setError(message, "");

      if (!valid) {
        showToast("Please fix the highlighted fields.", "error");
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const original = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending…";
      }

      try {
        const res = await fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form),
        });
        if (res.ok) {
          form.reset();
          showToast("Message sent — I’ll reply within 1–2 days.", "success");
        } else {
          showToast("Couldn’t send just now. Email me directly instead.", "error");
        }
      } catch {
        showToast("Network error. Email me directly instead.", "error");
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = original;
        }
      }
    });

    form.querySelectorAll("input, textarea").forEach((input) => {
      input.addEventListener("input", () => setError(input, ""));
    });
  }
});
