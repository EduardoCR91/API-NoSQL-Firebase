import { mostrarTodasLasCiudades, ciudades } from './weather.js';
import { inicializarRegistro } from './registro.js';
import { inicializarBusqueda } from './busqueda.js';
import { filtrar } from './filtrar.js';
import { inicializarFavoritos } from './favoritos.js';
import { mostrarConfiguracion } from './config.js';


export function inicializarNavegacion() {
    const tabs = document.querySelectorAll('.tabs button');
    const sections = document.querySelectorAll('.section');

  function mostrarSeccion(id) {
  // Oculta todas las secciones visibles
  const todasLasSecciones = document.querySelectorAll('.section');
  todasLasSecciones.forEach(s => s.style.display = 'none');
  
    if (id === 'inicio') {
      const nombresCiudades = Object.keys(ciudades).slice(0, 100); // Hasta 100
      mostrarTodasLasCiudades(nombresCiudades);
    }else  if (id === 'busqueda') {
      inicializarBusqueda();
    }else  if (id === 'filtrarPorClima') {
      filtrar();
    }else  if (id === 'favoritos') {
      inicializarFavoritos();
    }else  if (id === 'registro') {
      inicializarRegistro();
    }else  if (id === 'configuracion') {
      mostrarConfiguracion();
    }

      // Espera un pequeño tiempo para asegurarse de que el contenido se renderizó
  setTimeout(() => {
    const seccionMostrada = document.getElementById(id);
    if (seccionMostrada) {
      seccionMostrada.style.display = 'block';
    }
  }, 0); // Puede ser 10ms o 50ms si hace falta

  // Actualiza la pestaña activa
  tabs.forEach(t => t.classList.remove('active'));
  const selectedTab = Array.from(tabs).find(t => t.dataset.target === id);
  if (selectedTab) selectedTab.classList.add('active');

  }

  function irAInicio() {
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

  // Inicializar pestañas
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mostrarSeccion(tab.dataset.target);
    });
  });

  // Mostrar la primera pestaña
  if (tabs.length > 0) tabs[0].click();
}