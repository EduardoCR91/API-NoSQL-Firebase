import { mostrarTodasLasCiudades, ciudades } from './weather.js';
import { inicializarRegistro } from './registro.js';
import { inicializarBusqueda } from './busqueda.js';
import { filtrar } from './filtrar.js';
import { inicializarFavoritos } from './favoritos.js';
import { mostrarConfiguracion } from './config.js';

export function inicializarNavegacion() {
  console.log('Iniciando navegación...');
  
  // Esperar a que los elementos estén disponibles
  const tabs = document.querySelectorAll('.tabs button[data-target]'); // Solo botones con data-target
  const sections = document.querySelectorAll('.section');
  
  console.log(`Encontrados ${tabs.length} tabs y ${sections.length} secciones`);
  
  if (tabs.length === 0) {
    console.warn('No se encontraron botones de navegación. Reintentando en 500ms...');
    setTimeout(() => inicializarNavegacion(), 500);
    return;
  }

  function mostrarSeccion(id) {
    console.log(`Mostrando sección: ${id}`);
    
    // Oculta todas las secciones visibles
    const todasLasSecciones = document.querySelectorAll('.section');
    todasLasSecciones.forEach(s => s.style.display = 'none');
    
    if (id === 'inicio') {
      const nombresCiudades = Object.keys(ciudades).slice(0, 100);
      mostrarTodasLasCiudades(nombresCiudades).catch(error => {
        console.error('Error al mostrar ciudades:', error);
      });
    } else if (id === 'busqueda') {
      inicializarBusqueda();
    } else if (id === 'filtrarPorClima') {
      filtrar();
    } else if (id === 'favoritos') {
      inicializarFavoritos();
    } else if (id === 'registro') {
      inicializarRegistro();
    } else if (id === 'configuracion') {
      mostrarConfiguracion();
    }

    // Espera un pequeño tiempo para asegurarse de que el contenido se renderizó
    setTimeout(() => {
      const seccionMostrada = document.getElementById(id);
      if (seccionMostrada) {
        seccionMostrada.style.display = 'block';
        console.log(`Sección ${id} mostrada correctamente`);
      } else {
        console.warn(`No se encontró la sección con id: ${id}`);
      }
    }, 10);

    // Actualiza la pestaña activa
    tabs.forEach(t => t.classList.remove('active'));
    const selectedTab = Array.from(tabs).find(t => t.dataset.target === id);
    if (selectedTab) {
      selectedTab.classList.add('active');
      console.log(`Tab ${id} activado`);
    } else {
      console.warn(`No se encontró el tab para: ${id}`);
    }
  }

  function irAInicio() {
    console.log('Volviendo al inicio...');
    mostrarSeccion('inicio');
    const inputBusqueda = document.getElementById('buscarCiudad');
    if (inputBusqueda) inputBusqueda.value = '';
    const filtro = document.getElementById('filtrarPorClima');
    if (filtro) filtro.selectedIndex = 0;
    const resultado = document.getElementById('resultadoClima');
    if (resultado) resultado.innerHTML = '';
  }
  
  // Asignar a window para acceso global
  window.mostrarSeccion = mostrarSeccion;
  window.irAInicio = irAInicio;

  // Limpiar event listeners anteriores para evitar duplicados
  tabs.forEach(tab => {
    if (tab.dataset.target) { // Solo procesar botones con data-target
      // Clonar el elemento para remover todos los event listeners
      const newTab = tab.cloneNode(true);
      tab.parentNode.replaceChild(newTab, tab);
    }
  });

  // Obtener los nuevos elementos después del clonado
  const newTabs = document.querySelectorAll('.tabs button[data-target]');
  
  // Inicializar pestañas con los nuevos elementos
  newTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      console.log(`Click en tab: ${tab.dataset.target}`);
      mostrarSeccion(tab.dataset.target);
    });
  });

  console.log('Event listeners agregados a los tabs');

  // Mostrar la primera pestaña después de un breve delay
  setTimeout(() => {
    if (newTabs.length > 0) {
      console.log('Activando primer tab...');
      newTabs[0].click();
    }
  }, 100);
}