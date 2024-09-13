// CALCULADORA DE VIATICOS

class Vehiculo {
    constructor(consumoTotal, peajes, alimentos, mantenimiento) {
        this.consumoTotal = consumoTotal;
        this.peajes = peajes;
        this.alimentos = alimentos;
        this.mantenimiento = mantenimiento;
    }

    calcularViaticos() {
        return this.consumoTotal + this.peajes + this.alimentos + this.mantenimiento;
    }
}

let vehiculos = [];

// Guardar vehículos en el almacenamiento de sesión
function guardarVehiculosEnStorage() {
    let vehiculosJson = JSON.stringify(vehiculos);
    sessionStorage.setItem("vehiculoReparado", vehiculosJson);
}

// Cargar vehículos desde el almacenamiento de sesión
function cargarVehiculosDesdeStorage() {
    let vehiculosJson = sessionStorage.getItem("vehiculoReparado");
    if (vehiculosJson) {
        vehiculos = JSON.parse(vehiculosJson);
        mostrarVehiculos();
    }
}

// Obtener valor de un input
function obtenerValorInput(id) {
    let valor = Number(document.getElementById(id).value);
    if (isNaN(valor) || valor < 0) {
        Swal.fire({
            title: "Por favor ingrese un valor válido.",
            confirmButtonColor: "#0e6efd"
        });
        return null;
    }
    return valor;
}

// Calcular el consumo de combustible
function calcularConsumoCombustible(precioCombustible, kilometrosTotales) {
    const consumoPromedio = 12; // Consumo promedio en km/litro
    return (precioCombustible / consumoPromedio) * kilometrosTotales;
}

// Mostrar vehículos
function mostrarVehiculos() {
    let resultadosAmpliados = document.getElementById("resultadosAmpliados");
    resultadosAmpliados.innerHTML = "";

    vehiculos.forEach((vehiculo, index) => {
        let viaticos = vehiculo.calcularViaticos();
        let vehiculoHTML = `<p>Vehículo ${index + 1}: Gasto de viáticos $${parseInt(viaticos)}</p>`;
        resultadosAmpliados.innerHTML += vehiculoHTML;
    });
}

// Limpiar los campos de entrada
function limpiarInputs() {
    document.getElementById("precioCombustible").value = "";
    document.getElementById("kilometrosTotales").value = "";
    document.getElementById("gastoPeajes").value = "";
    document.getElementById("gastoAlimentos").value = "";
    document.getElementById("gastoMantenimiento").value = "";
}

// Registrar un vehículo
function registrarVehiculo() {
    const precioCombustible = obtenerValorInput("precioCombustible");
    const kilometrosTotales = obtenerValorInput("kilometrosTotales");
    const peajes = obtenerValorInput("gastoPeajes");
    const alimentos = obtenerValorInput("gastoAlimentos");
    const mantenimiento = obtenerValorInput("gastoMantenimiento");

    if (precioCombustible !== null && kilometrosTotales !== null && peajes !== null && alimentos !== null && mantenimiento !== null) {
        const consumoTotal = calcularConsumoCombustible(precioCombustible, kilometrosTotales);
        const vehiculo = new Vehiculo(consumoTotal, peajes, alimentos, mantenimiento);
        vehiculos.push(vehiculo);
        guardarVehiculosEnStorage();
        mostrarVehiculos();
        limpiarInputs();
        Toastify({
            text: "Vehículo agregado",
            duration: 2000,
            close: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #3498DB, #1F618D )",
            }
        }).showToast();
    }
}

// Calcular y mostrar viáticos
document.getElementById("calcularBtn1").addEventListener("click", () => {
    const precioCombustible = obtenerValorInput("precioCombustible");
    const kilometrosTotales = obtenerValorInput("kilometrosTotales");
    const peajes = obtenerValorInput("gastoPeajes");
    const alimentos = obtenerValorInput("gastoAlimentos");
    const mantenimiento = obtenerValorInput("gastoMantenimiento");

    if (precioCombustible !== null && kilometrosTotales !== null && peajes !== null && alimentos !== null && mantenimiento !== null) {
        const consumoTotal = calcularConsumoCombustible(precioCombustible, kilometrosTotales);
        const vehiculo = new Vehiculo(consumoTotal, peajes, alimentos, mantenimiento);
        const viaticos = vehiculo.calcularViaticos();

        document.getElementById("resultados").textContent = `El gasto de viáticos de este vehículo es de $${parseInt(viaticos)}`;
        Swal.fire({
            title: `El gasto de viáticos de este vehículo es de $${parseInt(viaticos)}`,
            confirmButtonColor: "#0e6efd"
        });
    }
});

// Limpiar los inputs al hacer clic en el botón reset
document.getElementById("resetBtn").addEventListener("click", limpiarInputs);

// Agregar vehículo al hacer clic en el botón correspondiente
document.getElementById("agregarVehiculoBtn").addEventListener("click", registrarVehiculo);

// Mostrar el último vehículo almacenado
document.getElementById("ultimoVehiculoBtn").addEventListener("click", () => {
    let vehiculosJson = sessionStorage.getItem("vehiculoReparado");
    if (vehiculosJson) {
        let vehiculosGuardados = JSON.parse(vehiculosJson);
        if (vehiculosGuardados.length > 0) {
            let ultimoVehiculo = vehiculosGuardados[vehiculosGuardados.length - 1];
            let viaticos = ultimoVehiculo.consumoTotal + ultimoVehiculo.peajes + ultimoVehiculo.alimentos + ultimoVehiculo.mantenimiento;
            document.getElementById("resultados").textContent = `El gasto de viáticos del último vehículo es de $${parseInt(viaticos)}`;
        }
    } else {
        document.getElementById("resultados").textContent = "No hay vehículos almacenados.";
    }
});

// Inicializar el mapa y el autocompletado de direcciones
let map;
let autocomplete1, autocomplete2;

function initAutocomplete() {
    // Inicializa el autocompletado en los campos de entrada
    autocomplete1 = new google.maps.places.Autocomplete(
        document.getElementById("direccion1"),
        { types: ['(cities)'], componentRestrictions: { country: "ar" } }
    );

    autocomplete2 = new google.maps.places.Autocomplete(
        document.getElementById("direccion2"),
        { types: ['(cities)'], componentRestrictions: { country: "ar" } }
    );

    // Asignar el lugar seleccionado a las variables
    autocomplete1.addListener('place_changed', function() {
        let place1 = autocomplete1.getPlace();
        console.log("Ciudad 1: ", place1);
    });

    autocomplete2.addListener('place_changed', function() {
        let place2 = autocomplete2.getPlace();
        console.log("Ciudad 2: ", place2);
    });
}

// Inicializar el mapa y el autocompletado
function initMap() {
    const geocoder = new google.maps.Geocoder();
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.log("Geolocalización no es soportada por este navegador.");
    }

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.6037, lng: -58.3816 }, // Centro de Buenos Aires como predeterminado
        zoom: 15
    });
    
    directionsRenderer.setMap(map);

    document.getElementById("calcularBtn").addEventListener("click", () => {
        calculateAndDisplayRoute(directionsService, directionsRenderer, geocoder);
    });

    // Inicializar el autocompletado
    initAutocomplete();
}

function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const userLocation = { lat: latitude, lng: longitude };

    map.setCenter(userLocation);

    fetchLocationDetails(latitude, longitude);
}

function error() {
    console.log("No se pudo obtener la ubicación.");
}

function fetchLocationDetails(latitude, longitude) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let infoWindow = new google.maps.InfoWindow({
                content: `Dirección: ${data.display_name}`
            });

            let marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: map,
            });

            marker.addListener('click', function() {
                infoWindow.open(map, marker);
            });
        })
        .catch(error => console.error('Error:', error));
}

function calculateAndDisplayRoute(directionsService, directionsRenderer, geocoder) {
    const address1 = document.getElementById("direccion1").value;
    const address2 = document.getElementById("direccion2").value;

    if (!address1 || !address2) {
        Swal.fire({
            title: "Por favor ingrese ambas ciudades.",
            confirmButtonColor: "#0e6efd"
        });
        return;
    }

    // Solicitar la ruta entre dos direcciones
    directionsService.route(
        {
            origin: address1,
            destination: address2,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
                const route = response.routes[0];

                // Marcar los puntos de inicio y fin
                const originMarker = new google.maps.Marker({
                    position: route.legs[0].start_location,
                    map: map,
                    title: "Punto de partida"
                });

                const destinationMarker = new google.maps.Marker({
                    position: route.legs[0].end_location,
                    map: map,
                    title: "Destino"
                });

                // Calcular la distancia y mostrarla
                const distance = route.legs[0].distance.value / 1000; // Convertir de metros a kilómetros
                const roundedDistance = Math.round(distance);
                document.getElementById("kilometrosTotales").value = roundedDistance;

                Swal.fire({
                    title: `La distancia entre las ciudades es de ${roundedDistance} km.`,
                    confirmButtonColor: "#0e6efd"
                });
            } else {
                Swal.fire({
                    title: "No se pudo calcular la ruta.",
                    text: "Por favor intente con otro nombre.",
                    icon: "error",
                    confirmButtonText: "Volver a intentar",
                    confirmButtonColor: "#0e6efd"
                });
            }
        }
    );
}

// Asegúrate de que initMap se llame cuando el script de Google Maps se cargue
window.initMap = initMap;
