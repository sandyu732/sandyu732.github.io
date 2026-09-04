(function () {
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function renderProfile(profile) {
    if (!profile) return;
    if (profile.name) {
      document.title = profile.name;
      document.querySelectorAll('[data-field="profile-name"]').forEach(function (el) {
        el.textContent = profile.name;
      });
    }
    if (profile.tagline) {
      document.querySelectorAll('[data-field="tagline"]').forEach(function (el) {
        el.textContent = profile.tagline;
      });
    }
  }

  function renderJourney(journey) {
    const road = document.getElementById('road');
    if (!road || !Array.isArray(journey)) return;
    road.innerHTML = journey.map(function (entry) {
      const label = entry.month ? (entry.month + ' ' + entry.year) : String(entry.year);
      const isPlaceholder = /^\s*\[/.test(entry.description || '');
      return (
        '<div class="milestone' + (isPlaceholder ? ' placeholder' : '') + '">' +
          '<div class="year">' + escapeHtml(label) + '</div>' +
          '<h3>' + escapeHtml(entry.title) + '</h3>' +
          '<p>' + escapeHtml(entry.description) + '</p>' +
        '</div>'
      );
    }).join('');
  }

  fetch('assets/data/content.yml')
    .then(function (res) {
      if (!res.ok) throw new Error('content.yml: ' + res.status);
      return res.text();
    })
    .then(function (text) {
      const data = jsyaml.load(text) || {};
      renderProfile(data.profile);
      renderJourney(data.journey);
    })
    .catch(function (err) {
      console.error('Could not load assets/data/content.yml — is the page being served over http(s), not file://?', err);
    });
})();
