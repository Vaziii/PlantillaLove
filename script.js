/* Configuración Personalizable */
const RELATIONSHIP_CONFIG = {
  // Fecha en que comenzó la relación (Año, Mes - 1, Día, Hora, Minuto)
  startDate: new Date('2023-05-14T00:00:00'),
  coupleNames: "Nuestra Historia de Amor",
  partnerName: "Mi Amor",
};

// ==========================================
// 1. Contador de Tiempo Juntos
// ==========================================
function initLoveCounter() {
  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minsEl = document.getElementById('count-mins');
  const secsEl = document.getElementById('count-secs');

  if (!daysEl) return;

  function updateCounter() {
    const now = new Date();
    const diff = now - RELATIONSHIP_CONFIG.startDate;

    if (diff < 0) {
      // Si la fecha es a futuro
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(minutes).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');
  }

  updateCounter();
  setInterval(updateCounter, 1000);
}

// ==========================================
// 2. Sistema de Partículas Flotantes (Corazones y Estrellas)
// ==========================================
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 45;

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 50;
      this.size = Math.random() * 12 + 6;
      this.speedY = Math.random() * 1.2 + 0.4;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.opacity = Math.random() * 0.6 + 0.2;
      this.type = Math.random() > 0.4 ? 'heart' : 'sparkle';
      this.rot = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 1.5;
      this.color = Math.random() > 0.5 ? '#ff4b72' : '#ff85a2';
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.rot += this.rotSpeed;

      if (this.y < -30) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rot * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;

      if (this.type === 'heart') {
        ctx.fillStyle = this.color;
        const d = this.size / 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-d, -d, -d * 2, d / 3, 0, d * 1.6);
        ctx.bezierCurveTo(d * 2, d / 3, d, -d, 0, 0);
        ctx.fill();
      } else {
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, this.size / 4, 0, Math.PI * 2);
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#fff';
        ctx.fill();
      }

      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    const p = new Particle();
    p.y = Math.random() * height; // Distribuir inicialmente en toda la pantalla
    particles.push(p);
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================
// 3. Audio de Ambiente Opcional
// ==========================================
function initBackgroundAudio() {
  const musicBtn = document.getElementById('floating-audio-toggle');
  const bgAudio = document.getElementById('bg-audio');

  if (!musicBtn || !bgAudio) return;

  let isPlaying = false;

  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgAudio.pause();
      musicBtn.classList.remove('playing');
      musicBtn.innerHTML = '🎵';
      musicBtn.title = 'Reproducir música de fondo';
    } else {
      bgAudio.play().then(() => {
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '⏸️';
        musicBtn.title = 'Pausar música';
      }).catch(err => {
        console.log('Audio autoplay prevented:', err);
      });
    }
    isPlaying = !isPlaying;
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initLoveCounter();
  initBackgroundAudio();
});
