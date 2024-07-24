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

function guardarVehiculosEnStorage() {
    let vehiculosJson = JSON.stringify(vehiculos);
    sessionStorage.setItem("vehiculoReparado", vehiculosJson);
}

function cargarVehiculosDesdeStorage() {
    let vehiculosJson = sessionStorage.getItem("vehiculoReparado");
    if (vehiculosJson) {
        vehiculos = JSON.parse(vehiculosJson);
        mostrarVehiculos();
    }
}

function obtenerValorInput(id) {
    let valor = Number(document.getElementById(id).value);
    if (isNaN(valor) || valor < 0) {
        Swal.fire("Por favor ingrese un valor válido.");
        return null;
    }
    return valor;
}

function calcularConsumoCombustible(precioCombustible, kilometrosTotales) {
    const consumoPromedio = 12; // Consumo promedio en km/litro
    return (precioCombustible / consumoPromedio) * kilometrosTotales;
}

function mostrarVehiculos() {
    let resultadosAmpliados = document.getElementById("resultadosAmpliados");
    resultadosAmpliados.innerHTML = "";

    vehiculos.forEach((vehiculo, index) => {
        let viaticos = vehiculo.calcularViaticos();
        let vehiculoHTML = `<p>Vehículo ${index + 1}: Gasto de viáticos $${parseInt(viaticos)}</p>`;
        resultadosAmpliados.innerHTML += vehiculoHTML;
    });
}
function limpiarInputs() {
    document.getElementById("precioCombustible").value = "";
    document.getElementById("kilometrosTotales").value = "";
    document.getElementById("gastoPeajes").value = "";
    document.getElementById("gastoAlimentos").value = "";
    document.getElementById("gastoMantenimiento").value = "";
}

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
        swal.fire({
        title: `El gasto de viáticos de este vehículo es de $${parseInt(viaticos)}`,
        confirmButtonColor: "#0e6efd",
    })
    }
});

document.getElementById("resetBtn").addEventListener("click", limpiarInputs);

document.getElementById("agregarVehiculoBtn").addEventListener("click", registrarVehiculo);

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

let map;
function initMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.log("Geolocalización no es soportada por este navegador.");
    }
    
        const geocoder = new google.maps.Geocoder();
        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer();
    
    
        document.getElementById("calcularBtn").addEventListener("click", () => {
            calculateAndDisplayRoute(directionsService, directionsRenderer, geocoder);
        });
    }
function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const userLocation = { lat: latitude, lng: longitude };

    map = new google.maps.Map(document.getElementById('map'), {
        center: userLocation,
        zoom: 15
    });

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
                        const distance = route.legs[0].distance.value / 1000;
                        const roundedDistance = Math.round(distance);
                        document.getElementById("kilometrosTotales").value = roundedDistance;
                        Swal.fire({
                            title: `La distancia entre las ciudades es de ${roundedDistance} km.`,
                            confirmButtonColor: "#0e6efd"
                        });
                    } else {
                        Swal.fire({
                            title: "No se pudo calcular la ruta.",
                            text: 'Por favor intente con otro nombre.',
                            icon: 'question',
                            confirmButtonText: 'Volver a intentar',
                            confirmButtonColor: "#0e6efd"
                        });
                    }
                }
            );
        }