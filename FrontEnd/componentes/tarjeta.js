export function crearTarjeta(data) {
  const div = document.createElement('div');
  div.className = 'tarjeta-resultado';

  div.innerHTML = `
    <h3>${data.nombre}</h3>
    <p><strong>Ocupación:</strong> ${data.ocupacion}</p>
    <p><strong>Descripción:</strong> ${data.descripcion}</p>
  `;

  return div;
}
