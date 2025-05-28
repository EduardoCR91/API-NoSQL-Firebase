import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig.js';

//import mostrarHome from './componentes/home.js';
//import mostrarOriginal from './componentes/original.js';
import mostrarPerfil from './componentes/perfil.js';
import mostrarLogout from './componentes/logout.js';
import mostrarLogin from './componentes/login.js';
import mostrarRegistro from './componentes/registro.js';

// Variable para controlar si el módulo de clima está cargado
let moduloClimaInicializado = false;

// Función para limpiar el módulo de clima cuando el usuario no está logueado
function limpiarModuloClima() {
  // Limpiar el contenedor principal para que no interfiera con login
  const contenedorPrincipal = document.querySelector('.contenedor');
  if (contenedorPrincipal) {
    contenedorPrincipal.innerHTML = '';
  }
  
  // Resetear la variable de control
  moduloClimaInicializado = false;
  
  // Limpiar variables globales del módulo de clima si existen
  if (window.ciudades) delete window.ciudades;
  if (window.mostrarTodasLasCiudades) delete window.mostrarTodasLasCiudades;
  if (window.firebaseDB) delete window.firebaseDB;
  if (window.firebaseAddDoc) delete window.firebaseAddDoc;
  if (window.firebaseCollection) delete window.firebaseCollection;
  if (window.agregarFavorito) delete window.agregarFavorito;
}

// Función para cargar el módulo de clima cuando el usuario está logueado
async function cargarModuloClima() {
  // Evitar cargar múltiples veces
  if (moduloClimaInicializado) {
    console.log('Módulo de clima ya está inicializado');
    return;
  }

  try {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }
    
    // Importa dinámicamente el módulo de clima
    const { inicializarAplicacionClima } = await import('./componentes/js/app.js');
    await inicializarAplicacionClima();
    moduloClimaInicializado = true;
    console.log('Módulo de clima cargado exitosamente');
  } catch (error) {
    console.error('Error al cargar el módulo de clima:', error);
    moduloClimaInicializado = false;
  }
}

function renderMenu(usuario) {
  const menu = document.getElementById("menu");
  if (!menu) {
    console.error('Elemento menu no encontrado');
    return;
  }
  
  menu.innerHTML = "";

  let botones = [];

  if (usuario) {
    botones = [
      { texto: "Perfil", fn: mostrarPerfil },
      { texto: "Logout", fn: mostrarLogout },
    ];
  } else {
    botones = [
      { texto: "Login", fn: mostrarLogin },
      { texto: "Registro", fn: mostrarRegistro },
    ];
  }

  botones.forEach(({ texto, fn }) => {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.onclick = fn;
    menu.appendChild(btn);
  });
}

onAuthStateChanged(auth, (user) => {
  console.log('Estado de autenticación cambió:', user ? 'Logueado' : 'No logueado');
  
  renderMenu(user);
  
  if (user) {
    // Usuario logueado: cargar módulo de clima inmediatamente
    cargarModuloClima();
  } else {
    // Usuario no logueado: limpiar módulo de clima y mostrar login
    limpiarModuloClima();
    
    // Pequeño delay para asegurar que la limpieza se complete
    setTimeout(() => {
      mostrarLogin();
    }, 100);
  }
});

// Función para forzar redirección después del login (si es necesario)
export function redirigirDespuesDelLogin() {
  cargarModuloClima();
}