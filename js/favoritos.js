import { obtenerClima, clasificarClima, ciudades } from './weather.js';

export function inicializarFavoritos() {
  mostrarFavoritos();
}

export function agregarFavorito(ciudad) {
  // Validación adicional
  if (!ciudad || typeof ciudad !== 'string' || ciudad.trim() === '') {
    console.error('Intento de agregar favorito inválido:', ciudad);
    return;
  }

  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  
  // Filtra posibles nulls existentes y duplicados
  favoritos = favoritos.filter(item => item !== null && item !== ciudad);
  
  favoritos.push(ciudad);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  mostrarFavoritos();
}

export async function mostrarFavoritos() {

  const contenedorPrincipal = document.querySelector('.contenedor');

  contenedorPrincipal.innerHTML = ``;

  contenedorPrincipal.innerHTML = `
    <section id="favoritos" class="section" style="display:none">
    <h2>Favoritos</h2>
    <ul id="listaFavoritos"></ul>
    <p id="listaF></p>
  </section>`;

  const contenedor = document.getElementById('listaFavoritos');
  if (!contenedor) return;

  const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

  if (favoritos.length === 0) {
    contenedor.innerHTML = "<p>No hay ciudades favoritas aún 💔</p>";
    return;
  }

  contenedor.innerHTML = '<div class="favoritos-container" id="favoritosCards"></div>';

  await mostrarCardsFavoritos(favoritos);

  console.log("Contenido del JSON: ", favoritos);
}


async function mostrarCardsFavoritos(ciudadesFavoritas) {
  const contenedor = document.getElementById('favoritosCards');
  contenedor.innerHTML = '<p>Cargando tus ciudades favoritas...</p>';

  const cards = await Promise.all(ciudadesFavoritas.map(async ciudad => {
    if (!ciudades[ciudad]) {
      return `
      <div class="card error">
        <p>${ciudad} - Datos no disponibles</p>
        <button class="btn-eliminar" data-ciudad="${encodeURIComponent(ciudad)}">❌ Eliminar</button>
      </div>`;
    }

    try {
      const datos = await obtenerClima(ciudad);
      const climaClasificado = clasificarClima(datos.estadoClima);
      
      return `
        <div class="card ${datos.estadoClima.toLowerCase()}" data-nombre="${ciudad.toLowerCase()}" data-estado="${climaClasificado}">
          <video class="bg-video" autoplay muted loop playsinline>
            <source src="videos/${datos.estadoClima.toLowerCase()}.mp4" type="video/mp4">
          </video>
          <div class="card-content">
            <h3>${ciudad}</h3>
            <p>${datos.temperatura}°C</p>
            <p>${datos.estadoClima.toLowerCase()}</p>
            <p>${datos.tiempoActual}</p>
            <button class="btn-eliminar" data-ciudad="${encodeURIComponent(ciudad)}">❌ Eliminar</button>
          </div>
        </div>
      `;
    } catch (error) {
      return `<div class="card error">
        <p>Error cargando ${ciudad}</p>
        <button class="btn-eliminar" data-ciudad="${encodeURIComponent(ciudad)}">❌ Eliminar</button>
      </div>`;
    }
  }));

  contenedor.innerHTML = cards.join('');

  // Agregar eventos a los botones de eliminar
  document.querySelectorAll('.btn-eliminar').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const ciudad = decodeURIComponent(e.target.dataset.ciudad);
      eliminarFavorito(ciudad);
    });
  });
}

function eliminarFavorito(ciudad) {
  let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
  favoritos = favoritos.filter(c => c !== ciudad);
  localStorage.setItem('favoritos', JSON.stringify(favoritos));
  mostrarFavoritos();
}


