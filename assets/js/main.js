/**
* Tejus Paturu — Portfolio
* Vanilla JS: typed hero, mobile nav, scrollspy, back-to-top, AOS.
*/
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hero typed text
  var typedEl = document.querySelector(".typed");
  if (typedEl) {
    var typedStrings = (typedEl.getAttribute("data-typed-items") || "").split(",");
    if (reduceMotion) {
      typedEl.textContent = typedStrings[0] || "";
    } else {
      new Typed(".typed", {
        strings: typedStrings,
        loop: true,
        typeSpeed: 100,
        backSpeed: 50,
        backDelay: 2000
      });
    }
  }

  // Mobile navigation
  var navToggle = document.querySelector(".mobile-nav-toggle");
  var navMenu = document.querySelector(".nav-menu");

  function setMobileNav(open) {
    document.body.classList.toggle("mobile-nav-active", open);
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      var icon = navToggle.querySelector("i");
      if (icon) {
        icon.classList.toggle("bx-menu", !open);
        icon.classList.toggle("bx-x", open);
      }
    }
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      setMobileNav(!document.body.classList.contains("mobile-nav-active"));
    });
  }

  if (navMenu) {
    navMenu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMobileNav(false);
    });
  }

  document.addEventListener("click", function (e) {
    if (
      document.body.classList.contains("mobile-nav-active") &&
      !e.target.closest(".nav-menu") &&
      !e.target.closest(".mobile-nav-toggle")
    ) {
      setMobileNav(false);
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMobileNav(false);
  });

  // Scroll state: spy, nav glass, back-to-top
  var header = document.getElementById("header");
  var backToTop = document.querySelector(".back-to-top");
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-menu a[href^='#']"));
  var scrollTicking = false;

  function updateScrollState() {
    scrollTicking = false;
    var y = window.scrollY;

    if (header) header.classList.toggle("scrolled", y > 40);
    if (backToTop) backToTop.classList.toggle("show", y > 400);

    var probe = y + window.innerHeight / 3;
    var currentId = sections.length ? sections[0].id : null;
    sections.forEach(function (sec) {
      if (probe >= sec.offsetTop) currentId = sec.id;
    });
    // Bottom of page: force last section active
    if (window.innerHeight + y >= document.documentElement.scrollHeight - 4 && sections.length) {
      currentId = sections[sections.length - 1].id;
    }

    navLinks.forEach(function (link) {
      var active = link.getAttribute("href") === "#" + currentId;
      link.parentElement.classList.toggle("active", active);
    });
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!scrollTicking) {
        scrollTicking = true;
        window.requestAnimationFrame(updateScrollState);
      }
    },
    { passive: true }
  );

  window.addEventListener("load", updateScrollState);

  // Scroll reveal animations
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      mirror: false,
      disable: reduceMotion
    });
  }
})();
