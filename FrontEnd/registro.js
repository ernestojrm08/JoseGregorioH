// registro.js
const form = document.getElementById('registroForm');
const mensaje = document.getElementById('mensaje');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  try {
    const res = await fetch('http://localhost:3000/registrar', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    mensaje.textContent = data.message;
    mensaje.style.color = 'green';
    form.reset();
  } catch (err) {
    console.error(err);
    mensaje.textContent = 'Ocurrió un error al registrar.';
    mensaje.style.color = 'red';
  }
});
