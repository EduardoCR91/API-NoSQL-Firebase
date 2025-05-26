export function inicializarRegistro() {

  const contenedor = document.querySelector('.contenedor');
  
  contenedor.innerHTML = `
  <section id="registro" class="section" style="display:none">
    <h2>Registro</h2>
    <form id="formRegistro">
      <input type="text" id="nombre" placeholder="Nombre" required/>
      <input type="email" id="email" placeholder="Correo electrónico" required/>
      <input type="password" id="password" placeholder="Contraseña" required/>
      <input type="text" placeholder="Dirección" required/>
      <input type="text" placeholder="Ciudad" required/>
      <input type="tel" placeholder="Teléfono" required/>
      <input type="date" placeholder="Fecha de nacimiento" required/>
      <button type="submit">Registrarse</button>
    </form>
  </section>
  `;

  document.getElementById('registro').style.display = 'block';


    const formRegistro = document.getElementById('formRegistro');
    if (formRegistro) {
      formRegistro.addEventListener('submit', registrarUsuario);
    }
  }
  
  async function registrarUsuario(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const direccion = document.querySelector("input[placeholder='Dirección']").value;
    const ciudad = document.querySelector("input[placeholder='Ciudad']").value;
    const telefono = document.querySelector("input[placeholder='Teléfono']").value;
    const nacimiento = document.querySelector("input[placeholder='Fecha de nacimiento']").value;
  
    const datos = {
      nombre, email, password, direccion, ciudad, telefono, nacimiento, fechaRegistro: new Date()
    };
  
    try {
      const ref = await window.firebaseAddDoc(
        window.firebaseCollection(window.firebaseDB, "usuarios"),
        datos
      );
      alert("Registro exitoso ✅ ID: " + ref.id);
    } catch (e) {
      console.error("Error al registrar:", e);
      alert("Hubo un error al registrar 😢");
    }
  }