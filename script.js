const productos = [
    { id: 1, marca: "JBL", precio: 21000 },
    { id: 2, marca: "Sony", precio: 18000 },
    { id: 3, marca: "RCF", precio: 12000 },
    { id: 4, marca: "Dynaudio", precio: 7000 },
    { id: 5, marca: "KEF", precio: 13000 },
    { id: 6, marca: "Ultimate Ears", precio: 15000 },
    { id: 7, marca: "Genius", precio: 16000 },
    { id: 8, marca: "SVS", precio: 11000 },
    { id: 9, marca: "Genelec", precio: 18000 }
]

let carta_productos = JSON.parse(localStorage.getItem("carta_productos")) || []
const productsContainer = document.getElementById("productos")
const carritoContainer = document.getElementById("carrito-container")
const totalSpan = document.getElementById("total")
const vaciarBtn = document.getElementById("vaciar-carrito")

function renderProductos(productsArray) {
    productsArray.forEach(producto => {
        const card = document.createElement("div")
        card.innerHTML = `
            <h3>${producto.marca}</h3>
            <h4>$${producto.precio}</h4>
            <button class="productoAgregar" id="${producto.id}">Agregar</button>
        `
        productsContainer.appendChild(card)
    })
}
renderProductos(productos)

function agregarAlCarrito() {

    const addButtons = document.querySelectorAll(".productoAgregar")
    addButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.currentTarget.id)
            const selectedProduct = productos.find(producto => producto.id === productId)
            carta_productos.push(selectedProduct)
            console.log(carta_productos)
            localStorage.setItem("carta_productos", JSON.stringify(carta_productos))
        })
    })
}
agregarAlCarrito()