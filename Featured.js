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

// ── WORD OF THE DAY (deterministic, 24h rotation) ─────────
// script.js also computes this — featured.js version kept for
// any page that loads featured.js but not script.js.
var wordOfTheDay = (function() {
  if (typeof dictionary === 'undefined') return null;
  var eligible = dictionary.filter(function(e) { return e.traditionalMeaning && e.word; });
  if (!eligible.length) return null;
  var today  = new Date();
  var dayNum = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return eligible[dayNum % eligible.length];
})();