alert("BIENVENIDO AL SIMULADOR");

const Marcas_Parlantes = ["JBL", "Sony", "RCF", "Dynaudio", "KEF", "Ultimate Ears", "Genius", "SVS", "Genelec"];
const precios = [21000, 18000, 12000, 7000, 13000, 15000, 16000, 11000, 18000];

let total = 0;

function pedirUsuario() {
    let nombre = prompt("Ingrese su nombre de usuario");
    alert("Bienvenido " + nombre + " al simulador de compra de parlantes");
}
pedirUsuario();

function marcas_parlantes() {
    console.log("Productos disponibles:");
    for (let marca of Marcas_Parlantes) {
        console.log(marca);
    }
}
marcas_parlantes();

function mostrar_productos() {
    console.log("Lista de precios:");
    for (let producto of Marcas_Parlantes) {
        let posicion = Marcas_Parlantes.indexOf(producto);
        console.log(producto + " - $" + precios[posicion]);
    }
}
mostrar_productos();


function simuladorCompras() {
    let seguirComprando = true;
    while (seguirComprando) {
        let opcion = prompt("Ingrese el nombre del parlante que desea comprar");
        let encontrado = false;
        for (let producto of Marcas_Parlantes) {
            if (producto.toLowerCase() === opcion.toLowerCase()) {
                let posicion = Marcas_Parlantes.indexOf(producto);
                let cantidad = parseInt(prompt("Ingrese la cantidad de " + producto));
                if (cantidad > 0) {
                    let subtotal = precios[posicion] * cantidad;
                    total += subtotal;
                    alert(
                        "Producto agregado\n" +
                        "Producto: " + producto + "\n" +
                        "Subtotal: $" + subtotal + "\n" +
                        "Total actual: $" + total
                    );
                } else {
                    alert("Cantidad inválida");
                }
                encontrado = true;
                break;
            }
        }
        if (!encontrado) {
            alert("Producto no disponible");
        }
        seguirComprando = confirm("¿Desea agregar otro producto?");
    }
    alert("Gracias por su compra\nTotal a pagar: $" + total);
}
simuladorCompras();
