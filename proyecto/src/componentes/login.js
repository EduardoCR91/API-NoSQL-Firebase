import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig.js'; // Ajusta el path si es diferente
import mostrarRegistro from './registro.js';

export default function mostrarLogin() {
  const app = document.getElementById("app");

  app.innerHTML = `
    <div style="max-width: 400px; margin: auto; padding: 20px;">
      <h2>Iniciar Sesión</h2>
      <input type="email" id="correo" placeholder="Correo electrónico" style="width: 100%; padding: 10px; margin-bottom: 10px;" />
      <input type="password" id="contrasena" placeholder="Contraseña" style="width: 100%; padding: 10px; margin-bottom: 10px;" />
      <button id="btnLogin" style="width: 100%; padding: 10px;">Ingresar</button>
      <div id="mensajeLogin" style="margin-top: 10px; text-align: center; color: blue;"></div>
      <p style="margin-top: 10px; text-align: center;">
        ¿No tienes cuenta?
        <a href="#" id="irRegistro">Regístrate</a>
      </p>
    </div>
  `;

  document.getElementById("btnLogin").addEventListener("click", async () => {
    const correo = document.getElementById("correo").value;
    const contrasena = document.getElementById("contrasena").value;
    const mensajeLogin = document.getElementById("mensajeLogin");
    const btnLogin = document.getElementById("btnLogin");

    if (!correo || !contrasena) {
      mensajeLogin.innerHTML = "Por favor, completa todos los campos";
      mensajeLogin.style.color = "red";
      return;
    }

    btnLogin.disabled = true;
    btnLogin.textContent = "Ingresando...";
    mensajeLogin.innerHTML = "Iniciando sesión...";
    mensajeLogin.style.color = "blue";

    try {
      console.log("🔐 Intentando login...");
      const userCredential = await signInWithEmailAndPassword(auth, correo, contrasena);
      console.log("✅ Login exitoso:", userCredential.user.email);
      
      mensajeLogin.innerHTML = "¡Login exitoso! Cargando aplicación...";
      mensajeLogin.style.color = "green";
      
      // Esperar un momento para que onAuthStateChanged se ejecute
      setTimeout(() => {
        // Si después de 2 segundos no se redirigió, forzar la redirección
        if (document.getElementById("correo")) { // Si aún está en login
          console.log("⚠️ onAuthStateChanged no funcionó, forzando redirección...");
          window.location.reload(); // Forzar recarga de la página
        }
      }, 2000);

    } catch (error) {
      console.error("❌ Error en login:", error);
      btnLogin.disabled = false;
      btnLogin.textContent = "Ingresar";
      
      let errorMessage = "Error al iniciar sesión";
      if (error.code === 'auth/user-not-found') {
        errorMessage = "Usuario no encontrado";
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = "Contraseña incorrecta";
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Email inválido";
      }
      
      mensajeLogin.innerHTML = errorMessage;
      mensajeLogin.style.color = "red";
    }
  });

  document.getElementById("irRegistro").addEventListener("click", (e) => {
    e.preventDefault();
    mostrarRegistro();
  });

  // Agregar evento Enter
  document.getElementById("contrasena").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      document.getElementById("btnLogin").click();
    }
  });
}