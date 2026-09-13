(function () {
  initHiCursor();
  initScrollMotion();

  function initHiCursor() {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    var cursor = document.createElement("div");
    cursor.className = "hi-cursor";
    cursor.setAttribute("aria-hidden", "true");
    cursor.innerHTML =
      '<span class="hi-cursor-hand">👆</span>' +
      '<span class="hi-cursor-hi">Hi</span>';
    document.body.appendChild(cursor);
    document.documentElement.classList.add("hi-cursor-on");

    var hotSelector =
      "a, button, .btn, .campaign-item, .impact-card, .project-card, .more-project-card, .profile-image, .project-image-frame, .lupi-stage, [data-cursor]";

    function isHot(target) {
      return Boolean(target && target.closest && target.closest(hotSelector));
    }

    function setHot(on) {
      document.documentElement.classList.toggle("hi-cursor-hot", on);
      cursor.classList.toggle("is-on", on);
    }

    window.addEventListener(
      "mousemove",
      function (event) {
        cursor.style.transform =
          "translate(" + (event.clientX - 8) + "px, " + (event.clientY - 4) + "px)";
        setHot(isHot(event.target));
      },
      { passive: true }
    );

    document.addEventListener("mouseleave", function () {
      setHot(false);
    });
  }

  function initScrollMotion() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-motion]").forEach(function (el) {
        el.classList.add("is-in");
      });
      return;
    }

    var nodes = document.querySelectorAll("[data-motion]");
    if (!nodes.length || !("IntersectionObserver" in window)) {
      nodes.forEach(function (el) {
        el.classList.add("is-in");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach(function (el, index) {
      if (!el.style.getPropertyValue("--motion-delay")) {
        el.style.setProperty("--motion-delay", (index % 8) * 70 + "ms");
      }
      observer.observe(el);
    });
  }
})();
