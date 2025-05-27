import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseConfig.js';

import { mostrarTodasLasCiudades, ciudades } from './componentes/js/weather.js';
//import  mostrarPerfil from './componentes/perfil.js';
import  mostrarLogout from './componentes/logout.js';
import  mostrarLogin from './componentes/login.js';
import  mostrarRegistro from './componentes/registro.js';
import  mostrarPerfil from './componentes/perfil.js';


function renderMenu(usuario) {
  const menu = document.getElementById("app");
  
  menu.innerHTML = "";

  let botones = [];

  if (usuario) {
    botones = [
      { texto: "Home", fn: mostrarTodasLasCiudades },
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
    mostrarTodasLasCiudades();
  } else {
    mostrarLogin();
  }
});