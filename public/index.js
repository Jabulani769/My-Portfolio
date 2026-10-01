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
     REVEAL ON SCROLL
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

  /* ----------------------------------------------------------
     BACK TO TOP
  ---------------------------------------------------------- */
  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", () => backToTop.classList.toggle("show", window.scrollY > 600), { passive: true });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" }));
  }
});
