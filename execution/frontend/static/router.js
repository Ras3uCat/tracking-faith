// Tracking Faith — view router, citation drawer, search shell

(function () {
  const views = document.querySelectorAll('section.view');
  const navLinks = document.querySelectorAll('[data-nav]');

  const PILLAR_MAP = {
    jesus: 'jesus', 'jesus-expanded': 'jesus',
    canon: 'bible', 'bible-versions': 'bible', excluded: 'bible',
    apocrypha: 'bible', 'nag-hammadi': 'bible', 'lost-books': 'bible',
    beliefs: 'beliefs', 'beliefs-afterlife': 'beliefs',
    'beliefs-god': 'beliefs', 'beliefs-salvation': 'beliefs', 'beliefs-jesus': 'beliefs',
    parallels: 'mythology', nephilim: 'mythology', 'dying-rising-gods': 'mythology', 'flood-myths': 'mythology',
    archaeology: 'evidence', herculaneum: 'evidence', 'archaeology-patriarchs': 'evidence',
  };

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
    // update nav link active states (desktop + mobile panel)
    document.querySelectorAll('[data-nav]').forEach(a => {
      if (a.tagName === 'A') a.classList.toggle('is-active', a.getAttribute('data-nav') === viewName);
    });
    // auto-expand active pillar group
    const activePillar = PILLAR_MAP[viewName] || null;
    document.querySelectorAll('.nav__group').forEach(g => {
      const isActive = g.getAttribute('data-pillar') === activePillar;
      g.toggleAttribute('data-active', isActive);
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

  function openCite(id, sourceEl) {
    const data = citeData[id];

    const section = sourceEl ? sourceEl.closest('section[data-view], .article, article') : null;
    const sectionIds = section
      ? [...new Set([...section.querySelectorAll('[data-cite]')].map(el => el.getAttribute('data-cite')))]
      : Object.keys(citeData).filter(k => k !== 'citations-manifesto');

    let html = '';
    if (!data) {
      html = '<span class="src-tag">Source</span><h4>Citation not found</h4><p class="src-meta">id: ' + id + '</p>';
    } else {
      html =
        '<div class="src-active">' +
          '<span class="src-tag">' + (data.tag || 'SOURCE') + '</span>' +
          '<h4>' + (data.title || '') + '</h4>' +
          '<p class="src-meta">' + (data.author || '') +
            (data.year ? ' · <span class="mono">' + data.year + '</span>' : '') + '</p>' +
          '<p class="src-note">' + (data.note || '') + '</p>' +
        '</div>';

      const others = sectionIds.filter(k => k !== id && citeData[k]);
      if (others.length) {
        html += '<p class="src-others__label kicker">All sources</p>';
        html += '<ol class="src-others__list">';
        others.forEach(k => {
          const d = citeData[k];
          html +=
            '<li data-cite="' + k + '">' +
              '<span class="mono">' + (d.tag || '') + '</span>' +
              '<em>' + (d.title || '') + '</em>' +
              (d.author ? ' — ' + d.author : '') +
            '</li>';
        });
        html += '</ol>';
      }
    }

    body.innerHTML = html;
    drawer.setAttribute('aria-hidden', 'false');
  }
  function closeCite() { drawer.setAttribute('aria-hidden', 'true'); }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-cite], [data-drawer]');
    if (!a) return;
    if (a.closest('#drawer-body')) {
      e.preventDefault();
      openCite(a.getAttribute('data-cite'), a);
      return;
    }
    e.preventDefault();
    const id = a.getAttribute('data-cite') || a.getAttribute('data-drawer');
    openCite(id, a);
  });
  close.addEventListener('click', closeCite);
  scrim.addEventListener('click', closeCite);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCite();
  });

  // ---- lightbox
  const lbEl = document.createElement('div');
  lbEl.className = 'lightbox';
  lbEl.setAttribute('aria-hidden', 'true');
  lbEl.setAttribute('role', 'dialog');
  lbEl.setAttribute('aria-modal', 'true');
  lbEl.setAttribute('aria-label', 'Image viewer');
  lbEl.innerHTML =
    '<div class="lightbox__scrim" id="lb-scrim"></div>' +
    '<div class="lightbox__frame" id="lb-frame">' +
      '<button class="lightbox__close" id="lb-close" aria-label="Close image viewer">✕</button>' +
      '<img class="lightbox__img" id="lb-img" src="" alt="">' +
      '<p class="lightbox__caption" id="lb-caption"></p>' +
    '</div>';
  document.body.appendChild(lbEl);

  const lbFrame = document.getElementById('lb-frame');
  const lbImg   = document.getElementById('lb-img');
  const lbCap   = document.getElementById('lb-caption');
  const lbClose = document.getElementById('lb-close');
  const lbScrim = document.getElementById('lb-scrim');
  let lbClosing = false;

  function openLightbox(img) {
    if (lbClosing) return;
    const rect = img.getBoundingClientRect();
    const ox = (rect.left + rect.width  / 2).toFixed(1);
    const oy = (rect.top  + rect.height / 2).toFixed(1);
    lbFrame.style.transformOrigin = ox + 'px ' + oy + 'px';
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    lbCap.textContent = img.getAttribute('data-caption') || img.alt || '';
    lbEl.setAttribute('aria-hidden', 'false');
    lbClose.focus();
  }

  function closeLightbox() {
    if (lbClosing || lbEl.getAttribute('aria-hidden') === 'true') return;
    lbClosing = true;
    lbEl.classList.add('is-closing');
    lbFrame.addEventListener('transitionend', function handler(e) {
      if (e.propertyName !== 'transform') return;
      lbEl.classList.remove('is-closing');
      lbEl.setAttribute('aria-hidden', 'true');
      lbImg.src = '';
      lbClosing = false;
      lbFrame.removeEventListener('transitionend', handler);
    });
  }

  document.addEventListener('click', (e) => {
    const img = e.target.closest('[data-lightbox]');
    if (img) { openLightbox(img); return; }
    if (e.target === lbScrim) closeLightbox();
  });

  lbClose.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lbEl.getAttribute('aria-hidden') === 'false') {
      e.stopPropagation();
      closeLightbox();
    }
  });

  // keyboard activation for [data-lightbox] elements
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const img = e.target.closest('[data-lightbox]');
    if (!img) return;
    e.preventDefault();
    openLightbox(img);
  });

  // expose for tweaks panel
  window.__tf = { activate, openCite, openLightbox, closeLightbox };
})();
