// Función para inicializar el mapa
function initMap() {
    // Crear el mapa y establecer la vista inicial en una coordenada específica con un nivel de zoom de 13
    var map = L.map('map').setView([51.505, -0.09], 13);

    // Añadir un mapa base de OpenStreetMap con la atribución correspondiente
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Intentar obtener la ubicación actual del usuario usando geolocalización
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // Crear un objeto con la posición latitud y longitud del usuario
                var pos = {
                    lat: 9.932047834523768,
                    lng: -84.09876734519723,
                };

                // Colocar un marcador en la ubicación del usuario y mostrar un popup con un mensaje personalizado
                L.marker(pos).addTo(map)
                    .bindPopup('Nuestra tienda').openPopup();

                // Centrar el mapa en la ubicación del usuario con el nivel de zoom especificado
                map.setView(pos, 13);
            },
            function () {
                // Manejar errores si la geolocalización falla o es rechazada por el usuario
                handleLocationError(true, map.getCenter());
            }
        );
    } else {
        // Manejar el caso en que el navegador no soporta geolocalización
        handleLocationError(false, map.getCenter());
    }
}

// Función para manejar errores de geolocalización
function handleLocationError(browserHasGeolocation, pos) {
    // Crear un mensaje de error basado en si la geolocalización es soportada por el navegador
    var message = browserHasGeolocation
        ? "Error: El servicio de geolocalización falló."
        : "Error: Tu navegador no soporta geolocalización.";
    
    // Mostrar el mensaje de error en un popup en la posición especificada
    L.popup()
        .setLatLng(pos)
        .setContent(message)
        .openOn(map);
}

// Llamar a la función para inicializar el mapa cuando la página se haya cargado completamente
window.onload = initMap;
