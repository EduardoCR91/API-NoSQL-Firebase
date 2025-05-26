export const ciudades = {
  "Bogota": { lat: 4.7110, lon: -74.0721 },
  "Nueva York": { lat: 40.7128, lon: -74.0060 },
  "Madrid": { lat: 40.4168, lon: -3.7038 },
  "Tokio": { lat: 35.6762, lon: 139.6503 },
  "Sídney": { lat: -33.8688, lon: 151.2093 },
  "El Cairo": { lat: 30.0444, lon: 31.2357 },
  "París": { lat: 48.8566, lon: 2.3522 },
  "Londres": { lat: 51.5074, lon: -0.1278 },
  "Roma": { lat: 41.9028, lon: 12.4964 },
  "Berlín": { lat: 52.5200, lon: 13.4050 },
  "Moscú": { lat: 55.7558, lon: 37.6173 },
  "Pekín": { lat: 39.9042, lon: 116.4074 },
  "Seúl": { lat: 37.5665, lon: 126.9780 },
  "Bangkok": { lat: 13.7563, lon: 100.5018 },
  "Delhi": { lat: 28.6139, lon: 77.2090 },
  "Estambul": { lat: 41.0082, lon: 28.9784 },
  "Dubái": { lat: 25.2048, lon: 55.2708 },
  "Singapur": { lat: 1.3521, lon: 103.8198 },
  "Hong Kong": { lat: 22.3193, lon: 114.1694 },
  "Toronto": { lat: 43.6510, lon: -79.3470 },
  "Chicago": { lat: 41.8781, lon: -87.6298 },
  "Los Ángeles": { lat: 34.0522, lon: -118.2437 },
  "San Francisco": { lat: 37.7749, lon: -122.4194 },
  "Ciudad de México": { lat: 19.4326, lon: -99.1332 },
  "Buenos Aires": { lat: -34.6037, lon: -58.3816 },
  "Santiago": { lat: -33.4489, lon: -70.6693 },
  "Lima": { lat: -12.0464, lon: -77.0428 },
  "Caracas": { lat: 10.4806, lon: -66.9036 },
  "Quito": { lat: -0.1807, lon: -78.4678 },
  "La Paz": { lat: -16.5000, lon: -68.1500 },
  "Montevideo": { lat: -34.9011, lon: -56.1645 },
  "Asunción": { lat: -25.2637, lon: -57.5759 },
  "Brasilia": { lat: -15.7939, lon: -47.8828 },
  "Río de Janeiro": { lat: -22.9068, lon: -43}
};
  
  export const codigosClima = {
    0: "Despejado",
    1: "Principalmente despejado",
    2: "Parcialmente nublado",
    3: "Nublado",
    45: "Niebla",
    48: "Niebla con escarcha",
    51: "Llovizna-ligera",
    53: "Llovizna-moderada",
    55: "Llovizna-intensa",
    61: "Lluvia-ligera",
    63: "Lluvia-moderada",
    65: "Lluvia-intensa",
    71: "Nevada-ligera",
    73: "Nevada-moderada",
    75: "Nevada intensa",
    80: "Chubascos-ligeros",
    81: "Chubascos-moderados",
    82: "Chubascos-violentos",
    // puedes agregar más si quieres
  };
  
  export async function obtenerClima(nombreCiudad) {
    const { lat, lon } = ciudades[nombreCiudad];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
  
    const temperatura = Math.round(datos.current_weather.temperature);
    const codigo = datos.current_weather.weathercode;
    const tiempoActual = datos.current_weather.time;
    const estadoClima = codigosClima[codigo] ?? "desconocido";
  
    return { temperatura, estadoClima, tiempoActual };
  }
  
  export function clasificarClima(estadoClima) {
    const estado = estadoClima.toLowerCase();
    if (estado.includes("lluvia") || estado.includes("lloviz") || estado.includes("chubasco")) return "lluvia";
    if (estado.includes("nieve")) return "nieve";
    if (estado.includes("nublado") || estado.includes("nublado")) return "nublado";
    if (estado.includes("niebla")) return "niebla";
    if (estado.includes("soleado") || estado.includes("despejado") || estado.includes("claro")) return "soleado";
    return "otros";
  }
  
  export async function mostrarTodasLasCiudades(ciudades) {

    const contenedorMain = document.querySelector('.contenedor');

    contenedorMain.innerHTML = `  
    <section id="inicio" class="section">
      <h2>Clima Actual</h2>
      <div id="infoClima"></div>
      <div id="ciudadesContainer" class="grid-container"></div>
    </section>
    <div id="resultadoClima"></div>`;

    const contenedor = document.getElementById('ciudadesContainer');
    contenedor.innerHTML = '<p>Cargando clima...</p>';
  
    const cards = await Promise.all(ciudades.map(async ciudad => {
      const datos = await obtenerClima(ciudad);
      const climaClasificado = clasificarClima(datos.estadoClima);
      return `
        <div class="card ${datos.estadoClima.toLowerCase()}" data-nombre="${ciudad.toLowerCase()}" data-estado="${climaClasificado}">
          <video class="bg-video" autoplay muted loop playsinline>
            <source src="videos/${datos.estadoClima.toLowerCase()}.mp4" type="video/mp4">
          </video>
          <h3>${ciudad}</h3>
          <p>${datos.temperatura}°C</p>
          <p>${datos.estadoClima.toLowerCase()}</p>
          <p>${datos.tiempoActual.replace("T"," Time: ")}</p>
          <button onclick='agregarFavorito("${ciudad}")'>💛 Agregar a favoritos</button>
        </div>
      `;
    }));
  
    contenedor.innerHTML = cards.join('');
  }