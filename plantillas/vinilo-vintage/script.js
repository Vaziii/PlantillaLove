/* ============================================================
   CONFIGURACIÓN — edita aquí tus canciones, fotos y portadas
   Puedes agregar más canciones copiando el mismo formato.
   ============================================================ */
const songs = [
  {
    title: 'Canción 1',
    artist: 'Artista',
    cover: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&auto=format&fit=crop',
    audio: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
    note: 'Esta canción me hizo acordar a las veces que tú me mirabas así, sin decir nada.',
    wine: 'Some moments are too beautiful to forget.',
  },
  {
    title: 'Canción 2',
    artist: 'Artista',
    cover: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&auto=format&fit=crop',
    audio: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
    note: 'Esta canción fue la que sonaba cuando te conocí y no supe que ahí empezaba todo.',
    wine: 'El día que te conocí, el mundo sonó diferente.',
  },
  {
    title: 'Canción 3',
    artist: 'Artista',
    cover: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&auto=format&fit=crop',
    audio: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=romantic-piano-112199.mp3',
    note: 'Cada vez que suena, regreso a esa noche en que bailamos bajo las luces.',
    wine: 'Bailamos lento como si el tiempo nos esperara.',
  },
];

/* ====== ELEMENTOS ====== */
const audio = document.getElementById('audio');
const vinyl = document.getElementById('vinyl');
const vinylWrap = document.getElementById('vinylWrap');
const vinylCover = document.getElementById('vinylCover');
const tonearm = document.getElementById('tonearm');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const timeNow = document.getElementById('timeNow');
const timeTotal = document.getElementById('timeTotal');
const volume = document.getElementById('volume');
const songList = document.getElementById('songList');
const miniCover = document.getElementById('miniCover');
const miniTitle = document.getElementById('miniTitle');
const miniArtist = document.getElementById('miniArtist');
const miniPlay = document.getElementById('miniPlay');

let currentIndex = 0;
let isPlaying = false;

/* ====== INTRO: sobre y flores ====== */
function openEnvelope() {
  const envImg = document.getElementById('envImg');
  const intro = document.getElementById('intro');
  const burst = document.getElementById('flower-burst');
  if (envImg.dataset.open) return;
  envImg.dataset.open = '1';
  envImg.src = '../../assets/fondo/abierto2.png';
  setTimeout(() => {
    burst.classList.remove('hidden');
    burst.innerHTML = '';
    // Circunferencias de flores del mismo tamaño que llenan la pantalla
    const flowerImgs = ['flores.png', 'flores2.png', 'flores3.png', 'flores4.png', 'flores5.png'];
    const maxRadius = Math.hypot(innerWidth, innerHeight) * 0.55;
    const flowerSize = 130; // mismo tamaño para todas
    let idx = 0;

    // Círculos concéntricos: cada uno con más flores que el anterior
    for (let r = 70; r <= maxRadius; r += 55) {
      const count = Math.max(8, Math.floor((2 * Math.PI * r) / (flowerSize * 1.1))); // espaciadas
      for (let i = 0; i < count; i++) {
        const ang = (i / count) * Math.PI * 2 + (r * 0.01);
        const f = document.createElement('div');
        f.className = 'burst-flower';
        const img = flowerImgs[idx++ % flowerImgs.length];
        f.innerHTML = `<img src="../../assets/fondo/${img}" alt="flor" style="width:${flowerSize}px; transform: scaleX(${idx % 2 ? 1 : -1}) rotate(${(Math.random() * 30 - 15).toFixed(0)}deg)">`;
        f.style.setProperty('--tx', Math.cos(ang) * r + 'px');
        f.style.setProperty('--ty', Math.sin(ang) * r + 'px');
        f.style.setProperty('--s', '1');
        f.style.setProperty('--r', (Math.random() * 40 - 20).toFixed(0) + 'deg');
        f.style.animationDelay = (r / maxRadius * 0.9) + 's';
        burst.appendChild(f);
      }
    }
  }, 900);
  // Cuando ya llenó la pantalla, las flores caen y se desvanecen
  setTimeout(() => {
    document.querySelectorAll('.burst-flower').forEach((f) => f.classList.add('fall'));
  }, 2100);
  setTimeout(() => {
    intro.classList.add('fade-out');
    burst.classList.add('hidden');
    document.getElementById('bgContainer').classList.remove('hidden');
  }, 3400);
}

/* Panel lateral */
function toggleSide() {
  document.getElementById('sidePanel').classList.toggle('open');
}
document.getElementById('sideFab').addEventListener('click', toggleSide);

// Rosa realista en SVG con capas de pétalos y degradado
function realisticRose(color) {
  return `<svg width="120" height="120" viewBox="0 0 120 120">
    <defs>
      <radialGradient id="g${color.slice(1)}" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="#fff1f2"/>
        <stop offset="45%" stop-color="${color}"/>
        <stop offset="100%" stop-color="#8f4a56"/>
      </radialGradient>
    </defs>
    <g>
      ${[0, 45, 90, 135, 180, 225, 270, 315].map(a => `<ellipse cx="60" cy="32" rx="16" ry="30" fill="url(#g${color.slice(1)})" opacity="0.85" transform="rotate(${a} 60 60)"/>`).join('')}
      ${[22, 67, 112, 157, 202, 247, 292, 337].map(a => `<ellipse cx="60" cy="40" rx="12" ry="22" fill="${color}" opacity="0.9" transform="rotate(${a} 60 60)"/>`).join('')}
      <circle cx="60" cy="60" r="14" fill="#8f4a56"/>
      <circle cx="60" cy="60" r="9" fill="${color}"/>
      <path d="M60 54 a6 6 0 0 1 6 6 a4 4 0 0 1 -4 4" stroke="#fff1f2" stroke-width="1.4" fill="none" opacity="0.7"/>
    </g>
  </svg>`;
}

/* ====== CANCIONES ====== */
function loadSong(index, autoplay = false) {
  currentIndex = index;
  const s = songs[index];

  // Efecto especial de cambio de canción
  vinylWrap.classList.add('shrink');
  vinylCover.classList.add('fade');

  setTimeout(() => {
    songTitle.textContent = s.title;
    songArtist.textContent = s.artist;
    vinylCover.style.backgroundImage = `url('${s.cover}')`;
    miniCover.style.backgroundImage = `url('${s.cover}')`;
    miniTitle.textContent = s.title;
    miniArtist.textContent = s.artist;
    const ctaSub = document.querySelector('.cta-sub');
    if (ctaSub && s.note) ctaSub.textContent = s.note;
    const wineCard = document.querySelector('.wine-card p');
    if (wineCard && s.wine) wineCard.textContent = s.wine;
    audio.src = s.audio;
    audio.load();
    progressFill.style.width = '0%';
    timeNow.textContent = '00:00';
    vinylCover.classList.remove('fade');
    vinylWrap.classList.remove('shrink');
    markActive();
    if (autoplay) play();
  }, 400);
}

function play() {
  audio.play().then(() => {
    isPlaying = true;
    vinyl.classList.add('playing');
    tonearm.classList.add('on-vinyl');
    playBtn.textContent = '⏸';
    miniPlay.textContent = '⏸';
  }).catch(() => {});
}

function pause() {
  audio.pause();
  isPlaying = false;
  vinyl.classList.remove('playing'); // mantiene la posición actual
  playBtn.textContent = '▶';
  miniPlay.textContent = '▶';
}

playBtn.addEventListener('click', () => (isPlaying ? pause() : play()));
miniPlay.addEventListener('click', () => (isPlaying ? pause() : play()));
prevBtn.addEventListener('click', () => loadSong((currentIndex - 1 + songs.length) % songs.length, isPlaying));
nextBtn.addEventListener('click', () => loadSong((currentIndex + 1) % songs.length, isPlaying));

audio.addEventListener('ended', () => {
  pause();
  tonearm.classList.remove('on-vinyl'); // el brazo vuelve a su posición
});

audio.addEventListener('timeupdate', () => {
  if (!audio.duration) return;
  progressFill.style.width = (audio.currentTime / audio.duration) * 100 + '%';
  timeNow.textContent = fmt(audio.currentTime);
});
audio.addEventListener('loadedmetadata', () => { timeTotal.textContent = fmt(audio.duration); });

progressBar.addEventListener('click', (e) => {
  const rect = progressBar.getBoundingClientRect();
  audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
});

volume.addEventListener('input', () => { audio.volume = volume.value; });
audio.volume = volume.value;

function fmt(sec) {
  if (!isFinite(sec)) return '00:00';
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/* ====== LISTA DE CANCIONES ====== */
songs.forEach((s, i) => {
  const item = document.createElement('div');
  item.className = 'song-item';
  item.innerHTML = `<img src="${s.cover}" alt="${s.title}"><div><strong>${s.title}</strong><span>${s.artist}</span></div>`;
  item.addEventListener('click', () => loadSong(i, isPlaying));
  songList.appendChild(item);
});

function markActive() {
  [...songList.children].forEach((el, i) => el.classList.toggle('active', i === currentIndex));
}

/* ====== SCROLL REVEAL ====== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e) => e.target.classList.add('visible'));
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

/* ====== CARRUSEL DE RECUERDOS ====== */
(function initCarousel() {
  const track = document.getElementById('carTrack');
  const dotsBox = document.getElementById('carDots');
  if (!track) return;
  const slides = [...track.children];
  slides[0].classList.add('active');
  slides.forEach((_, i) => {
    const d = document.createElement('button');
    if (i === 0) d.classList.add('active');
    d.onclick = () => go(i);
    dotsBox.appendChild(d);
  });
  let idx = 0;
  function go(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, j) => s.classList.toggle('active', j === idx));
    [...dotsBox.children].forEach((d, j) => d.classList.toggle('active', j === idx));
  }
  window.carSlide = (dir) => go(idx + dir);
  setInterval(() => go(idx + 1), 6000);
})();

/* ====== INICIO ====== */
loadSong(0);
