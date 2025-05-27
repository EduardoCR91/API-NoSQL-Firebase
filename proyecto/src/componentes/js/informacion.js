function informacion(){
    const contenedor = document.querySelector(".contenedor")

    contenedor.innerHTML = `
            <div class="fondo-borroso"></div>
    <div class="contenedorInf">
        <h1>Meteo Api</h1>
        <h3>Carlos Eduardo Cruz</h3>
        <img src="storm.png" alt="clima">
        <div class="texto">
            <p>Api con informacion del clima de 34 ciudades</p>
        </div>
       <a href="https://github.com/EduardoCR91">github.com/EduardoCR91 v 1.0.1</a> 
    </div>
    
    `;
}

window.informacion = informacion;