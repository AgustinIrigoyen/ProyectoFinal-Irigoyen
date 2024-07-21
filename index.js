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


document.getElementById("calcularBtn").addEventListener("click", () => {
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