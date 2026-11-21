let navActive = '';

const TABS = [
  ['index.html', 'Home'],
  ['lab1.html', 'Lab 1', 1],
  ['lab2.html', 'Lab 2', 2],
  ['lab3.html', 'Lab 3', 3]
];

function nav(active) {
  navActive = active;

  const tabs = TABS.map(([page, name, lab]) => {
    const locked = lab && isLocked(lab);
    const current = name === active ? ' aria-current="page"' : '';
    const cls = locked ? ' class="lk"' : '';
    const href = locked ? '#' : link(page);
    return `<a href="${href}"${current}${cls}>${locked ? '🔒 ' : ''}${name}</a>`;
  }).join('');

  return `
    <header>
      <a class="logo" href="${link('index.html')}">
        ${face('h')}${face('b')}<b>Hedy &amp; Batty</b>
      </a>
      <nav>${tabs}</nav>
    </header>`;
}

function refreshNav() {
  $('header').outerHTML = nav(navActive);
}

function talk(box, lines, done) {
  let i = 0;
  box.innerHTML = '';

  const button = document.createElement('button');
  button.className = 'b p nx';

  const next = () => {
    if (i >= lines.length) {
      button.remove();
      done();
      return;
    }

    const [who, text, mood] = lines[i++];
    const bubble = document.createElement('div');
    bubble.className = 'msg ' + who;
    bubble.innerHTML =
      face(who, mood) +
      `<p><i>${who === 'h' ? 'Hedy' : 'Batty'}</i>${esc(text)}</p>`;

    box.insertBefore(bubble, button);
    button.textContent = i < lines.length ? 'Next' : 'Continue';
    bubble.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  };

  box.append(button);
  button.onclick = next;
  next();
}

function runLab(L) {
  if (isLocked(L.n)) {
    $('#app').innerHTML = nav('Lab ' + L.n) + `
      <main class="lockd">
        <div class="art">${lockArt()}</div>
        <h1>Lab ${L.n} is locked</h1>
        <p>Beat Lab ${L.n - 1} first.</p>
        <a class="b p" href="${link('lab' + (L.n - 1) + '.html')}">Go to Lab ${L.n - 1}</a>
      </main>`;
    return;
  }

  let fixed = false;
  let payload = null;
  let result = null;
  let fixLine = null;
  let stage = 0;
  let passed = false;

  const STAGE_NAMES = ['Chat', 'Code', 'Attack', 'Fix', 'Retry'];

  $('#app').innerHTML = nav('Lab ' + L.n) + `
    <main>
      <div class="row">
        <div>
          <span class="tag">${L.tag}</span>
          <h1>${L.title}</h1>
        </div>
        <button id="sw" class="sw" disabled aria-label="Vulnerable or fixed"></button>
      </div>
      <div id="stp" class="steps"></div>
      <div id="sc" class="scene"></div>
      <div id="sp"></div>
      <div id="out"></div>
    </main>`;

  const codeHtml = () =>
    L.code.map((line, i) => {
      if (i === L.hl && fixLine && fixed) {
        return `<div class="g">${esc(fixLine)}</div>`;
      }
      return `<div${i === L.hl ? ' class="r"' : ''}>${esc(line)}</div>`;
    }).join('');

  const drawScene = () => {
    const state = result || { k: '' };
    const tone = look(state).tone;
    $('#sc').innerHTML = sv(L.title, L.sc(state), tone);
    $('#sc').className = 'scene ' + (tone === 'hit' ? 'hit' : tone === 'safe' ? 'safe' : '');
  };

  const drawHeader = () => {
    $('#stp').innerHTML = STAGE_NAMES.map((name, i) => {
      const cls = i === stage ? 'on' : i < stage ? 'dn' : '';
      return `<span class="${cls}">${name}</span>`;
    }).join('');

    const sw = $('#sw');
    sw.disabled = stage !== 4;
    sw.innerHTML =
      `<span class="${fixed ? '' : 'on'}">Vulnerable</span>` +
      `<span class="${fixed ? 'g' : ''}">Fixed</span>`;
  };

  const showResult = r => {
    result = r;
    drawScene();

    if (r.k === 'b') {
      $('#out').innerHTML = `
        <div class="o bad">
          <b>Vulnerability triggered</b>
          ${r.rows.map(row => `<div>${esc(row)}</div>`).join('')}
        </div>`;
    } else if (r.k === 'x') {
      $('#out').innerHTML = `
        <div class="o ok">
          <b>Blocked. The site is secure.</b>
          <div>${esc(r.msg)}</div>
        </div>`;
    } else {
      $('#out').innerHTML = `
        <div class="o">
          <b>Normal input works</b>
          <div>${esc(r.msg)}</div>
        </div>`;
    }
  };

  const setupAttackButtons = ctl => {
    ctl.innerHTML = L.moves
      .map((m, i) => `<button class="b" data-i="${i}">${m[0]}</button>`)
      .join('');

    ctl.querySelectorAll('button').forEach(button => {
      button.onclick = () => {
        const value = L.moves[button.dataset.i][1];
        const r = L.sim(value, false);
        showResult(r);

        if (r.k === 'b') {
          payload = value;
          ctl.innerHTML = '<button class="b p" id="nx2">See what happened</button>';
          $('#nx2').onclick = () => go(2);
        }
      };
    });
  };

  const setupFixButtons = ctl => {
    ctl.innerHTML = L.fix
      .map((f, i) => `<button class="b opt" data-i="${i}">${esc(f[0])}</button>`)
      .join('');

    ctl.querySelectorAll('button').forEach(button => {
      button.onclick = () => {
        const f = L.fix[button.dataset.i];

        if (f[1]) {

          fixLine = f[0];
          fixed = true;
          result = null;
          $('#out').innerHTML = '';
          go(4);
        } else {

          $('#out').innerHTML = `
            <div class="o bad shake">
              <b>That fix is not enough</b>
              <div>${esc(f[2])}</div>
            </div>`;
        }
      };
    });
  };

  const setupRetryButtons = ctl => {
    ctl.innerHTML =
      '<button class="b p" id="rp">Run the same payload</button>' +
      '<button class="b" id="rn">Normal input</button>';

    $('#rp').onclick = () => {
      const r = L.sim(payload, fixed);
      showResult(r);
      if (r.k === 'x' && fixed) pass();
    };

    $('#rn').onclick = () => showResult(L.sim(L.moves[0][1], fixed));
  };

  const panel = () => {
    drawHeader();

    $('#sp').innerHTML = `
      <div class="code">${codeHtml()}</div>
      <p class="why">${fixLine && fixed ? 'Green line: the fix.' : 'Red line: ' + esc(L.why)}</p>
      <div class="btns" id="ctl"></div>`;

    const ctl = $('#ctl');
    if (stage === 1) setupAttackButtons(ctl);
    if (stage === 3) setupFixButtons(ctl);
    if (stage === 4) setupRetryButtons(ctl);
  };

  const go = n => {
    stage = n;
    drawHeader();
    drawScene();

    if (n === 0) {
      talk($('#sp'), L.intro, () => go(1));
    } else if (n === 2) {
      $('#out').innerHTML = '';
      talk($('#sp'), L.after, () => go(3));
    } else {
      panel();
    }
  };

  const pass = () => {
    if (passed) return;
    passed = true;

    P['l' + L.n] = 1;
    save();
    refreshNav();

    setTimeout(() => {
      stage = 5;
      drawHeader();
      $('#out').innerHTML = '';

      const last = L.n === 3;
      const nextHref = last ? link('index.html') + '#win' : link('lab' + (L.n + 1) + '.html');

      $('#sp').innerHTML = `
        <div class="pass">
          <div class="stamp">PASS</div>
          <h2>Secure. Hedy is safe!</h2>
          <p>Same payload. Blocked.</p>
          <a class="b p" href="${nextHref}">${last ? 'Finish the game' : 'Unlock Lab ' + (L.n + 1)}</a>
        </div>`;

      $('#sp').scrollIntoView({ behavior: 'smooth' });
    }, 1400);
  };

  $('#sw').onclick = () => {
    if (stage !== 4) return;
    fixed = !fixed;
    result = null;
    $('#out').innerHTML = '';
    panel();
    drawScene();
  };

  go(0);
}
