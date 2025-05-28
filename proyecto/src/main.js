import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebaseConfig.js';
import { addDoc, collection } from 'firebase/firestore';

// Importa los módulos necesarios
import { inicializarNavegacion } from './componentes/js/navegacion.js';
import { inicializarBusqueda } from './componentes/js/busqueda.js';
import { inicializarFavoritos, agregarFavorito } from './componentes/js/favoritos.js';
import { inicializarRegistro } from './componentes/js/registro.js';
import { ciudades, codigosClima, mostrarTodasLasCiudades } from './componentes/js/weather.js';
import { filtrar } from './componentes/js/filtrar.js';
import { mostrarConfiguracion } from './componentes/js/config.js';

function mostrarLogin() {
  // Implementa tu lógica de login aquí
  console.log('Mostrar login');
}

function inicializarApp() {
  // Hacer accesible globalmente
  window.ciudades = ciudades;
  window.mostrarTodasLasCiudades = mostrarTodasLasCiudades;
  window.firebaseDB = db;
  window.firebaseAddDoc = addDoc;
  window.firebaseCollection = collection;
  window.agregarFavorito = agregarFavorito;

  // Inicializar módulos
  inicializarNavegacion();
  inicializarBusqueda();
  inicializarFavoritos();
  inicializarRegistro();
  filtrar();
  mostrarConfiguracion();
}

function cargarCiudadesIniciales() {
  // Cargar ciudades al inicio
  const nombresCiudades = Object.keys(ciudades);
  mostrarTodasLasCiudades(nombresCiudades).catch(error => {
    console.error("Error al mostrar ciudades:", error);
  });
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  inicializarApp();
});

// Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(reg => console.log('Service Worker registrado', reg))
      .catch(err => console.log('Error registrando Service Worker', err));
  });
}

// Manejo de autenticación
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Usuario autenticado:', user.email);
    // Solo cargar ciudades cuando hay un usuario autenticado
    cargarCiudadesIniciales();
  } else {
    console.log('Usuario no autenticado');
    mostrarLogin();
  }
  
});

