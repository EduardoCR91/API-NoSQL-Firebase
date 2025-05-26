export function mostrarConfiguracion(){
    const contenedor = document.querySelector('.contenedor');
  
    contenedor.innerHTML = `
  <section id="configuracion" class="seccion" style="display:none">
    <h2>Configuración</h2>
    <p>Funcionalidad original: cambio de tema próximamente 🔧</p>
  </section>
    `;
}