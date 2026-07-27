// ============================================================================
// script.js — interacciones ligeras del portafolio
// ============================================================================

// 1. Menú móvil (nav tipo "pestañas")
const navToggle = document.getElementById('navToggle');
const tabbarNav = document.getElementById('tabbar-nav');

if (navToggle && tabbarNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = tabbarNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Cierra el menú al elegir una sección (útil en móvil)
  tabbarNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      tabbarNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// 2. Año dinámico en el footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// 3. Revelado suave al hacer scroll (respeta prefers-reduced-motion)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll('.section, .project-card, .commit');

  revealTargets.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealTargets.forEach(el => observer.observe(el));
}

// Efecto de sonido al pasar el mouse por el gato dormido
const catImg = document.getElementById('cat-gif');
const catSound = document.getElementById('cat-sound');

if (catImg && catSound) {
  // Ajusta el volumen (0.0 es silencio, 1.0 es volumen máximo)
  catSound.volume = 0.4; 

  catImg.addEventListener('mouseenter', () => {
    catSound.currentTime = 0; // Reinicia el audio si vuelve a pasar el cursor
    catSound.play().catch(error => {
      // Maneja posibles restricciones de reproducción automática del navegador
      console.log('Interacción requerida para reproducir audio:', error);
    });
  });

  // Opcional: si quieres que el sonido se detenga cuando quite el cursor
  catImg.addEventListener('mouseleave', () => {
    catSound.pause();
  });
}
