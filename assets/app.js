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
