// Tracking Faith — view router, citation drawer, search shell

(function () {
  const views = document.querySelectorAll('section.view');
  const navLinks = document.querySelectorAll('[data-nav]');

  function activate(viewName) {
    let found = false;
    views.forEach(v => {
      const match = v.getAttribute('data-view') === viewName;
      v.hidden = !match;
      if (match) found = true;
    });
    if (!found) {
      views.forEach(v => v.hidden = v.getAttribute('data-view') !== 'not-found');
      viewName = 'not-found';
    }
    // update nav
    document.querySelectorAll('.nav a[data-nav]').forEach(a => {
      a.classList.toggle('is-active', a.getAttribute('data-nav') === viewName);
    });
    // scroll to top of main
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.setAttribute('data-view', viewName);
    if (window.TF_Effects) window.TF_Effects.reactivate();
  }

  function fromHash() {
    const h = (location.hash || '#home').replace(/^#/, '');
    activate(h);
  }

  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      const target = a.getAttribute('data-nav');
      if (!target) return;
      e.preventDefault();
      history.replaceState(null, '', '#' + target);
      activate(target);
    });
  });

  window.addEventListener('hashchange', fromHash);
  fromHash();

  // -------------------- citation drawer
  const drawer  = document.getElementById('drawer');
  const body    = document.getElementById('drawer-body');
  const close   = document.getElementById('drawer-close');
  const scrim   = document.getElementById('drawer-scrim');
  let citeData = {};
  try {
    citeData = JSON.parse(document.getElementById('citation-data').textContent);
  } catch (e) { console.warn('citation parse failed', e); }

  function openCite(id) {
    const data = citeData[id];
    if (!data) {
      body.innerHTML =
        '<span class="src-tag">Source</span>' +
        '<h4>Citation not found</h4>' +
        '<p class="src-meta">id: ' + id + '</p>';
    } else {
      body.innerHTML =
        '<span class="src-tag">' + (data.tag || 'SOURCE') + '</span>' +
        '<h4>' + (data.title || '') + '</h4>' +
        '<p class="src-meta">' + (data.author || '') +
          (data.year ? ' · <span class="mono">' + data.year + '</span>' : '') + '</p>' +
        '<p class="src-note">' + (data.note || '') + '</p>';
    }
    drawer.setAttribute('aria-hidden', 'false');
  }
  function closeCite() { drawer.setAttribute('aria-hidden', 'true'); }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-cite], [data-drawer]');
    if (!a) return;
    e.preventDefault();
    const id = a.getAttribute('data-cite') || a.getAttribute('data-drawer');
    openCite(id);
  });
  close.addEventListener('click', closeCite);
  scrim.addEventListener('click', closeCite);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCite();
  });

  // search button — disabled until search feature is built
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.disabled = true;
    searchBtn.style.opacity = '0.4';
    searchBtn.style.cursor = 'not-allowed';
    searchBtn.setAttribute('title', 'Search coming soon');
  }

  // expose for tweaks panel
  window.__tf = { activate, openCite };
})();
