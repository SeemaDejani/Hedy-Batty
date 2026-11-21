const C = {
  P: '#D6336C',
  H: '#FF4081',
  S: '#FFB6C1',
  L: '#FFE4EC',
  B: '#FFF5F8',
  T: '#3B1226',
  W: '#5A1F3A',
  G: '#FBBF24'
};

let uid = 0;

function cat(x, y = 130, s = 1, mood = 'happy', crown = false) {
  const eyes = {
    happy: `
      <ellipse cx="-6" cy="-34" rx="2.4" ry="3.1" fill="${C.T}"/>
      <ellipse cx="6" cy="-34" rx="2.4" ry="3.1" fill="${C.T}"/>
      <circle cx="-5.2" cy="-35.2" r=".9" fill="#fff"/>
      <circle cx="6.8" cy="-35.2" r=".9" fill="#fff"/>`,

    scared: `
      <circle cx="-6.5" cy="-34" r="4.2" fill="#fff" stroke="${C.T}" stroke-width="1.3"/>
      <circle cx="6.5" cy="-34" r="4.2" fill="#fff" stroke="${C.T}" stroke-width="1.3"/>
      <circle cx="-6.5" cy="-33.5" r="1.6" fill="${C.T}"/>
      <circle cx="6.5" cy="-33.5" r="1.6" fill="${C.T}"/>
      <path d="M16 -42Q12.5 -36.5 16 -35.2Q19.5 -36.5 16 -42Z" fill="#7dd3fc" stroke="${C.T}" stroke-width=".8"/>`,

    win: `
      <path d="M-9.5 -33Q-6 -38.5 -2.5 -33M2.5 -33Q6 -38.5 9.5 -33"
            stroke="${C.T}" stroke-width="2" fill="none" stroke-linecap="round"/>`,

    smug: `
      <path d="M-9.5 -34H-2.5M2.5 -34H9.5" stroke="${C.T}" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M-8.6 -34A2.6 2.6 0 0 0 -3.4 -34Z" fill="${C.T}"/>
      <path d="M3.4 -34A2.6 2.6 0 0 0 8.6 -34Z" fill="${C.T}"/>`
  };

  const mouths = {
    happy: `
      <path d="M0 -27.4V-26Q-2.8 -23.4 -5.4 -25.4M0 -26Q2.8 -23.4 5.4 -25.4"
            stroke="${C.T}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`,
    scared: `<ellipse cy="-23.6" rx="2.2" ry="2.8" fill="${C.T}"/>`,
    win: `<path d="M-5 -26Q0 -18.5 5 -26Z" fill="${C.H}" stroke="${C.T}" stroke-width="1.2" stroke-linejoin="round"/>`,
    smug: `<path d="M-4.5 -24.5Q0 -22.5 5.5 -27" stroke="${C.T}" stroke-width="1.2" fill="none" stroke-linecap="round"/>`
  };

  const crownShape = crown
    ? `
      <path d="M-9.5 -45L-11 -60L-5 -53.5L0 -63L5 -53.5L11 -60L9.5 -45Z"
            fill="${C.G}" stroke="${C.T}" stroke-width="1.6" stroke-linejoin="round"/>
      <circle cy="-50" r="1.6" fill="${C.H}"/>
      <circle cx="-5.5" cy="-49" r="1.2" fill="#38bdf8"/>
      <circle cx="5.5" cy="-49" r="1.2" fill="#38bdf8"/>`
    : '';

  return `
  <g transform="translate(${x},${y}) scale(${s})">
    <ellipse cy="1" rx="20" ry="4" fill="${C.T}" opacity=".16"/>

    <g class="tail">
      <path d="M16 -9C38 -6 42 -30 31 -37" stroke="${C.T}" stroke-width="8.4" fill="none" stroke-linecap="round"/>
      <path d="M16 -9C38 -6 42 -30 31 -37" stroke="#fff" stroke-width="4.8" fill="none" stroke-linecap="round"/>
      <circle cx="31" cy="-37" r="2.4" fill="${C.S}"/>
    </g>

    <ellipse cx="-8.5" cy="-1.5" rx="6" ry="3.6" fill="#fff" stroke="${C.T}" stroke-width="1.6"/>
    <ellipse cx="8.5" cy="-1.5" rx="6" ry="3.6" fill="#fff" stroke="${C.T}" stroke-width="1.6"/>
    <ellipse cy="-12" rx="18" ry="13" fill="#fff" stroke="${C.T}" stroke-width="2"/>
    <ellipse cy="-8.5" rx="9" ry="8" fill="${C.L}"/>

    <path d="M-15 -41L-17.5 -59L-3 -46Z" fill="#fff" stroke="${C.T}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M15 -41L17.5 -59L3 -46Z" fill="#fff" stroke="${C.T}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M-13.5 -45L-14.8 -54L-7.5 -47Z" fill="${C.S}"/>
    <path d="M13.5 -45L14.8 -54L7.5 -47Z" fill="${C.S}"/>

    <ellipse cy="-33" rx="17.5" ry="14.5" fill="#fff" stroke="${C.T}" stroke-width="2"/>
    <path d="M-4 -45V-41M0 -46V-42M4 -45V-41" stroke="${C.S}" stroke-width="1.4" stroke-linecap="round"/>

    <ellipse cx="-11.5" cy="-28" rx="3.6" ry="2.2" fill="${C.S}" opacity=".75"/>
    <ellipse cx="11.5" cy="-28" rx="3.6" ry="2.2" fill="${C.S}" opacity=".75"/>

    ${eyes[mood] || eyes.happy}
    <path d="M-2 -29.6H2L0 -27.4Z" fill="${C.H}" stroke="${C.T}" stroke-width=".6" stroke-linejoin="round"/>
    ${mouths[mood] || mouths.happy}
    <path d="M-13 -29L-24 -31M-13 -27L-24 -26M13 -29L24 -31M13 -27L24 -26"
          stroke="${C.T}" stroke-width=".9" stroke-linecap="round" opacity=".7"/>

    <path d="M-10 -20Q0 -15.5 10 -20" stroke="${C.H}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <circle cy="-16.2" r="2.6" fill="${C.G}" stroke="${C.T}" stroke-width="1"/>

    ${crownShape}
  </g>`;
}

function bat(x, y, s = 1, mood = 'evil') {
  const wing = `
    <path d="M-7 -3C-18 -19 -35 -18 -48 -7Q-41 -5 -39 3Q-33 -1 -29 7Q-24 1 -19 8Q-13 4 -8 7Z"
          fill="${C.W}" stroke="${C.T}" stroke-width="1.5" stroke-linejoin="round"/>
    <path d="M-7 -3L-48 -7M-7 -3L-39 3M-7 -3L-29 7M-7 -3L-19 8"
          stroke="${C.T}" stroke-width="1" opacity=".6"/>`;

  const faces = {
    evil: `
      <ellipse cx="-3.6" cy="-12.8" rx="2.5" ry="1.9" fill="${C.H}" transform="rotate(22 -3.6 -12.8)"/>
      <ellipse cx="3.6" cy="-12.8" rx="2.5" ry="1.9" fill="${C.H}" transform="rotate(-22 3.6 -12.8)"/>
      <circle cx="-3.2" cy="-12.9" r=".7" fill="#fff"/>
      <circle cx="3.2" cy="-12.9" r=".7" fill="#fff"/>
      <path d="M-7 -17.2L-1.5 -14.6M7 -17.2L1.5 -14.6" stroke="${C.T}" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M-4.5 -7.2Q0 -3.2 4.5 -7.2" stroke="${C.H}" stroke-width="1.1" fill="none"/>
      <path d="M-3.2 -6.4L-2.2 -3.8L-1.2 -5.6ZM3.2 -6.4L2.2 -3.8L1.2 -5.6Z" fill="#fff"/>`,

    sad: `
      <circle cx="-3.6" cy="-12.5" r="2.4" fill="${C.H}"/>
      <circle cx="3.6" cy="-12.5" r="2.4" fill="${C.H}"/>
      <circle cx="-3" cy="-13.2" r=".8" fill="#fff"/>
      <circle cx="4.2" cy="-13.2" r=".8" fill="#fff"/>
      <path d="M-6.5 -16L-1.8 -17.6M6.5 -16L1.8 -17.6" stroke="${C.T}" stroke-width="1.6" stroke-linecap="round"/>
      <path d="M-6 -9.5Q-7.4 -7 -6 -6.2Q-4.6 -7 -6 -9.5Z" fill="#7dd3fc"/>
      <path d="M-3 -5.2Q0 -7.6 3 -5.2" stroke="${C.H}" stroke-width="1.1" fill="none" stroke-linecap="round"/>`,

    wow: `
      <circle cx="-3.6" cy="-12.5" r="2.8" fill="#fff"/>
      <circle cx="3.6" cy="-12.5" r="2.8" fill="#fff"/>
      <circle cx="-3.6" cy="-12.5" r="1.2" fill="${C.T}"/>
      <circle cx="3.6" cy="-12.5" r="1.2" fill="${C.T}"/>
      <ellipse cy="-5.8" rx="1.8" ry="2.2" fill="${C.H}"/>`,

    happy: `
      <path d="M-6.2 -12Q-3.6 -15.6 -1 -12M1 -12Q3.6 -15.6 6.2 -12"
            stroke="${C.H}" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <path d="M-4 -7.5Q0 -2.8 4 -7.5Z" fill="${C.H}"/>`
  };

  return `
  <g transform="translate(${x},${y}) scale(${s})">
    <g class="wing wl">${wing}</g>
    <g class="wing wr"><g transform="scale(-1 1)">${wing}</g></g>

    <path d="M-4 11.5V16M4 11.5V16" stroke="${C.T}" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M-7 -17.5L-9.6 -30L-1.8 -21ZM7 -17.5L9.6 -30L1.8 -21Z" fill="${C.T}"/>
    <path d="M-6.4 -20L-8 -26.5L-3.4 -21.5ZM6.4 -20L8 -26.5L3.4 -21.5Z" fill="${C.H}"/>
    <ellipse cy="2" rx="8.5" ry="10" fill="${C.T}"/>
    <ellipse cy="4" rx="5" ry="6.5" fill="#6B2A49"/>
    <circle cy="-12" r="8.5" fill="${C.T}"/>
    <path d="M-8.2 -15.5Q0 -18.5 8.2 -15.5L7.8 -9.5Q0 -7.5 -7.8 -9.5Z" fill="#7A2D4E"/>
    ${faces[mood] || faces.evil}
  </g>`;
}

const face = (who, mood) =>
  who === 'h'
    ? `<svg class="face" viewBox="-26 -62 52 46" aria-hidden="true">${cat(0, 0, 1, mood || 'happy')}</svg>`
    : `<svg class="face" viewBox="-34 -34 68 48" aria-hidden="true">${bat(0, 0, 1, mood || 'evil')}</svg>`;

const look = r =>
  ({
    b: { cat: 'scared', bat: 'evil', tone: 'hit' },
    x: { cat: 'win', bat: 'sad', tone: 'safe' },
    n: { cat: 'happy', bat: 'wow', tone: '' }
  }[r.k] || { cat: 'happy', bat: 'evil', tone: '' });

const cloudShape = (x, y, s, fill) => `
  <g class="drift">
    <g transform="translate(${x} ${y}) scale(${s})" fill="${fill}" opacity=".92">
      <ellipse rx="24" ry="9"/>
      <circle cx="-9" cy="-6" r="9"/>
      <circle cx="6" cy="-9" r="12"/>
    </g>
  </g>`;

const sparkle = (x, y, delay) => `
  <path class="twinkle" style="animation-delay:${delay}s"
        d="M${x} ${y - 7}L${x + 2} ${y - 2}L${x + 7} ${y}L${x + 2} ${y + 2}L${x} ${y + 7}L${x - 2} ${y + 2}L${x - 7} ${y}L${x - 2} ${y - 2}Z"
        fill="${C.G}"/>`;

function backdrop(tone) {
  const sky = tone === 'hit' ? ['#6B2145', '#F27BA6']
            : tone === 'safe' ? ['#BDEFD3', '#FFF5F8']
            : ['#FFC9DC', '#FFF5F8'];
  const cloud = tone === 'hit' ? '#8E3560' : '#fff';
  const sun = tone === 'hit' ? C.H : '#FFE08A';
  const id = 'sky' + (++uid);

  return `
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${sky[0]}"/>
      <stop offset="1" stop-color="${sky[1]}"/>
    </linearGradient>
  </defs>
  <rect width="340" height="170" fill="url(#${id})"/>

  <circle cx="300" cy="30" r="25" fill="${sun}" opacity=".35"/>
  <circle cx="300" cy="30" r="15" fill="${sun}"/>
  ${cloudShape(42, 36, 1, cloud)}
  ${cloudShape(210, 24, .7, cloud)}

  <path d="M0 132Q40 96 95 118Q140 100 190 120Q250 92 340 124V132Z" fill="#F9B4CC"/>
  <path d="M0 134Q60 112 130 128Q200 114 340 132V134Z" fill="#F08DB1"/>

  <rect y="128" width="340" height="42" fill="${C.P}"/>
  <rect y="128" width="340" height="5" fill="#E8588C"/>
  <path d="M0 150H340" stroke="${C.B}" stroke-width="2" stroke-dasharray="10 8"/>
  <circle cx="22" cy="161" r="2.4" fill="${C.S}"/>
  <circle cx="118" cy="163" r="2" fill="${C.S}"/>
  <circle cx="232" cy="160" r="2.4" fill="${C.S}"/>
  <circle cx="322" cy="163" r="2" fill="${C.S}"/>

  ${tone === 'hit'
    ? `<path d="M118 0L106 26H116L108 48L130 18H119Z" fill="#FFE08A"/>
       <path d="M262 4L254 22H261L256 38L272 16H264Z" fill="#FFE08A"/>`
    : ''}
  ${tone === 'safe'
    ? sparkle(40, 70, 0) + sparkle(308, 78, .5) + sparkle(120, 40, 1) + sparkle(236, 60, .25)
    : ''}`;
}

const sv = (alt, inner, tone = '') => `
  <svg viewBox="0 0 340 170" role="img" aria-label="${esc(alt)}">
    ${backdrop(tone)}
    ${inner}
  </svg>`;

const say = message => {
  const w = Math.min(245, message.length * 6.1 + 22);
  return `
    <rect x="12" y="10" width="${w}" height="25" rx="12" fill="${C.T}"/>
    <path d="M24 34L29 42L35 34Z" fill="${C.T}"/>
    <text x="${12 + w / 2}" y="26" text-anchor="middle" font-size="10.5" fill="${C.B}">${esc(message)}</text>`;
};

const shield = (x, y = 0) => `
  <g transform="translate(0 ${y})">
    <path d="M${x} 84L${x + 22} 91V105C${x + 22} 117 ${x + 11} 123 ${x} 127C${x - 11} 123 ${x - 22} 117 ${x - 22} 105V91Z"
          fill="${C.B}" stroke="${C.H}" stroke-width="2.5"/>
    <path d="M${x - 10} 104L${x - 3} 111L${x + 11} 97" stroke="${C.P}" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

const house = () => `
  <rect x="304" y="70" width="9" height="20" fill="${C.W}"/>
  <circle class="puff" cx="308" cy="64" r="4" fill="#fff" opacity=".8"/>
  <circle class="puff" style="animation-delay:.8s" cx="310" cy="64" r="3" fill="#fff" opacity=".8"/>
  <rect x="266" y="92" width="52" height="38" fill="${C.B}" stroke="${C.T}" stroke-width="2.5"/>
  <path d="M258 95L292 66L326 95Z" fill="${C.P}" stroke="${C.T}" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M292 86C286 82 286 76 292 77C298 76 298 82 292 86Z" fill="${C.B}"/>
  <rect x="285" y="106" width="14" height="24" rx="2" fill="${C.H}" stroke="${C.T}" stroke-width="2"/>
  <circle cx="296" cy="118" r="1.3" fill="${C.G}"/>
  <rect x="270" y="102" width="12" height="12" fill="#FFE08A" stroke="${C.T}" stroke-width="2"/>
  <path d="M276 102V114M270 108H282" stroke="${C.T}" stroke-width="1.2"/>
  <rect x="304" y="102" width="10" height="12" fill="#FFE08A" stroke="${C.T}" stroke-width="2"/>`;

const island = () => `
  <ellipse cx="42" cy="132" rx="46" ry="13" fill="${C.W}"/>
  <ellipse cx="42" cy="128" rx="42" ry="9" fill="#7A2D4E"/>
  <rect x="9" y="98" width="30" height="28" fill="${C.T}"/>
  <path d="M5 100L24 82L43 100Z" fill="#2A0E1D" stroke="${C.T}" stroke-width="2" stroke-linejoin="round"/>
  <rect x="21" y="108" width="7" height="8" fill="${C.H}"/>
  <path d="M24 82V66" stroke="${C.T}" stroke-width="2"/>
  <path d="M24 66H40L36 71L40 76H24Z" fill="${C.T}"/>
  <circle cx="30" cy="70" r="2" fill="${C.B}"/>
  <path d="M68 128V104M68 112L58 100M68 108L78 98M68 118L76 112"
        stroke="${C.T}" stroke-width="3" stroke-linecap="round" fill="none"/>`;

const sign = text => `
  <rect x="162" y="66" width="6" height="64" fill="${C.T}"/>
  <path d="M118 48H198L210 59L198 70H118Z" fill="${C.T}" stroke="${C.H}" stroke-width="1.5" stroke-linejoin="round"/>
  <text x="160" y="63" text-anchor="middle" font-size="11" font-weight="700" fill="${C.B}">${esc(text)}</text>`;

const redirectArrow = () => `
  <path d="M150 74Q106 46 78 90" stroke="${C.H}" stroke-width="3" stroke-dasharray="6 5" fill="none" stroke-linecap="round"/>
  <path d="M72 80L80 96L88 84Z" fill="${C.H}"/>`;

const mail = (x, y, rot = 0) => `
  <g transform="translate(${x} ${y}) rotate(${rot})">
    <rect x="-9" y="-6" width="18" height="12" rx="2" fill="${C.B}" stroke="${C.T}" stroke-width="1.5"/>
    <path d="M-9 -5L0 2L9 -5" stroke="${C.T}" stroke-width="1.3" fill="none"/>
  </g>`;

function guard(state) {
  const busy = state === 'b';
  const happy = state === 'x';

  const eyes = busy
    ? `<path d="M156 85L164 93M164 85L156 93M176 85L184 93M184 85L176 93" stroke="${C.H}" stroke-width="2.5" stroke-linecap="round"/>`
    : happy
      ? `<path d="M155 91Q160 83 165 91M175 91Q180 83 185 91" stroke="#4ade80" stroke-width="2.5" fill="none" stroke-linecap="round"/>`
      : `<circle cx="160" cy="88" r="4" fill="${C.B}"/><circle cx="180" cy="88" r="4" fill="${C.B}"/>`;

  const cpuFill = busy ? 44 : 10;
  const cpuColor = busy ? C.H : '#16a34a';

  return `
  <rect x="150" y="118" width="10" height="12" rx="2" fill="${C.T}"/>
  <rect x="180" y="118" width="10" height="12" rx="2" fill="${C.T}"/>
  <path d="M138 98L128 112M202 98L212 112" stroke="${C.T}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="127" cy="113" r="4" fill="${C.S}" stroke="${C.T}" stroke-width="2"/>
  <circle cx="213" cy="113" r="4" fill="${C.S}" stroke="${C.T}" stroke-width="2"/>
  <rect x="140" y="70" width="60" height="52" rx="12" fill="#fff" stroke="${C.T}" stroke-width="3"/>
  <path d="M170 70V58" stroke="${C.T}" stroke-width="3"/>
  <circle cx="170" cy="55" r="4.5" fill="${busy ? C.H : C.S}" stroke="${C.T}" stroke-width="2"/>
  <rect x="148" y="77" width="44" height="22" rx="6" fill="${C.T}"/>
  ${eyes}
  <text x="150" y="111" font-size="6.5" font-weight="800" fill="${C.T}">CPU</text>
  <rect x="164" y="106" width="28" height="7" rx="3.5" fill="${C.S}"/>
  <rect x="164" y="106" width="${cpuFill * 28 / 44}" height="7" rx="3.5" fill="${cpuColor}"/>
  ${busy
    ? `<circle class="puff" cx="164" cy="50" r="4" fill="#9ca3af"/>
       <circle class="puff" style="animation-delay:.6s" cx="174" cy="48" r="5" fill="#9ca3af"/>
       <circle class="puff" style="animation-delay:1.1s" cx="169" cy="46" r="3" fill="#9ca3af"/>`
    : ''}`;
}

function flask(x, y, state) {
  const tilt = state === 'b' ? ' rotate(-20)' : '';
  const liquid = state === 'x' ? '#16a34a' : C.H;

  return `
  <g transform="translate(${x},${y})${tilt}">
    <path d="M-5 -26H5V-14L16 4Q20 14 10 18H-10Q-20 14 -16 4L-5 -14Z"
          fill="#fff" stroke="${C.T}" stroke-width="2" stroke-linejoin="round"/>
    <path d="M-15 6H15Q19 14 10 17H-10Q-19 14 -15 6Z" fill="${liquid}" opacity=".9"/>
    <rect x="-6" y="-31" width="12" height="7" rx="2" fill="#B9774A" stroke="${C.T}" stroke-width="1.5"/>
    <text y="14" text-anchor="middle" font-size="5.5" font-weight="800" fill="${C.B}">__proto__</text>
  </g>
  ${state === 'b'
    ? `<circle class="drip" cx="${x - 14}" cy="${y + 22}" r="2.2" fill="${C.H}"/>
       <circle class="drip" style="animation-delay:.5s" cx="${x - 10}" cy="${y + 24}" r="2" fill="${C.H}"/>`
    : ''}`;
}

const ban = (x, y, r) => `
  <circle cx="${x}" cy="${y}" r="${r}" stroke="${C.H}" stroke-width="3.5" fill="none"/>
  <path d="M${x - r * .7} ${y - r * .7}L${x + r * .7} ${y + r * .7}" stroke="${C.H}" stroke-width="3.5" stroke-linecap="round"/>`;

const chain = (x1, y1, x2, y2) => `
  <path d="M${x1} ${y1}Q${(x1 + x2) / 2} ${y1 + 26} ${x2} ${y2}"
        stroke="${C.H}" stroke-width="2" stroke-dasharray="4 4" fill="none" stroke-linecap="round"/>`;

const heroArt = () => sv('Hedy and Batty face off', `
  <g class="fl">${cat(78, 152, 2.1, 'smug')}</g>
  <g class="fl" style="animation-delay:.6s">${bat(256, 66, 1.7, 'evil')}</g>
  <circle cx="166" cy="112" r="17" fill="${C.H}" stroke="${C.T}" stroke-width="3"/>
  <text x="166" y="118" text-anchor="middle" font-size="16" font-weight="900" fill="${C.B}">VS</text>`);

const trophy = (x, y) => `
  <g transform="translate(${x},${y})">
    <path d="M-18 -44Q-33 -44 -30 -32Q-27 -24 -15 -22M18 -44Q33 -44 30 -32Q27 -24 15 -22"
          stroke="${C.T}" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="M-18 -50H18V-30Q18 -10 0 -6Q-18 -10 -18 -30Z"
          fill="${C.G}" stroke="${C.T}" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="-3.5" y="-9" width="7" height="13" fill="${C.G}" stroke="${C.T}" stroke-width="2"/>
    <rect x="-15" y="2" width="30" height="10" rx="2" fill="${C.H}" stroke="${C.T}" stroke-width="2.5"/>
    <path d="M0 -42L3 -35L10 -34L5 -29L6 -22L0 -26L-6 -22L-5 -29L-10 -34L-3 -35Z" fill="#fff"/>
  </g>`;

const winArt = () => sv('Hedy and Batty celebrate together with a trophy', `
  <g class="fl">${trophy(170, 128)}</g>
  ${cat(66, 152, 1.7, 'win', true)}
  ${bat(272, 66, 1.5, 'happy')}`, 'safe');

const lockArt = () => sv('A big padlock with Batty sitting on it', `
  <g class="fl">
    <path d="M148 72V58Q148 36 170 36Q192 36 192 58V72" stroke="${C.T}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <rect x="138" y="70" width="64" height="52" rx="10" fill="${C.P}" stroke="${C.T}" stroke-width="3"/>
    <circle cx="170" cy="92" r="6" fill="${C.T}"/>
    <rect x="167" y="95" width="6" height="14" rx="2" fill="${C.T}"/>
  </g>
  ${cat(56, 152, 1.3, 'scared')}
  ${bat(280, 90, 1.3, 'evil')}`);
