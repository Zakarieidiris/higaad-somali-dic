// ──────────────────────────────────────────────────────────
//  Higaad — Featured Words  |  featured.js
//  Loaded after data.js — dictionary must exist
// ──────────────────────────────────────────────────────────

// ── SHUFFLE HELPER (Fisher-Yates) ─────────────────────────
function shuffleArray(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i]; a[i] = a[j]; a[j] = tmp;
  }
  return a;
}

// ── FEATURED TECH WORDS — 6 random tech words per page load
var featuredTechWords = (function() {
  if (typeof dictionary === 'undefined') return [];
  var techWords = dictionary.filter(function(e) { return e.isTech; });
  return shuffleArray(techWords).slice(0, 6);
})();

// NOTE: Word of the Day is computed exclusively in script.js
// to avoid duplicate/conflicting logic.