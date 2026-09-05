function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const next = current === 'dark' ? 'light' : current === 'light' ? 'dark' : (prefersDark ? 'light' : 'dark');
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

(function () {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

document.addEventListener('DOMContentLoaded', () => {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => observer.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
  const heroPhoto = document.querySelector('.hero-photo');
  const brandPhoto = document.querySelector('.brand-photo');
  if (!heroPhoto || !brandPhoto || !('IntersectionObserver' in window)) return;
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      brandPhoto.classList.toggle('is-hidden', entry.isIntersecting);
    });
  }, { threshold: 0 });
  heroObserver.observe(heroPhoto);
});
