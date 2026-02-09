
alert("BIENVENIDO AL SIMULADOR")

const Marca_Parlantes = ["JBL, Sony, RCF, Dynaudio, KEF, Ultimate Ears, Genius, SVS, Genelec"]

const productos = [
    { nombre: "JBL", precio: 21000 },
    { nombre: "Sony", precio: 18000 },
    { nombre: "RCF", precio: 12000 },
    { nombre: "Dynaudio", precio: 7000},
    { nombre: "KEF", precio: 13000},
    { nombre : "Ultimate Ears", precio: 15000},
    { nombre : "Genius", precio: 16000},
    { nombre : "SVS", precio: 11000},
    { nombre : "Genelec", precio: 18000},
];

function Pedirusuario(){
    let nombre = prompt("Bienvenido/a al simulador, por favor ingrese su nombre de usuario: ")
    return nombre
}
Pedirusuario()

function muestra_parlantes(){
    console.log("Bienvenido a nuestra tienda, estos son todos los productos que tenemos disponibles para vos")
    console.log(Marca_Parlantes)
}
muestra_parlantes()

