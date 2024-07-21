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
        Swal.fire("Por favor ingrese un valor válido.");;
        return null;
    }
    return valor;
}

function calcularConsumoCombustible(precioCombustible, kilometrosTotales) {
    let consumoPromedio = 12;
    return (precioCombustible / consumoPromedio) * kilometrosTotales;
}

function mostrarVehiculos() {
    let resultadosAmpliados = document.getElementById("resultadosAmpliados");
    resultadosAmpliados.innerHTML = "";

    vehiculos.forEach((vehiculo, index) => {
        let viaticos = vehiculo.calcularViaticos();
        let vehiculoHTML = `<p>Vehículo ${index + 1}: Gasto de viáticos $${parseInt(viaticos)}</p>`;
        resultadosAmpliados.innerHTML += vehiculoHTML;
    })
}

let map;
let geocoder;
let distanceService;

function initMap() {
    // Inicializa el mapa
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6,
    });

    geocoder = new google.maps.Geocoder();
    distanceService = new google.maps.DistanceMatrixService();

    document.getElementById("calcularBtn").addEventListener("click", () => {
        let direccion1 = document.getElementById("direccion1").value;
        let direccion2 = document.getElementById("direccion2").value;

        if (direccion1 && direccion2) {
            direccion(direccion1, direccion2);
        } else {
            alert("Por favor ingrese ambas direcciones.");
        }
    });
}

function direccion(address1, address2) {
    geocoder.geocode({ address: address1 }, (results, status) => {
        if (status === 'OK') {
            const location1 = results[0].geometry.location;

            geocoder.geocode({ address: address2 }, (results, status) => {
                if (status === 'OK') {
                    const location2 = results[0].geometry.location;
                    calculateDistance(location1, location2);
                } else {
                    alert("No se pudo geocodificar la segunda dirección: " + status);
                }
            });
        } else {
            alert("No se pudo geocodificar la primera dirección: " + status);
        }
    });
}

function calculateDistance(location1, location2) {
    distanceService.getDistanceMatrix({
        origins: [location1],
        destinations: [location2],
        travelMode: 'DRIVING'
    }, (response, status) => {
        if (status === 'OK') {
            const distance = response.rows[0].elements[0].distance.text;
            document.getElementById('resultados').textContent = `La distancia entre las ciudades es de: ${distance}`;
            
            // Mostrar marcadores en el mapa
            new google.maps.Marker({
                position: location1,
                map: map,
                title: 'Dirección 1'
            });

            new google.maps.Marker({
                position: location2,
                map: map,
                title: 'Dirección 2'
            });

            // Centrar el mapa en la distancia calculada
            const bounds = new google.maps.LatLngBounds();
            bounds.extend(location1);
            bounds.extend(location2);
            map.fitBounds(bounds);
        } else {
            alert("Error al calcular la distancia: " + status);
        }
    });
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
        guardarVehiculosEnStorage()
        mostrarVehiculos();
        limpiarInputs();
        Toastify({
            text: "Vehículo agregado",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #3498DB, #1F618D )",
            },
            onClick: function () { } // Callback after click
        }).showToast();
    }
}


function limpiarInputs() {
    document.getElementById("precioCombustible").value = "";
    document.getElementById("kilometrosTotales").value = "";
    document.getElementById("gastoPeajes").value = "";
    document.getElementById("gastoAlimentos").value = "";
    document.getElementById("gastoMantenimiento").value = "";
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
    }
});

document.getElementById("resetBtn").addEventListener("click", () => {
    document.getElementById("precioCombustible").value = "";
    document.getElementById("kilometrosTotales").value = "";
    document.getElementById("gastoPeajes").value = "";
    document.getElementById("gastoAlimentos").value = "";
    document.getElementById("gastoMantenimiento").value = "";
    document.getElementById("resultados").textContent = '';
});

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
    }
    else {
        document.getElementById("resultados").textContent = "No hay vehículos almacenados.";
    }
});
