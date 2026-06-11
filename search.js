// Tracking Faith — client-side full-text search (Fuse.js, heading-level granularity)

(function () {
  const SEARCH_THRESHOLD = 0.35;
  const EXCERPT_CHARS    = 200;
  const DEBOUNCE_MS      = 150;

  // ---- DOM refs (set after modal is injected) ----
  let modal, scrim, input, resultsList, countLine, closeBtn;

  // ---- State ----
  let fuse        = null;
  let corpus      = [];
  let focusedIdx  = -1;
  let lastQuery   = '';
  let preFocusEl  = null;

  // ---- Corpus builder ----
  function buildCorpus() {
    corpus = [];
    document.querySelectorAll('section.view[data-view]').forEach(section => {
      const viewId    = section.getAttribute('data-view');
      const viewLabel = section.getAttribute('data-screen-label') || viewId;

      // Heading-level granularity: walk h2/h3 headings
      const headings = section.querySelectorAll('h2, h3');
      if (headings.length === 0) {
        // Fallback: section-level entry
        const text = section.textContent.trim().replace(/\s+/g, ' ');
        corpus.push({ id: viewId + '-section', view: viewId, label: viewLabel, excerpt: text.slice(0, EXCERPT_CHARS) });
        return;
      }

      headings.forEach((h, i) => {
        const headingText = h.textContent.trim();
        // Capture next ~EXCERPT_CHARS chars of sibling text after the heading
        let excerpt = '';
        let node = h.nextSibling;
        while (node && excerpt.length < EXCERPT_CHARS) {
          if (node.nodeType === Node.TEXT_NODE) {
            excerpt += node.textContent;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            excerpt += node.textContent;
          }
          node = node.nextSibling;
        }
        excerpt = excerpt.trim().replace(/\s+/g, ' ').slice(0, EXCERPT_CHARS);

        corpus.push({
          id:      viewId + '-h-' + i,
          view:    viewId,
          label:   viewLabel + ' — ' + headingText,
          excerpt: excerpt,
        });
      });
    });

    fuse = new Fuse(corpus, {
      keys:            ['label', 'excerpt'],
      threshold:       SEARCH_THRESHOLD,
      includeMatches:  true,
      minMatchCharLength: 2,
    });
  }

  // ---- Match highlighter (XSS-safe, DOM-built) ----
  function buildHighlightedFragment(text, matchRanges) {
    const frag = document.createDocumentFragment();
    if (!matchRanges || matchRanges.length === 0) {
      frag.appendChild(document.createTextNode(text));
      return frag;
    }
    // Merge overlapping ranges
    const sorted = [...matchRanges].sort((a, b) => a[0] - b[0]);
    let cursor = 0;
    sorted.forEach(([start, end]) => {
      if (start > cursor) {
        frag.appendChild(document.createTextNode(text.slice(cursor, start)));
      }
      const mark = document.createElement('mark');
      mark.appendChild(document.createTextNode(text.slice(start, end + 1)));
      frag.appendChild(mark);
      cursor = end + 1;
    });
    if (cursor < text.length) {
      frag.appendChild(document.createTextNode(text.slice(cursor)));
    }
    return frag;
  }

  // ---- Render results ----
  function renderResults(query) {
    lastQuery = query;
    focusedIdx = -1;
    resultsList.innerHTML = '';

    const trimmed = query.trim();
    if (trimmed.length < 2) {
      countLine.textContent = '';
      return;
    }

    const results = fuse.search(trimmed);

    if (results.length === 0) {
      countLine.textContent = '';
      const empty = document.createElement('li');
      empty.className = 'search-result-item search-result-item--empty';
      empty.appendChild(document.createTextNode('Nothing matched. Try a shorter term.'));
      resultsList.appendChild(empty);
      return;
    }

    countLine.textContent = results.length + ' result' + (results.length !== 1 ? 's' : '') + ' for “' + trimmed + '”';

    results.forEach((result, idx) => {
      const { item, matches } = result;

      const li = document.createElement('li');
      li.className  = 'search-result-item';
      li.setAttribute('role', 'option');
      li.setAttribute('aria-selected', 'false');
      li.setAttribute('tabindex', '-1');
      li.dataset.idx  = idx;
      li.dataset.view = item.view;

      const labelEl = document.createElement('span');
      labelEl.className = 'search-result-item__label';
      const labelMatch = matches && matches.find(m => m.key === 'label');
      labelEl.appendChild(buildHighlightedFragment(item.label, labelMatch ? labelMatch.indices : []));

      const excerptEl = document.createElement('p');
      excerptEl.className = 'search-result-item__excerpt';
      const excerptMatch = matches && matches.find(m => m.key === 'excerpt');
      excerptEl.appendChild(buildHighlightedFragment(item.excerpt, excerptMatch ? excerptMatch.indices : []));

      li.appendChild(labelEl);
      if (item.excerpt) li.appendChild(excerptEl);

      li.addEventListener('click', () => selectResult(item.view));
      li.addEventListener('mouseenter', () => setFocus(idx));

      resultsList.appendChild(li);
    });
  }

  function setFocus(idx) {
    const items = resultsList.querySelectorAll('.search-result-item:not(.search-result-item--empty)');
    if (!items.length) return;
    items.forEach((el, i) => {
      const active = i === idx;
      el.classList.toggle('is-focused', active);
      el.setAttribute('aria-selected', active ? 'true' : 'false');
    });
    focusedIdx = idx;
    if (items[idx]) items[idx].scrollIntoView({ block: 'nearest' });
  }

  function selectResult(viewId) {
    closeModal();
    if (window.__tf && typeof window.__tf.activate === 'function') {
      history.replaceState(null, '', '#' + viewId);
      window.__tf.activate(viewId);
    } else {
      location.hash = '#' + viewId;
    }
  }

  // ---- Modal open/close ----
  function openModal() {
    preFocusEl = document.activeElement;
    modal.setAttribute('aria-hidden', 'false');
    modal.removeAttribute('inert');
    input.value = '';
    countLine.textContent = '';
    resultsList.innerHTML = '';
    focusedIdx = -1;
    // next frame so CSS transition fires
    requestAnimationFrame(() => input.focus());
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('inert', '');
    if (preFocusEl) preFocusEl.focus();
  }

  // ---- Debounce ----
  let debounceTimer = null;
  function onInput() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => renderResults(input.value), DEBOUNCE_MS);
  }

  // ---- Focus trap ----
  function trapFocus(e) {
    if (modal.getAttribute('aria-hidden') !== 'false') return;
    const focusable = [...modal.querySelectorAll(
      'button, [href], input, [tabindex]:not([tabindex="-1"])'
    )].filter(el => !el.closest('[inert]'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  }

  // ---- Keyboard navigation ----
  function onKeydown(e) {
    if (modal.getAttribute('aria-hidden') !== 'false') return;

    trapFocus(e);

    const items = [...resultsList.querySelectorAll('.search-result-item:not(.search-result-item--empty)')];

    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocus(Math.min(focusedIdx + 1, items.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocus(Math.max(focusedIdx - 1, 0));
    } else if (e.key === 'Enter' && focusedIdx >= 0 && items[focusedIdx]) {
      e.preventDefault();
      selectResult(items[focusedIdx].dataset.view);
    }
  }

  // ---- Global hotkeys ----
  function onGlobalKeydown(e) {
    // '/' — not in an input
    if (e.key === '/' && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openModal();
      return;
    }
    // Cmd/Ctrl+K
    if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      if (modal.getAttribute('aria-hidden') === 'false') {
        closeModal();
      } else {
        openModal();
      }
    }
  }

  // ---- Init ----
  function init() {
    modal       = document.getElementById('search-modal');
    scrim       = document.getElementById('search-scrim');
    input       = document.getElementById('search-input');
    resultsList = document.getElementById('search-results');
    countLine   = document.getElementById('search-count');
    closeBtn    = document.getElementById('search-close');

    if (!modal) return;

    buildCorpus();

    // Wire search button
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) {
      searchBtn.disabled = false;
      searchBtn.style.opacity  = '';
      searchBtn.style.cursor   = '';
      searchBtn.removeAttribute('title');
      searchBtn.addEventListener('click', openModal);
    }

    closeBtn.addEventListener('click', closeModal);
    scrim.addEventListener('click', closeModal);
    input.addEventListener('input', onInput);
    document.addEventListener('keydown', onKeydown);
    document.addEventListener('keydown', onGlobalKeydown);

    // Expose activate for search.js to call after router.js is loaded
    // router.js exposes window.TF_Router — check after DOMContentLoaded
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
