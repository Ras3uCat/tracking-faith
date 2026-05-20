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
      // fallback to home
      views.forEach(v => v.hidden = v.getAttribute('data-view') !== 'home');
      viewName = 'home';
    }
    // update nav
    document.querySelectorAll('.nav a[data-nav]').forEach(a => {
      a.classList.toggle('is-active', a.getAttribute('data-nav') === viewName);
    });
    // scroll to top of main
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.setAttribute('data-view', viewName);
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

  // search button stub
  document.getElementById('search-btn').addEventListener('click', () => {
    alert("Search isn't wired in this prototype.\n\nIn the live site, this opens a question-answering bar: type 'what language did Jesus speak' and you land on the relevant module — with citations.");
  });

  // expose for tweaks panel
  window.__tf = { activate, openCite };
})();
