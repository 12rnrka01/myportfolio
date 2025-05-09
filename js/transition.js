document.addEventListener("DOMContentLoaded", function () {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        el.classList.add('show');

        // Typing effect
        if (el.classList.contains('typing-text')) {
          el.classList.add('typing');
        }

        // Only reveal once
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  revealElements.forEach(el => observer.observe(el));
});
