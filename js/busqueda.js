export function inicializarBusqueda() {

  const contenedor = document.querySelector('.contenedor');
  
  contenedor.innerHTML = `
    <section id="busqueda" class="section" style="display:none">
    <h2>Buscar ciudad</h2>
    <input id="buscarCiudad" type="text" placeholder="Buscar ciudad">
    <button id="buscarBtn">Buscar</button>
    <div id="ciudadesContainer" class="cards-container"></div>
  </section>
  `;


    const buscarBtn = document.getElementById('buscarBtn');
    if (buscarBtn) {
      buscarBtn.addEventListener('click', buscarCiudad);
    }
  
    const inputBusqueda = document.getElementById('buscarCiudad');
    if (inputBusqueda) {
      inputBusqueda.addEventListener('input', buscarEnTiempoReal);
    }
  
    const filtroClima = document.getElementById('filtroClima');
    if (filtroClima) {
      filtroClima.addEventListener('change', filtrarPorClima);
    }
  }
  
  async function buscarCiudad() {
    const termino = document.getElementById('buscarCiudad').value.toLowerCase();

    await mostrarTodasLasCiudades(Object.keys(ciudades));


    const cards = document.querySelectorAll('.card');
  
    cards.forEach(card => {
      const nombre = card.dataset.nombre || "";
      const estado = card.dataset.estado || "";
      const visible = nombre.includes(termino) || estado.includes(termino);
      card.style.display = visible ? 'block' : 'none';
    });
  }
  
  function buscarEnTiempoReal() {
    const termino = this.value.toLowerCase();
    const cards = document.querySelectorAll('.card');
  
    cards.forEach(card => {
      const nombre = card.dataset.nombre || "";
      const estado = card.dataset.estado || "";
      const visible = nombre.includes(termino) || estado.includes(termino);
      card.style.display = visible ? 'block' : 'none';
    });
  }
  
  function filtrarPorClima() {
    const climaSeleccionado = this.value.toLowerCase();
    const tarjetas = document.querySelectorAll(".card");
  
    tarjetas.forEach(tarjeta => {
      if (climaSeleccionado === "todos") {
        tarjeta.style.display = "block";
      } else {
        const estadoTarjeta = tarjeta.dataset.estado.toLowerCase();
        tarjeta.style.display = estadoTarjeta === climaSeleccionado ? "block" : "none";
      }
    });
  }

 