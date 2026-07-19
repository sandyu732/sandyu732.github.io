/* Shared behavior: theme toggle, menu, progress tracker */

(function () {
  var stored = localStorage.getItem('theme');
  if (stored) document.documentElement.setAttribute('data-theme', stored);
})();

function toggleTheme() {
  var current = document.documentElement.getAttribute('data-theme');
  var isDark = current ? current === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  var next = isDark ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

function toggleMenu() {
  document.getElementById('menu-panel').classList.toggle('open');
}

/* ---- Progress tracker ----
   All trackable items live under localStorage key "sec-interview-progress"
   as a JSON object: { "<pageSlug>": true, ... }
*/
var PROGRESS_KEY = 'sec-interview-progress';

function getProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function setProgress(slug, done) {
  var p = getProgress();
  if (done) p[slug] = true; else delete p[slug];
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

function isDone(slug) {
  return !!getProgress()[slug];
}

/* Call on pages with a "mark complete" checkbox */
function initPageComplete(slug) {
  var box = document.getElementById('page-complete');
  if (!box) return;
  box.checked = isDone(slug);
  box.addEventListener('change', function () {
    setProgress(slug, box.checked);
  });
}

/* Call on the landing page to render progress bar + per-topic checklist state */
function initProgressSummary(allSlugs) {
  var p = getProgress();
  var done = allSlugs.filter(function (s) { return p[s]; }).length;
  var total = allSlugs.length;
  var pct = total ? Math.round((done / total) * 100) : 0;
  var fill = document.getElementById('progress-fill');
  var label = document.getElementById('progress-pct');
  if (fill) fill.style.width = pct + '%';
  if (label) label.textContent = done + ' / ' + total + ' pages marked complete';

  document.querySelectorAll('[data-slug]').forEach(function (el) {
    var slug = el.getAttribute('data-slug');
    if (p[slug]) el.classList.add('is-done');
  });
}

document.addEventListener('DOMContentLoaded', function () {
  var path = window.location.pathname.replace(/\/index\.html$/, '/');
  document.querySelectorAll('.menu-sheet a[data-nav]').forEach(function (a) {
    var href = a.getAttribute('href');
    if (path.endsWith(href) || path.endsWith(href.replace('../', ''))) {
      a.classList.add('active');
    }
  });
});
