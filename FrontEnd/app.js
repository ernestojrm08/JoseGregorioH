import { crearTarjeta } from './componentes/tarjeta.js';
import { mostrarLoader, ocultarLoader } from './componentes/loader.js';

const searchInput = document.getElementById('searchInput');
const resultadosContainer = document.getElementById('resultados');
const loader = document.getElementById('loader');

// Evento: al escribir en el buscador
searchInput.addEventListener('input', async (e) => {
  const termino = e.target.value.trim().toLowerCase();

  if (termino.length === 0) {
    resultadosContainer.innerHTML = '';
    return;
  }

  mostrarLoader(loader);

  try {
    const res = await fetch('data.json'); // Simula llamada a la API
    const datos = await res.json();

    const filtrados = datos.filter(item =>
      item.nombre.toLowerCase().includes(termino)
    );

    resultadosContainer.innerHTML = '';

    if (filtrados.length === 0) {
      resultadosContainer.innerHTML = '<p>No se encontraron resultados.</p>';
    } else {
      filtrados.forEach(dato => {
        const tarjeta = crearTarjeta(dato);
        resultadosContainer.appendChild(tarjeta);
      });
    }
  } catch (err) {
    console.error('Error al cargar los datos:', err);
    resultadosContainer.innerHTML = '<p>Error al cargar resultados.</p>';
  }

  ocultarLoader(loader);
});
