/**
 * LOVEFLIX - LÓGICA INTERACTIVA
 * Control de perfiles, previsualizaciones de video y modal de reproducción
 */

// 1. Entrada de Selección de Perfil
function enterNetflix(profileName) {
  const gate = document.getElementById('profile-gate');
  if (gate) {
    gate.classList.add('hidden');
  }
}

// 2. Efecto de Barra de Navegación al hacer Scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  if (nav) {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
});

// 3. Previsualización de video al pasar el cursor (Hover Preview)
function playPreview(card) {
  const video = card.querySelector('video');
  if (video) {
    video.play().catch(() => {
      // Manejo silencioso si autoplay está bloqueado por el navegador
    });
  }
}

function pausePreview(card) {
  const video = card.querySelector('video');
  if (video) {
    video.pause();
    video.currentTime = 0;
  }
}

// 4. Lógica del Modal Pop-up para Fotos y Videos
const modal = document.getElementById('media-modal');
const modalContainer = document.getElementById('modal-container');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');

function openMediaModal(type, src, title, desc) {
  if (modalTitle) modalTitle.textContent = title;
  if (modalDesc) modalDesc.textContent = desc;

  if (modalContainer) {
    if (type === 'video') {
      modalContainer.innerHTML = `
        <video controls autoplay style="width:100%; height:100%;">
          <source src="${src}" type="video/mp4">
          Tu navegador no soporta el formato de video o el archivo "${src}" no se encuentra.
        </video>
      `;
    } else {
      modalContainer.innerHTML = `
        <img src="${src}" alt="${title}" style="width:100%; height:100%; object-fit:contain;">
      `;
    }
  }

  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeMediaModal() {
  if (modal) {
    modal.style.display = 'none';
  }
  if (modalContainer) {
    modalContainer.innerHTML = ''; // Detener reproducción de video
  }
}

function closeModalOnOutside(e) {
  if (e.target === modal) {
    closeMediaModal();
  }
}

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
    closeMediaModal();
  }
});
