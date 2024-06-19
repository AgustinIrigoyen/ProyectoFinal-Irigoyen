
// CALCULADORA DE VIATICOS

class Vehiculo {
    constructor(consumoTotal, peajes, alimentos, mantenimiento) {
        this.consumoTotal = consumoTotal;
        this.peajes = peajes;
        this.alimentos = alimentos;
        this.mantenimiento = mantenimiento;
    }

    calcularViaticos(){
        return (this.consumoTotal + this.peajes + this.alimentos + this.mantenimiento)
    }
}


//cálculo del precio por kilómetro (consumo de auto promedio 12 km*litro)

function consumoCombustible() {
    let consumoPromedio = 12;
    let precioCombustible;

    precioCombustible = Number(prompt("Ingrese el precio del litro de combustible."));

    while (isNaN(precioCombustible) || (precioCombustible<0)) {
        alert("No es un precio válido.");
        precioCombustible = Number(prompt("Ingrese el precio del litro de combustible."));
    };
    
    let resultado = precioCombustible / consumoPromedio;
    return resultado;
}


//consumo del automovil * kilometros recorridos

function consumoTotal() {
    let kilometrosTotales;

    kilometrosTotales = Number(prompt("Ingrese la cantidad de kilómetros totales recorridos."));

    while (isNaN(kilometrosTotales) || (kilometrosTotales<0)) {
        alert("No es un número válido.");
        kilometrosTotales = Number(prompt("Ingrese la cantidad de kilómetros totales recorridos."))
    };

    let resultado = parseInt(kilometrosTotales * consumoCombustible());
    console.log(resultado);
    return resultado

}
//declarar todo junto con consumoTotal()


//gasto de peajes

function peajes() {
let peajes = Number(prompt("Ingrese el gasto total de peajes. Si no hubo gastos indique 0."))

if (peajes > 0) {
    alert("Su total de peajes es $" + peajes)
} else {
    alert("No tuvo gastos en peajes.")
}
return peajes;
}

//gasto de alimentos

function alimentos(){
let alimentos = Number(prompt("Ingrese el gasto total de alimentos. Si no hubo gastos indique 0."))

if (alimentos > 0) {
    alert("Su total de alimentos es $" + alimentos)
} else {
    alert("No tuvo gastos en alimentos.")
}
return alimentos;
}

function mantenimiento(){
let mantenimiento = Number(prompt("Si tuvo algún gasto de mantenimiento del vehiculo ingreselo, si no hubo ingrese 0."))

if (mantenimiento > 0){
    alert("Su gasto de mantenimiento es $" + mantenimiento)
} else {
    alert("No tuvo gastos de mantenimiento.")
}
return mantenimiento;
}


let vehiculos = [];

function registrarVehiculo() {
    let consumo = consumoTotal();
    let peaje = peajes();
    let comida = alimentos();
    let manten = mantenimiento();

    vehiculos.push(new Vehiculo(consumo, peaje, comida, manten));
    console.log("Vehículo registrado:", vehiculos[vehiculos.length - 1]);
}



function agregarVehiculos() {
    let continuar = true;
    while (continuar) {
        registrarVehiculo();
        let respuesta = prompt("¿Desea agregar otro vehículo? Presione la tecla S para sí, cualquier otra tecla para no.").toUpperCase();
        continuar = respuesta === "S";
    }
    console.log("No se registran más vehículos.");
    viaticosTotales();
}

function viaticosTotales(){
    let viaticos = 0;
    for (const vehiculo of vehiculos){
        viaticos += vehiculo.calcularViaticos()
}
alert ("El gasto total de viáticos para todos los vehículos es de $"+viaticos);
console.log("El gasto total de viáticos para todos los vehículos es de $"+viaticos);
}


agregarVehiculos()
