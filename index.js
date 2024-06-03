
// CALCULADORA DE VIATICOS



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

    let resultado = kilometrosTotales * consumoCombustible();
    console.log(resultado);
    return resultado

}
//declarar todo junto con consumoTotal()


//gasto de peajes

let peajes = Number(prompt("Ingrese el gasto total de peajes. Si no hubo gastos indique 0."))

if (peajes > 0) {
    alert("Su total de peajes es $" + peajes)
} else {
    alert("No tuvo gastos en peajes.")
}

//gasto de alimentos

let alimentos = Number(prompt("Ingrese el gasto total de alimentos. Si no hubo gastos indique 0."))

if (alimentos > 0) {
    alert("Su total de alimentos es $" + alimentos)
} else {
    alert("No tuvo gastos en alimentos.")
}


//suma de consumo, peajes y alimentos.

function viaticos() {
    let resultado = consumoTotal() + peajes + alimentos;
    alert("Su total de viaticos es $" + resultado)
    return resultado;
}

viaticos()