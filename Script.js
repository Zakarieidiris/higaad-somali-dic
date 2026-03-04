// ──────────────────────────────────────────────────────────
//  Higaad — Main Script  |  script.js
//  Loaded on: index.html only
// ──────────────────────────────────────────────────────────

// ── GLOBALS EXPOSED FOR INLINE onclick ATTRIBUTES ─────────
let currentMode = 'so-en';

function goToWord(id) {
  window.location.href = 'word.html?id=' + id;
}

// ── WORD OF THE DAY — deterministic 24-hour rotation ──────
function getWordOfTheDay() {
  if (typeof dictionary === 'undefined' || !dictionary.length) return null;
  var eligible = dictionary.filter(function(e) { return e.traditionalMeaning && e.word; });
  if (!eligible.length) return null;

  var today  = new Date();
  var dayKey = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

  // Try cached value for today
  try {
    var stored = JSON.parse(localStorage.getItem('higaad_wotd') || '{}');
    if (stored.key === dayKey && stored.id != null) {
      var cached = eligible.find(function(e) { return e.id === stored.id; });
      if (cached) return cached;
    }
  } catch(err) {}

  // Generate deterministic word from date seed
  var seed = dayKey.split('-').reduce(function(a, v) { return a + parseInt(v, 10); }, 0);
  var word = eligible[seed % eligible.length];
  try { localStorage.setItem('higaad_wotd', JSON.stringify({ key: dayKey, id: word.id })); } catch(err) {}
  return word;
}

function getNextMidnight() {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now;
}

function formatCountdown(ms) {
  var s  = Math.max(0, Math.floor(ms / 1000));
  var h  = Math.floor(s / 3600);
  var m  = Math.floor((s % 3600) / 60);
  var sc = s % 60;
  return pad(h) + ':' + pad(m) + ':' + pad(sc);
}

function pad(n) { return String(n).padStart(2, '0'); }

function renderWordOfTheDay() {
  var wotdEl = document.getElementById('wotd');
  if (!wotdEl) return;
  var e = getWordOfTheDay();
  if (!e) { wotdEl.innerHTML = '<p style="color:var(--muted);padding:20px">Loading word of the day…</p>'; return; }

  wotdEl.innerHTML =
    '<div class="wotd-body">' +
      '<div class="wotd-label"><span class="wotd-label-pip"></span>Erayga Maalinta</div>' +
      '<div class="wotd-word">'    + escHtml(e.word) + '</div>' +
      '<div class="wotd-type">'    + escHtml(e.language) + ' · ' + escHtml(e.type) + '</div>' +
      '<div class="wotd-meaning">' + escHtml(e.traditionalMeaning) + '</div>' +
      (e.example ? '<div class="wotd-example">' + escHtml(e.example) + '</div>' : '') +
      '<div class="wotd-timer">' +
        '<span class="wotd-timer-dot"></span>' +
        'Next word in <span id="wotdCountdown">' + formatCountdown(getNextMidnight()) + '</span>' +
      '</div>' +
    '</div>' +
    '<div class="wotd-side">' +
      '<div class="wotd-side-glyph">' + escHtml(e.word.charAt(0).toUpperCase()) + '</div>' +
      '<div class="wotd-side-cta">View →</div>' +
    '</div>';

  wotdEl.onclick = function() { goToWord(e.id); };

  // Live countdown — clears itself when word changes
  var timer = setInterval(function() {
    var el = document.getElementById('wotdCountdown');
    if (!el) { clearInterval(timer); return; }
    el.textContent = formatCountdown(getNextMidnight());
  }, 1000);
}

function renderTechWords() {
  var grid = document.getElementById('techGrid');
  if (!grid) return;
  var words = (typeof featuredTechWords !== 'undefined' && featuredTechWords.length)
    ? featuredTechWords
    : (typeof dictionary !== 'undefined' ? dictionary.filter(function(e) { return e.isTech; }).slice(0, 6) : []);
  if (!words.length) { grid.innerHTML = '<p style="color:var(--muted)">Tech words loading…</p>'; return; }

  grid.innerHTML = words.map(function(e, i) {
    return '<div class="tech-card" style="animation-delay:' + (i * 0.05) + 's" onclick="goToWord(' + e.id + ')">' +
      '<div class="tech-card-lang">' + (e.language === 'english' ? 'EN' : 'SO') + '</div>' +
      '<div class="tech-card-word">'  + escHtml(e.word) + '</div>' +
      '<div class="tech-card-trad">'  + escHtml(e.traditionalMeaning) + '</div>' +
      (e.modernMeaning
        ? '<div class="tech-card-modern"><span class="tech-modern-dot"></span>' + escHtml(e.modernMeaning) + '</div>'
        : '') +
    '</div>';
  }).join('');
}

function renderMedicalHomeSection() {
  var grid = document.getElementById('medicalHomeGrid');
  if (!grid) return;
  if (typeof medicalDictionary === 'undefined' || !medicalDictionary.length) {
    grid.innerHTML = '<p style="color:var(--muted);font-size:0.82rem;padding:20px 0">Medical words loading…</p>';
    return;
  }
  // Show English words with Somali equivalents — most useful for home preview
  var words = medicalDictionary.filter(function(e) { return e.language === 'english'; }).slice(0, 6);
  if (!words.length) words = medicalDictionary.slice(0, 6);

  grid.innerHTML = words.map(function(e, i) {
    var isEn = e.language === 'english';
    return '<div class="medical-home-card" style="animation-delay:' + (i * 0.05) + 's"' +
           ' onclick="window.location.href=\'medical-word.html?id=' + e.id + '\'">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">' +
        '<div style="font-family:var(--serif);font-size:1.1rem;font-weight:700;color:var(--black);line-height:1.2">' +
          escHtml(e.word) +
        '</div>' +
        '<span style="font-size:0.57rem;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;padding:3px 8px;border-radius:4px;flex-shrink:0;margin-top:3px;' +
          (isEn ? 'background:#eef0ff;color:#4a5aaf' : 'background:var(--gold-faint);color:var(--gold)') + '">' +
          (isEn ? 'EN' : 'SO') +
        '</span>' +
      '</div>' +
      '<div style="font-size:0.8rem;color:var(--mid);line-height:1.65;margin-bottom:10px">' + escHtml(e.traditionalMeaning) + '</div>' +
      (e.somaliWord && isEn
        ? '<div style="display:inline-flex;align-items:center;gap:5px;font-size:0.72rem;font-weight:600;color:#2e8b6a;background:#f0faf6;padding:4px 10px;border-radius:20px;border:1px solid #e8f5f0">' +
            '<span style="width:5px;height:5px;border-radius:50%;background:#2e8b6a;display:inline-block;flex-shrink:0"></span>' +
            escHtml(e.somaliWord) +
          '</div>'
        : '') +
      (e.category ? '<div style="font-size:0.62rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--muted);margin-top:10px">◦ ' + escHtml(e.category) + '</div>' : '') +
    '</div>';
  }).join('');
}

// ── SAFE HTML ESCAPING ────────────────────────────────────
function escHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── ALL DOM INTERACTION AFTER DOM IS READY ────────────────
document.addEventListener('DOMContentLoaded', function() {

  // Cache elements — safe here since DOM is fully loaded
  var searchInput      = document.getElementById('searchInput');
  var inlineResults    = document.getElementById('inlineResults');
  var btnSoEn          = document.getElementById('btnSoEn');
  var btnEnSo          = document.getElementById('btnEnSo');
  var searchClear      = document.getElementById('searchClear');
  var searchPopupEl    = document.getElementById('searchPopup');
  var popupSearchInput = document.getElementById('popupSearchInput');
  var popupResultsWrap = document.getElementById('popupResultsWrap');

  // Render all home sections
  renderWordOfTheDay();
  renderTechWords();
  renderMedicalHomeSection();

  // ── SEARCH MODE ──────────────────────────────────────────
  function setMode(mode) {
    currentMode = mode;
    if (btnSoEn) btnSoEn.classList.toggle('active', mode === 'so-en');
    if (btnEnSo) btnEnSo.classList.toggle('active', mode === 'en-so');
    if (searchInput) {
      searchInput.placeholder =
        mode === 'so-en'  ? 'Raadi eray Somali...' :
        mode === 'en-so'  ? 'Search English word...' :
                            'Raadi eray Somali ama English...';
    }
    if (searchInput && searchInput.value.trim()) handleSearch();
  }
  // Expose for inline onclick attrs
  window.setMode = setMode;
  setMode('so-en');

  // Handle ?q= redirect from other pages
  var urlQ = new URLSearchParams(window.location.search).get('q');
  if (urlQ && searchInput) {
    searchInput.value = urlQ;
    setMode('all');
    handleSearch();
    var heroEl = document.getElementById('hero');
    if (heroEl) heroEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // ── SEARCH FILTERING ─────────────────────────────────────
  function getFilteredWords(query, mode) {
    var q = query.toLowerCase().trim();
    // Merge main dictionary and medical dictionary, tagging medicals
    var allWords = (typeof dictionary !== 'undefined' ? dictionary : [])
      .concat(typeof medicalDictionary !== 'undefined'
        ? medicalDictionary.map(function(e) { return Object.assign({}, e, { isMedical: true }); })
        : []);
    return allWords.filter(function(e) {
      var hit = e.word.toLowerCase().includes(q)
        || (e.traditionalMeaning || '').toLowerCase().includes(q)
        || (e.modernMeaning || '').toLowerCase().includes(q);
      if (mode === 'so-en') return hit && e.language === 'somali';
      if (mode === 'en-so') return hit && e.language === 'english';
      return hit;
    });
  }

  function handleSearch() {
    if (!searchInput || !inlineResults) return;
    var q = searchInput.value.trim();
    if (searchClear) searchClear.classList.toggle('visible', q.length > 0);
    if (!q) { inlineResults.classList.remove('visible'); return; }
    renderInlineResults(getFilteredWords(q, currentMode));
  }

  // Expose for inline onclick on clear button
  window.clearSearch = function() {
    if (searchInput)   searchInput.value = '';
    if (searchClear)   searchClear.classList.remove('visible');
    if (inlineResults) inlineResults.classList.remove('visible');
    if (searchInput)   searchInput.focus();
  };

  // ── INLINE RESULTS ───────────────────────────────────────
  function renderInlineResults(results) {
    if (!inlineResults) return;
    inlineResults.classList.add('visible');
    if (!results.length) {
      inlineResults.innerHTML =
        '<div class="no-results">' +
          '<div class="no-results-emoji">🔍</div>' +
          '<div class="no-results-text">Eraygan lama helin</div>' +
          '<div class="no-results-sub">Word not found — try a different spelling</div>' +
        '</div>';
      return;
    }
    var cards = results.map(function(e, i) {
      var url = e.isMedical ? 'medical-word.html?id=' + e.id : 'word.html?id=' + e.id;
      return '<div class="result-card" style="animation-delay:' + (i * 0.04) + 's" onclick="window.location.href=\'' + url + '\'">' +
        '<div class="card-left">' +
          '<div class="card-word">'    + escHtml(e.word) + '</div>' +
          '<div class="card-meaning">' + escHtml((e.traditionalMeaning || '').slice(0, 62)) +
            ((e.traditionalMeaning || '').length > 62 ? '…' : '') + '</div>' +
        '</div>' +
        '<div class="card-badges">' +
          (e.language === 'somali'
            ? '<span class="badge badge-lang-so">SO</span>'
            : '<span class="badge badge-lang-en">EN</span>') +
          (e.isMedical ? '<span class="badge badge-medical">Medical</span>' : '') +
          (e.isTech ? '<span class="badge badge-tech">Tech</span>' : '') +
          '<span class="badge badge-type">' + escHtml(e.type) + '</span>' +
        '</div>' +
        '<div class="card-arrow">→</div>' +
      '</div>';
    }).join('');

    inlineResults.innerHTML =
      '<div class="result-count">' + results.length + ' result' + (results.length !== 1 ? 's' : '') + '</div>' +
      '<div class="results-grid">' + cards + '</div>';
  }

  if (searchInput) searchInput.addEventListener('input', handleSearch);

  // ── POPUP SEARCH ─────────────────────────────────────────
  function openSearchPopup() {
    if (!searchPopupEl) return;
    searchPopupEl.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (popupSearchInput) popupSearchInput.focus();
    renderPopupResults('');
  }

  function closeSearchPopup() {
    if (!searchPopupEl) return;
    searchPopupEl.classList.remove('open');
    document.body.style.overflow = '';
    if (popupSearchInput) popupSearchInput.value = '';
  }
  // Expose for ESC button inline onclick
  window.closeSearchPopup = closeSearchPopup;

  function renderPopupResults(query) {
    if (!popupResultsWrap) return;
    var q = query.toLowerCase();
    var allWords = [];
    if (typeof dictionary !== 'undefined')       allWords = allWords.concat(dictionary);
    if (typeof medicalDictionary !== 'undefined') allWords = allWords.concat(medicalDictionary.map(function(e) { return Object.assign({}, e, { isMedical: true }); }));

    var results = q
      ? allWords.filter(function(e) {
          return e.word.toLowerCase().includes(q)
            || (e.traditionalMeaning || '').toLowerCase().includes(q)
            || (e.modernMeaning || '').toLowerCase().includes(q);
        })
      : allWords.slice(0, 8);

    if (!results.length) {
      popupResultsWrap.innerHTML = '<div class="popup-empty">🔍<br>Eraygan lama helin — Word not found</div>';
      return;
    }

    popupResultsWrap.innerHTML = results.slice(0, 12).map(function(e, i) {
      var url = e.isMedical ? 'medical-word.html?id=' + e.id : 'word.html?id=' + e.id;
      return '<div class="popup-result-item" style="animation-delay:' + (i * 0.03) + 's"' +
             ' onclick="window.location.href=\'' + url + '\'">' +
        '<div class="popup-item-left">' +
          '<div class="popup-item-word">'    + escHtml(e.word) + '</div>' +
          '<div class="popup-item-meaning">' + escHtml(e.traditionalMeaning) + '</div>' +
        '</div>' +
        '<div class="popup-item-arrow">→</div>' +
      '</div>';
    }).join('');
  }

  if (popupSearchInput) {
    popupSearchInput.addEventListener('input', function() { renderPopupResults(popupSearchInput.value.trim()); });
  }

  // ── KEYBOARD SHORTCUTS (single handler) ──────────────────
  document.addEventListener('keydown', function(ev) {
    if ((ev.ctrlKey || ev.metaKey) && ev.key === 'e') {
      ev.preventDefault();
      searchPopupEl && searchPopupEl.classList.contains('open')
        ? closeSearchPopup()
        : openSearchPopup();
      return;
    }
    if (ev.key === 'Escape' && searchPopupEl && searchPopupEl.classList.contains('open')) {
      closeSearchPopup();
    }
  });

  if (searchPopupEl) {
    searchPopupEl.addEventListener('click', function(ev) {
      if (ev.target === searchPopupEl) closeSearchPopup();
    });
  }

}); // end DOMContentLoaded