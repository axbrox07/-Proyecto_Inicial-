
//alert("BIENVENIDO AL SIMULADOR")

const Marcas_Parlantes = ["JBL, Sony, RCF, Dynaudio, KEF, Ultimate Ears, Genius, SVS, Genelec"]

const productos = [
    { producto: "JBL", precio: 21000 },
    { producto: "Sony", precio: 18000 },
    { producto: "RCF", precio: 12000 },
    { producto: "Dynaudio", precio: 7000},
    { producto: "KEF", precio: 13000},
    { producto : "Ultimate Ears", precio: 15000},
    { producto : "Genius", precio: 16000},
    { producto : "SVS", precio: 11000},
    { producto : "Genelec", precio: 18000},
];
let carrito = []
let total = 0

function pedirUsuario() {
    let nombre = prompt("Ingrese su nombre de usuario");
    alert("Bienvenido " + nombre + " al simulador de compra de parlantes");
    return nombre;
}
pedirUsuario()

function marcas_parlantes(){
    console.log("Bienvenido a nuestra tienda, estos son todos los productos que tenemos disponibles para vos")
    console.log(Marcas_Parlantes)
}
marcas_parlantes()

function mostrar_productos(){
    for(producto of productos){
        console.log(producto)
    }   
}
mostrar_productos()







