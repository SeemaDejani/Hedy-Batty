const $ = selector => document.querySelector(selector);

const esc = text =>
  String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const STORE_KEY = 'hb';

function loadProgress() {
  let saved = {};

  try {
    saved = JSON.parse(localStorage.getItem(STORE_KEY) || '{}');
  } catch (e) {
    saved = {};
  }

  const fromUrl = new URLSearchParams(location.search).get('done');

  if (fromUrl) {
    fromUrl.split(',').forEach(n => {
      if (/^[123]$/.test(n)) saved['l' + n] = 1;
    });
  }

  return saved;
}

let P = loadProgress();

function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(P));
  } catch (e) {

  }
}

const isLocked = n => n > 1 && !P['l' + (n - 1)];

function link(page) {
  const done = [1, 2, 3].filter(n => P['l' + n]);
  return done.length ? `${page}?done=${done.join(',')}` : page;
}
