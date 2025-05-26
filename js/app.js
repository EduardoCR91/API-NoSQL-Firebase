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


document.addEventListener('DOMContentLoaded', () => {
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

  // Inicializar módulos
  inicializarNavegacion();
  agregarFavorito();
  inicializarBusqueda();
  inicializarFavoritos();
  inicializarRegistro();
  filtrar();
  mostrarConfiguracion();

  // Cargar ciudades al inicio
  const nombresCiudades = Object.keys(ciudades).slice(0, 100);
  mostrarTodasLasCiudades(nombresCiudades).catch(error => {
    console.error("Error al mostrar ciudades:", error);
  });
});