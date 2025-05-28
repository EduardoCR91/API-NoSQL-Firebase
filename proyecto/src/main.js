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

// Función para asegurar que la navegación sea visible
function asegurarNavegacionVisible() {
  const header = document.querySelector('.header');
  const footer = document.querySelector('footer.tabs');
  const botones = document.querySelectorAll('.tabs button');
  
  if (header) {
    header.style.display = 'block';
    header.style.visibility = 'visible';
    header.style.opacity = '1';
  }
  
  if (footer) {
    footer.style.display = 'flex';
    footer.style.visibility = 'visible';
    footer.style.opacity = '1';
  }
  
  botones.forEach(boton => {
    boton.style.display = 'inline-block';
    boton.style.visibility = 'visible';
    boton.style.opacity = '1';
    boton.style.pointerEvents = 'auto';
  });
  
  console.log('Navegación asegurada como visible');
}

// Función para limpiar el módulo de clima cuando el usuario no está logueado
function limpiarModuloClima() {
  // Limpiar solo el contenedor principal del clima, NO tocar la navegación
  const contenedorPrincipal = document.querySelector('.contenedor');
  if (contenedorPrincipal) {
    contenedorPrincipal.innerHTML = '';
  }
  
  // Ocultar todas las secciones pero no eliminarlas
  const secciones = document.querySelectorAll('.section');
  secciones.forEach(seccion => {
    seccion.style.display = 'none';
  });
  
  // Resetear la variable de control
  moduloClimaInicializado = false;
  
  // Limpiar variables globales del módulo de clima si existen
  if (window.ciudades) delete window.ciudades;
  if (window.mostrarTodasLasCiudades) delete window.mostrarTodasLasCiudades;
  if (window.firebaseDB) delete window.firebaseDB;
  if (window.firebaseAddDoc) delete window.firebaseAddDoc;
  if (window.firebaseCollection) delete window.firebaseCollection;
  if (window.agregarFavorito) delete window.agregarFavorito;
  
  // Asegurar que la navegación siga visible
  setTimeout(asegurarNavegacionVisible, 100);
}

// Función para cargar el módulo de clima cuando el usuario está logueado
async function cargarModuloClima() {
  // Evitar cargar múltiples veces
  if (moduloClimaInicializado) {
    console.log('Módulo de clima ya está inicializado');
    return;
  }

  try {
    // Asegurar que la navegación sea visible antes de cargar
    asegurarNavegacionVisible();
    
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
    
    // Asegurar navegación visible después de la carga
    setTimeout(asegurarNavegacionVisible, 200);
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

// Asegurar navegación visible cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM cargado, asegurando navegación visible');
  asegurarNavegacionVisible();
});

// También asegurar al cargar la ventana
window.addEventListener('load', () => {
  console.log('Ventana cargada, asegurando navegación visible');
  asegurarNavegacionVisible();
});

onAuthStateChanged(auth, (user) => {
  console.log('Estado de autenticación cambió:', user ? 'Logueado' : 'No logueado');
  
  // Asegurar navegación visible primero
  asegurarNavegacionVisible();
  
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
      // Asegurar navegación visible después del login
      setTimeout(asegurarNavegacionVisible, 100);
    }, 100);
  }
});

// Función para forzar redirección después del login (si es necesario)
export function redirigirDespuesDelLogin() {
  cargarModuloClima();
  setTimeout(asegurarNavegacionVisible, 300);
}