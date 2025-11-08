// Validación básica de formulario
const form = document.getElementById("form-contacto");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Gracias por tu mensaje. Te responderemos pronto.");
  form.reset();
});

/* ===== Modal dinámico para eventos ===== */
(function(){
  // Crear modal en DOM
  const modal = document.createElement('div');
  modal.className = 'event-modal';
  modal.innerHTML = `
    <div class="modal-card" role="dialog" aria-modal="true" aria-label="Galería del evento">
      <div class="modal-header">
        <h3 id="modal-title">Galería</h3>
        <button class="modal-close" aria-label="Cerrar ventana">&times;</button>
      </div>
      <div class="modal-gallery" id="modal-gallery"></div>
    </div>
  `;
  document.body.appendChild(modal);

  const modalCloseBtn = modal.querySelector('.modal-close');
  const modalGallery = modal.querySelector('#modal-gallery');
  const modalTitle = modal.querySelector('#modal-title');

  // Abrir modal con datos
  function openModal(title, images){
    modalGallery.innerHTML = '';
    modalTitle.textContent = title || 'Galería del evento';
    images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title || 'Imagen del evento';
      modalGallery.appendChild(img);
    });
    // mostrar
    modal.classList.add('open');
    // bloqueo scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }

  // Cerrar modal
  function closeModal(){
    modal.classList.remove('open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }

  // cerrar con botón
  modalCloseBtn.addEventListener('click', closeModal);

  // cerrar al clicar fuera del card
  modal.addEventListener('click', (e) => {
    if(e.target === modal) closeModal();
  });

  // asignar evento click a todas las tarjetas .evento
  function initEventCards(){
    const cards = document.querySelectorAll('.evento');
    cards.forEach(card => {
      // evitar duplicar listeners
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        // título del evento: toma el texto del <p> si existe
        const titleEl = card.querySelector('p');
        const title = titleEl ? titleEl.textContent.trim() : 'Evento';

        // obtener data-gallery
        const data = card.getAttribute('data-gallery') || '';
        const imgs = data.split(',').map(s => s.trim()).filter(Boolean);

        // si no hay data-gallery, intentamos mostrar la imagen principal 3 veces (fallback)
        if(imgs.length === 0){
          const mainImg = card.querySelector('img');
          const src = mainImg ? mainImg.src : '';
          const fallback = src ? [src, src, src] : [];
          openModal(title, fallback);
          return;
        }

        openModal(title, imgs);
      });
    });
  }

  // Lanza la inicialización ahora y también si el DOM cambia
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEventCards);
  } else {
    initEventCards();
  }

  // opcional: re-inicializar si agregas eventos dinámicamente (exponer función)
  window.__refreshEventCards = initEventCards;
})();