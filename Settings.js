// ──────────────────────────────────────────────────────────
//  Higaad — Settings Panel  |  settings.js  v4
//  • Panel appended AFTER nav-links → anchored at nav end
//  • position:fixed panel → never clipped by overflow
//  • Full 100% system-wide i18n on language change
//  • Repositions on scroll/resize
// ──────────────────────────────────────────────────────────

(function () {

  // ── COMPLETE TRANSLATIONS ────────────────────────────────
  const i18n = {
    en: {
      nav_home:'Home', nav_tech:'Tech Stack', nav_medical:'Medical Terminology',
      nav_az:'A–Z', nav_flashcards:'Flashcards', nav_learn:'Learn',
      nav_learn_so:'Learn Somali', nav_learn_so_sub:'For English speakers',
      nav_learn_en:'Learn English', nav_learn_en_sub:'For Somali speakers',
      settings_title:'Settings', appear_label:'Appearance',
      dark_label:'Dark Mode', dark_sub:'Easy on the eyes',
      lang_label:'Interface Language', lang_so:'Somali (SO)', lang_en:'English (EN)',
      font_label:'Font Size', font_sm:'Small', font_md:'Default', font_lg:'Large',
      compact_label:'Compact Mode', compact_sub:'Tighter spacing',
      reset_btn:'Reset to defaults',
      wotd_title:'Erayga Maalinta', wotd_meta:'Word of the Day',
      tech_title:'Ereyada Teknoolojiyada', tech_meta:'Modern tech vocabulary',
      med_home_title:'Ereyada Caafimaadka', med_home_meta:'Medical terminology',
      btn_so_en:'Somali → English', btn_en_so:'English → Somali',
      wlc_feat1_title:'Full Dictionary', wlc_feat1_sub:'Somali & English words with definitions and examples',
      wlc_feat2_title:'Tech & Medical', wlc_feat2_sub:'Modern terminology in your language',
      wlc_feat3_title:'Flashcards', wlc_feat3_sub:'Learn vocabulary with interactive flashcards',
      wlc_lang_label:'Choose your language', wlc_cta:'Explore the Dictionary →',
      med_eyebrow:'Medical Terms',
      med_subtitle:'Essential health and medicine terms in Somali and English.',
      az_title:'All Words A–Z', az_meta:'Browse the full dictionary',
      fc_title:'Flashcards', fc_meta:'Learn vocabulary with spaced repetition',
      // Flashcard-specific
      fc_deck_all:'All', fc_deck_so:'Somali', fc_deck_en:'English',
      fc_deck_tech:'Tech', fc_deck_med:'Medical', fc_deck_daily:'Daily 15',
      fc_stat_know:'Know', fc_stat_skip:'Skipped', fc_stat_left:'Remaining', fc_stat_pct:'Progress',
      fc_btn_flip:'Tap to reveal', fc_btn_know:'Know it!', fc_btn_skip:'Skip',
      fc_complete_title:'Session Complete!', fc_review_skipped:'Review Skipped',
      fc_restart:'Start Over', fc_streak:'🔥 Streak',
      fc_complete_body:'You completed all {n} cards', fc_complete_known:'known',
      // Hero text
      hero_title:'Somali–English Dictionary',
      hero_sub:'Explore Somali words, English translations, and modern tech terminology in one place.',
      hero_placeholder:'Search Somali or English word...',
      // Search popup
      popup_placeholder:'Search Somali or English word...',
      popup_empty:'Word not found',
      // Footer
      footer_text:'Built with care for the Somali language · Higaad · © 2025',
    },
    so: {
      nav_home:'Bogga Hore', nav_tech:'Teknoolojiyada', nav_medical:'Caafimaadka',
      nav_az:'A–Z', nav_flashcards:'Kaadhadhka', nav_learn:'Baranee',
      nav_learn_so:'Baranee Soomaali', nav_learn_so_sub:'Kuwa af Ingiriisi ku hadla',
      nav_learn_en:'Baranee Ingiriisi', nav_learn_en_sub:'Kuwa af Soomaali ku hadla',
      settings_title:'Habayn', appear_label:'Muuqaalka',
      dark_label:'Mugdi', dark_sub:'Indha ayu u fiican yahey',
      lang_label:'Luqadda Nidaamka', lang_so:'Soomaali (SO)', lang_en:'Ingiriisi (EN)',
      font_label:'Cabbirka Xarfaha', font_sm:'Yar', font_md:'Caadi', font_lg:'Weyn',
      compact_label:'Qaabka Ciriirsan', compact_sub:'Meel yar oo la isticmaalo',
      reset_btn:'Dib ugu celi',
      wotd_title:'Erayga Maalinta', wotd_meta:'Erayga Maalinta',
      tech_title:'Ereyada Teknoolojiyada', tech_meta:'Ereyada casriga ah',
      med_home_title:'Ereyada Caafimaadka', med_home_meta:'Xogta caafimaadka',
      btn_so_en:'Soomaali → Ingiriisi', btn_en_so:'Ingiriisi → Soomaali',
      wlc_feat1_title:'Qaamuus Buuxa', wlc_feat1_sub:'Ereyada Soomaaliga iyo Ingiriisiga oo micno leh',
      wlc_feat2_title:'Teknoolojiyada & Caafimaadka', wlc_feat2_sub:'Ereyada casriga ah luqaddaada',
      wlc_feat3_title:'Kaadhadhka', wlc_feat3_sub:'Baranee ereyada adiga oo isticmaalaya kaadhadhka',
      wlc_lang_label:'Dooro luqaddaada', wlc_cta:'Bilow Sahaminta →',
      med_eyebrow:'Ereyada Caafimaadka',
      med_subtitle:'Ereyada muhiimka ah ee caafimaadka.',
      az_title:'Dhammaan Ereyada A–Z', az_meta:'Sahamee qaamuuska oo dhan',
      fc_title:'Kaadhadhka', fc_meta:'Baranee ereyada',
      // Flashcard-specific
      fc_deck_all:'Dhammaan', fc_deck_so:'Soomaali', fc_deck_en:'Ingiriisi',
      fc_deck_tech:'Tknlj', fc_deck_med:'Caafimaad', fc_deck_daily:'15 Maalinlaha',
      fc_stat_know:'Garanaya', fc_stat_skip:'La gudbay', fc_stat_left:'Hadhay', fc_stat_pct:'Horumarka',
      fc_btn_flip:'Taabo si aad u aragto', fc_btn_know:'Waan garanayaa!', fc_btn_skip:'Gudbi',
      fc_complete_title:'Kulanka Waxa Dhammaaday!', fc_review_skipped:'Dib u eeg Kuwa La Gudbay',
      fc_restart:'Dib u bilow', fc_streak:'🔥 Taxane',
      fc_complete_body:'{n} kaadh oo dhan waad dhammaatay', fc_complete_known:'la yaqaan',
      // Hero text
      hero_title:'Qaamuuska Soomaaliga–Ingiriisiga',
      hero_sub:'Sahamee ereyada Soomaaliga, turjumaadda Ingiriisiga, iyo ereyada casriga ah.',
      hero_placeholder:'Raadi eray Somali ama English...',
      // Search popup
      popup_placeholder:'Raadi eray Somali ama English...',
      popup_empty:'Eraygan lama helin',
      // Footer
      footer_text:'Waxaa loogu dhisay luuqadda Soomaaliga · Higaad · © 2025',
    }
  };

  const DEFAULTS = { theme: 'light', fontsize: 'md', compact: false, uilang: 'en' };

  function loadSettings() {
    try { return Object.assign({}, DEFAULTS, JSON.parse(localStorage.getItem('higaad_settings') || '{}')); }
    catch(e) { return Object.assign({}, DEFAULTS); }
  }
  function saveSettings(s) {
    try { localStorage.setItem('higaad_settings', JSON.stringify(s)); } catch(e) {}
  }
  function applySettings(s) {
    const html = document.documentElement;
    html.setAttribute('data-theme',    s.theme    || 'light');
    html.setAttribute('data-fontsize', s.fontsize || 'md');
    // Must REMOVE attribute when false — CSS [data-compact="true"] never matches "false"
    if (s.compact) {
      html.setAttribute('data-compact', 'true');
    } else {
      html.removeAttribute('data-compact');
    }
    html.setAttribute('lang', s.uilang === 'so' ? 'so' : 'en');
  }

  // Apply settings immediately (before DOM ready) to prevent flash
  applySettings(loadSettings());

  // ── FULL SYSTEM LANGUAGE APPLY ───────────────────────────
  function applyLanguage(lang) {
    const t = i18n[lang] || i18n.en;

    // 1. All data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) el.textContent = t[key];
    });

    // 2. Search/filter buttons
    const btnSoEn = document.getElementById('btnSoEn');
    const btnEnSo = document.getElementById('btnEnSo');
    if (btnSoEn) btnSoEn.textContent = t.btn_so_en;
    if (btnEnSo) btnEnSo.textContent = t.btn_en_so;

    // 3. All placeholder inputs
    const placeholders = {
      searchInput:     lang === 'so' ? 'Raadi eray Somali ama English...' : 'Search Somali or English word...',
      popupSearchInput:lang === 'so' ? 'Raadi eray Somali ama English...' : 'Search Somali or English word...',
      techSearch:      lang === 'so' ? 'Raadi ereyada teknoolojiyada...'  : 'Search tech words...',
      medSearch:       lang === 'so' ? 'Raadi ereyada caafimaadka...'     : 'Search medical words...',
      azSearch:        lang === 'so' ? 'Raadi eray...'                    : 'Search any word...',
      fcSearch:        lang === 'so' ? 'Raadi kaadh...'                   : 'Search flashcard...',
    };
    Object.entries(placeholders).forEach(([id, ph]) => {
      const el = document.getElementById(id);
      if (el) el.placeholder = ph;
    });

    // 4. Hero title + subtitle (index.html)
    const heroTitle = document.querySelector('.hero-title:not(.word-main-title)');
    if (heroTitle && !heroTitle.closest('.word-hero')) {
      // Only update if it's the main hero (not word detail page)
      const isIndex = !!document.getElementById('searchInput');
      if (isIndex) {
        heroTitle.innerHTML = lang === 'so'
          ? 'Soomaali–Ingiriisi<br><em>Qaamuus</em>'
          : 'Somali–English<br><em>Dictionary</em>';
      }
    }

    // 5. Hero subtitle
    const heroSub = document.querySelector('.hero-subtitle');
    if (heroSub && document.getElementById('searchInput')) {
      heroSub.innerHTML = lang === 'so'
        ? 'Sahamee ereyada Soomaaliga, turjumaadda Ingiriisiga,<br>iyo ereyada teknoolojiyada ee hal meel.'
        : 'Explore Somali words, English translations,<br>and modern tech terminology in one place.';
    }

    // 6. Flashcard deck buttons
    const deckMap = {
      'btn-deck-all': t.fc_deck_all, 'btn-deck-somali': t.fc_deck_so, 'btn-deck-english': t.fc_deck_en,
      'btn-deck-tech': t.fc_deck_tech, 'btn-deck-medical': t.fc_deck_med, 'btn-deck-daily': t.fc_deck_daily,
    };
    Object.entries(deckMap).forEach(([id, label]) => {
      const el = document.getElementById(id);
      if (el) {
        // Preserve the badge count span inside button
        const badge = el.querySelector('.deck-count');
        el.textContent = label;
        if (badge) el.appendChild(badge);
      }
    });

    // 7. Flashcard action buttons
    const fcFlipHint = document.getElementById('fcFlipHint');
    const fcKnowBtn  = document.getElementById('fcKnowBtn');
    const fcSkipBtn  = document.getElementById('fcSkipBtn');
    if (fcFlipHint) fcFlipHint.textContent = t.fc_btn_flip;
    if (fcKnowBtn)  fcKnowBtn.textContent  = t.fc_btn_know;
    if (fcSkipBtn)  fcSkipBtn.textContent  = t.fc_btn_skip;

    // 8. Flashcard stat labels
    const statLabels = {
      'fc-stat-label-know': t.fc_stat_know,
      'fc-stat-label-skip': t.fc_stat_skip,
      'fc-stat-label-left': t.fc_stat_left,
      'fc-stat-label-pct':  t.fc_stat_pct,
    };
    Object.entries(statLabels).forEach(([id, label]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = label;
    });

    // 9. Settings panel strings
    const panelMap = [
      ['sp_settings_title','settings_title'], ['sp_appear','appear_label'],
      ['sp_dark_label','dark_label'],         ['sp_dark_sub','dark_sub'],
      ['sp_lang_label','lang_label'],         ['sp_lang_so','lang_so'],
      ['sp_lang_en','lang_en'],               ['sp_font_label','font_label'],
      ['sp_font_sm','font_sm'],               ['sp_font_md','font_md'],
      ['sp_font_lg','font_lg'],               ['sp_compact_label','compact_label'],
      ['sp_compact_sub','compact_sub'],       ['sp_reset','reset_btn'],
    ];
    panelMap.forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (el && t[key] !== undefined) el.textContent = t[key];
    });

    // 10. Footer
    document.querySelectorAll('footer p').forEach(el => {
      if (el.textContent.includes('Higaad')) {
        el.innerHTML = lang === 'so'
          ? 'Waxaa loogu dhisay luuqadda Soomaaliga &nbsp;·&nbsp; <strong>Higaad</strong> &nbsp;·&nbsp; © 2025'
          : 'Built with care for the Somali language &nbsp;·&nbsp; <strong>Higaad</strong> &nbsp;·&nbsp; © 2025';
      }
    });

    // 11. Page document.title
    const titleMap = {
      'nav_home':       lang === 'so' ? 'Higaad — Qaamuuska Soomaaliga' : 'Higaad — Somali-English Dictionary',
      'nav_tech':       lang === 'so' ? 'Teknoolojiyada — Higaad'       : 'Tech Stack — Higaad',
      'nav_medical':    lang === 'so' ? 'Caafimaadka — Higaad'          : 'Medical — Higaad',
      'nav_az':         lang === 'so' ? 'A–Z Ereyada — Higaad'          : 'A–Z Words — Higaad',
      'nav_flashcards': lang === 'so' ? 'Kaadhadhka — Higaad'           : 'Flashcards — Higaad',
    };
    // Find active nav link to determine page
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
      const key = activeLink.getAttribute('data-i18n');
      if (titleMap[key]) document.title = titleMap[key];
    }

    // 12. Welcome popup CTA
    const ctaBtn = document.getElementById('welcomeCtaBtn');
    if (ctaBtn) ctaBtn.textContent = t.wlc_cta;

    // 13. Filter buttons (A-Z, Tech, Medical pages) — All/Somali/English labels
    document.querySelectorAll('.filter-btn').forEach(btn => {
      const onclick = btn.getAttribute('onclick') || '';
      if (onclick.includes("'all'"))     btn.textContent = lang === 'so' ? 'Dhammaan' : 'All';
      if (onclick.includes("'somali'"))  btn.textContent = lang === 'so' ? 'Soomaali' : 'Somali';
      if (onclick.includes("'english'")) btn.textContent = lang === 'so' ? 'Ingiriisi' : 'English';
      if (onclick.includes("'tech'"))    btn.textContent = lang === 'so' ? 'Teknlj'   : 'Tech';
      if (onclick.includes("'medical'")) btn.textContent = lang === 'so' ? 'Caafimaad': 'Medical';
    });

    // 14. Dispatch event so other scripts (flashcards.js etc.) can react
    document.dispatchEvent(new CustomEvent('higaad:langchange', { detail: { lang, t } }));
  }

  // ── BUILD SETTINGS PANEL ─────────────────────────────────
  function buildPanel() {
    const s = loadSettings();
    const t = i18n[s.uilang] || i18n.en;
    const wrap = document.createElement('div');
    wrap.className = 'settings-wrap';
    wrap.innerHTML = `
      <button class="settings-btn" id="settingsBtn" title="Settings" aria-label="Open settings" aria-expanded="false">&#9881;</button>
      <div class="settings-panel" id="settingsPanel" role="dialog" aria-label="Settings" aria-modal="true">
        <div class="settings-panel-title">
          <span id="sp_settings_title">${t.settings_title}</span>
          <button class="settings-close-btn" id="settingsClose" aria-label="Close settings">&#10005;</button>
        </div>

        <div class="settings-group">
          <div class="settings-group-label" id="sp_appear">${t.appear_label}</div>
          <div class="settings-toggle-row">
            <div>
              <div class="settings-toggle-label" id="sp_dark_label">${t.dark_label}</div>
              <div class="settings-toggle-sub"   id="sp_dark_sub">${t.dark_sub}</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="toggleDark" ${s.theme === 'dark' ? 'checked' : ''} />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div class="settings-group">
          <div class="settings-group-label" id="sp_compact_label_top">${t.compact_label}</div>
          <div class="settings-toggle-row">
            <div>
              <div class="settings-toggle-sub" id="sp_compact_sub">${t.compact_sub}</div>
            </div>
            <label class="toggle-switch">
              <input type="checkbox" id="toggleCompact" ${s.compact ? 'checked' : ''} />
              <span class="toggle-slider"></span>
            </label>
          </div>
        </div>

        <div class="settings-group">
          <div class="settings-group-label" id="sp_lang_label">${t.lang_label}</div>
          <div style="display:flex;gap:6px;">
            <button class="lang-opt-btn ${s.uilang === 'so' ? 'active' : ''}" id="sp_lang_so" data-lang="so">${t.lang_so}</button>
            <button class="lang-opt-btn ${s.uilang === 'en' ? 'active' : ''}" id="sp_lang_en" data-lang="en">${t.lang_en}</button>
          </div>
        </div>

        <div class="settings-group">
          <div class="settings-group-label" id="sp_font_label">${t.font_label}</div>
          <div class="font-size-control">
            <button class="font-size-btn ${s.fontsize === 'sm' ? 'active' : ''}" id="sp_font_sm" data-size="sm">${t.font_sm}</button>
            <button class="font-size-btn ${s.fontsize === 'md' ? 'active' : ''}" id="sp_font_md" data-size="md">${t.font_md}</button>
            <button class="font-size-btn ${s.fontsize === 'lg' ? 'active' : ''}" id="sp_font_lg" data-size="lg">${t.font_lg}</button>
          </div>
        </div>

        <button class="settings-reset" id="sp_reset">${t.reset_btn}</button>
      </div>
    `;
    return wrap;
  }

  // ── INIT ON DOM READY ────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    // ── Inject panel at END of <nav> (after .nav-links) ──
    const nav = document.querySelector('nav');
    if (!nav) return;

    const panel = buildPanel();
    // Append directly to <nav> so it sits at the far right end
    nav.appendChild(panel);

    const btn           = document.getElementById('settingsBtn');
    const panelEl       = document.getElementById('settingsPanel');
    const closeBtn      = document.getElementById('settingsClose');
    const darkToggle    = document.getElementById('toggleDark');
    const compactToggle = document.getElementById('toggleCompact');
    const fontBtns      = panelEl.querySelectorAll('.font-size-btn');
    const langBtns      = panelEl.querySelectorAll('.lang-opt-btn');
    const resetBtn      = document.getElementById('sp_reset');

    // Apply language on load
    applyLanguage(loadSettings().uilang);

    // ── Learn Dropdown ───────────────────────────────────────
    const learnDropdown = document.getElementById('learnDropdown');
    const learnBtn      = document.getElementById('learnDropdownBtn');
    if (learnDropdown && learnBtn) {
      learnBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        learnDropdown.classList.toggle('open');
      });
      document.addEventListener('click', (e) => {
        if (!learnDropdown.contains(e.target)) learnDropdown.classList.remove('open');
      });
    }

    // ── Panel positioning: now uses position:absolute, no manual positioning needed ──

    // ── Toggle panel ────────────────────────────────────────
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = panelEl.classList.contains('open');
      panelEl.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', String(!isOpen));
      btn.classList.toggle('active', !isOpen);
    });

    closeBtn.addEventListener('click', () => closePanel());

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target)) closePanel();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panelEl.classList.contains('open')) closePanel();
    });

    // ── Reposition not needed (uses position:absolute) ──

    function closePanel() {
      panelEl.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    }

    // ── Dark mode ────────────────────────────────────────────
    darkToggle.addEventListener('change', () => {
      const s = loadSettings();
      s.theme = darkToggle.checked ? 'dark' : 'light';
      saveSettings(s);
      applySettings(s);
    });

    // ── Language ─────────────────────────────────────────────
    langBtns.forEach(b => {
      b.addEventListener('click', () => {
        langBtns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const s = loadSettings();
        s.uilang = b.dataset.lang;
        saveSettings(s);
        applySettings(s);
        applyLanguage(s.uilang);
      });
    });

    // ── Font size ────────────────────────────────────────────
    fontBtns.forEach(b => {
      b.addEventListener('click', () => {
        fontBtns.forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const s = loadSettings();
        s.fontsize = b.dataset.size;
        saveSettings(s);
        applySettings(s);
      });
    });

    // ── Compact mode ─────────────────────────────────────────
    compactToggle.addEventListener('change', () => {
      const s = loadSettings();
      s.compact = compactToggle.checked;
      saveSettings(s);
      applySettings(s);
    });

    // ── Reset ────────────────────────────────────────────────
    resetBtn.addEventListener('click', () => {
      const def = Object.assign({}, DEFAULTS);
      saveSettings(def);
      applySettings(def);
      darkToggle.checked    = false;
      compactToggle.checked = false;
      fontBtns.forEach(b => b.classList.toggle('active', b.dataset.size === 'md'));
      langBtns.forEach(b => b.classList.toggle('active', b.dataset.lang === 'en'));
      applyLanguage('en');
    });
  });

  // Expose applyLanguage globally so other pages can call it if needed
  window.HigaadI18n = { applyLanguage, loadSettings, i18n };

})();