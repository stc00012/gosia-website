// Pequeñas interacciones para empezar
document.getElementById('year').textContent = new Date().getFullYear();

const menuBtn = document.getElementById('menuBtn');
const navList = document.getElementById('navList');
menuBtn && menuBtn.addEventListener('click', () => {
  const open = navList.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// Formulario: aquí puedes conectar a un endpoint o a un servicio de formularios
const form = document.getElementById('contactForm');
const result = document.getElementById('formResult');

form && form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  // Por ahora simulamos envío local:
  result.textContent = `Gracias ${data.name || ''}! Mensaje recibido. (Esto es una demo, después conecta a tu backend.)`;
  form.reset();
});