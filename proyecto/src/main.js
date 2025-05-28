import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig.js';

//import mostrarHome from './componentes/home.js';
//import mostrarOriginal from './componentes/original.js';
import mostrarPerfil from './componentes/perfil.js';
import mostrarLogout from './componentes/logout.js';
import mostrarLogin from './componentes/login.js';
import mostrarRegistro from './componentes/registro.js';

// Función para cargar el módulo de clima cuando el usuario está logueado
async function cargarModuloClima() {
  try {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
      await new Promise(resolve => {
        document.addEventListener('DOMContentLoaded', resolve);
      });
    }
    
    // Importa dinámicamente el módulo de clima
    const { inicializarAplicacionClima } = await import('./componentes/js/app.js');
    inicializarAplicacionClima();
  } catch (error) {
    console.error('Error al cargar el módulo de clima:', error);
  }
}

function renderMenu(usuario) {
  const menu = document.getElementById("menu");
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
  renderMenu(user);
  if (user) {
    // Usuario logueado: cargar módulo de clima y mostrar home
    cargarModuloClima();
  } else {
    // Usuario no logueado: mostrar login
    mostrarLogin();
  }
});