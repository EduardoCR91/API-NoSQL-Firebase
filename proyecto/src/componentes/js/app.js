// Importa los módulos de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// Importa los módulos necesarios
import { inicializarNavegacion } from './navegacion.js';
import { inicializarBusqueda } from './busqueda.js';
import { inicializarFavoritos, agregarFavorito } from './favoritos.js';
import { inicializarRegistro } from './registro.js';
import { ciudades, codigosClima, mostrarTodasLasCiudades } from './weather.js';
import { filtrar } from './filtrar.js';
import { mostrarConfiguracion } from './config.js';

// Variable para controlar si ya se inicializó
let yaInicializado = false;

export async function inicializarAplicacionClima() {
  // Evitar inicializar múltiples veces
  if (yaInicializado) {
    console.log('La aplicación de clima ya está inicializada');
    return;
  }

  // Esperar a que el DOM esté completamente listo
  await esperarDOM();

  // Configuración de Firebase
  const firebaseConfig = {
    apiKey: "AIzaSyB1XBJlbdm3QFBU18cUbmfCO4wnImIXTjE",
    authDomain: "weather-aa2ba.firebaseapp.com",
    projectId: "weather-aa2ba",
    storageBucket: "weather-aa2ba.appspot.com",
    messagingSenderId: "355646859576",
    appId: "1:355646859576:web:8a8e7420b1056293edf9cd"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Hacer accesible globalmente
  window.ciudades = ciudades;
  window.mostrarTodasLasCiudades = mostrarTodasLasCiudades;
  window.firebaseDB = db;
  window.firebaseAddDoc = addDoc;
  window.firebaseCollection = collection;
  window.agregarFavorito = agregarFavorito;

  // Esperar un poco más para asegurar que todos los elementos estén en el DOM
  await new Promise(resolve => setTimeout(resolve, 100));

  try {
    // Inicializar módulos en orden específico
    console.log('Inicializando navegación...');
    inicializarNavegacion();
    
    console.log('Inicializando otros módulos...');
    inicializarBusqueda();
    inicializarFavoritos();
    inicializarRegistro();
    filtrar();
    mostrarConfiguracion();

    // Cargar ciudades al inicio
    const nombresCiudades = Object.keys(ciudades).slice(0, 100);
    await mostrarTodasLasCiudades(nombresCiudades);

    yaInicializado = true;
    console.log('Aplicación de clima inicializada correctamente');
  } catch (error) {
    console.error('Error durante la inicialización:', error);
    yaInicializado = false;
  }
}

// Función auxiliar para esperar a que el DOM esté listo
function esperarDOM() {
  return new Promise((resolve) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', resolve);
    } else {
      resolve();
    }
  });
}