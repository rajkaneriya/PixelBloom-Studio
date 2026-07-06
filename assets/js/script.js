document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const navToggle = document.querySelector(".nav__toggle");
  const navList = document.querySelector(".nav__list");
  const header = document.querySelector(".header");
  const logo = document.querySelector(".nav__logo");
  const backToTopBtn = document.querySelector(".back-to-top");

  // Initialize functionality
  initNavigation();
  initHeaderScroll();
  initFAQAccordion();
  initBackToTopButton();

  /**
   * Initialize Navigation Toggle
   */
  function initNavigation() {
    if (!navToggle || !navList) return;

    navToggle.addEventListener("click", toggleMobileMenu);
  }

  /**
   * Toggle Mobile Navigation Menu
   */
  function toggleMobileMenu() {
    navList.classList.toggle("nav__list--open");
    animateToggleBars();
  }

  /**
   * Animate hamburger toggle bars
   */
  function animateToggleBars() {
    const bars = navToggle.querySelectorAll(".nav__toggle-bar");
    const isOpen = navList.classList.contains("nav__list--open");

    bars[0].style.transform = isOpen ? "translateY(8px) rotate(45deg)" : "none";
    bars[1].style.opacity = isOpen ? "0" : "1";
    bars[2].style.transform = isOpen
      ? "translateY(-8px) rotate(-45deg)"
      : "none";
  }

  /**
   * Initialize Header Scroll Effect
   */
  function initHeaderScroll() {
    if (!header) return;

    // Only prevent default and smooth scroll if already on home page
    logo?.addEventListener("click", (e) => {
      const currentPath = window.location.pathname;
      if (
        currentPath === "/" ||
        currentPath === "/index.html" ||
        currentPath === ""
      ) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // Allow normal navigation if on a different page
    });

    window.addEventListener("scroll", updateHeaderOnScroll);
  }

  /**
   * Update header appearance on scroll
   */
  function updateHeaderOnScroll() {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  /**
   * Initialize FAQ Accordion
   */
  function initFAQAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      if (question) {
        question.addEventListener("click", () =>
          handleFAQToggle(item, faqItems),
        );
      }
    });
  }

  /**
   * Handle FAQ item toggle
   */
  function handleFAQToggle(item, faqItems) {
    // Close other open items
    faqItems.forEach((otherItem) => {
      if (otherItem !== item && otherItem.classList.contains("active")) {
        otherItem.classList.remove("active");
        const otherIcon = otherItem.querySelector(".faq-icon");
        if (otherIcon) otherIcon.textContent = "+";
      }
    });

    // Toggle current item
    item.classList.toggle("active");
    const icon = item.querySelector(".faq-icon");
    if (icon) {
      icon.textContent = item.classList.contains("active") ? "−" : "+";
    }
  }

  /**
   * Initialize Back to Top Button
   */
  function initBackToTopButton() {
    if (!backToTopBtn) return;

    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", toggleBackToTopButton);
  }

  /**
   * Toggle back to top button visibility
   */
  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  }
});
