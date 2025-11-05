// Validación básica de formulario
const form = document.getElementById("form-contacto");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Gracias por tu mensaje. Te responderemos pronto.");
  form.reset();
});
