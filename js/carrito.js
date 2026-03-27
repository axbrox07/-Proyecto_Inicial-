let productos = []
console.log(productos)
let carta_productos = JSON.parse(localStorage.getItem("carta_productos")) || []
const productsContainer = document.getElementById("productos")
const carritoContainer = document.getElementById("carrito-container")
const totalSpan = document.getElementById("total")

function renderProductos(array) {
    productsContainer.innerHTML =""
    array.forEach(producto => {
        const card = document.createElement("div")
        card.classList.add("producto")
        card.innerHTML = `
            <h3>${producto.marca}</h3>
            <p>$${producto.precio.toLocaleString()}</p>
            <button class="productoAgregar" id="${producto.id}">Agregar al carrito</button>`
        productsContainer.appendChild(card)
    })
    agregarEventosAgregar()
}


function agregarEventosAgregar() {
    const botones = document.querySelectorAll(".productoAgregar")
    botones.forEach(btn => {
        btn.addEventListener("click", (e) => {
            console.log("Carrito actual:", carta_productos)
            const id = parseInt(e.currentTarget.id)
            const productoEnCarrito = carta_productos.find(prod => prod.id === id)
            if (productoEnCarrito) {
                productoEnCarrito.cantidad++
                console.log("Carrito actual:", carta_productos)
            } else {
                const selectedProduct = productos.find(prod => prod.id === id)
                carta_productos.push({
                    ...selectedProduct,
                    cantidad: 1
                })
            }
            actualizarStorage()
            renderCarrito()
            
            const productoseleccionado = productos.find(prod => prod.id ===id)
            Toastify({
                text: `Parlante ${productoseleccionado.marca} agragado al carrito`,
                duration: 2000,
                gravity: "top",
                position: "right",
                style:{
                background: "linear-gradient(to right, #38bd0c, #4a9f1c)",
                }
            }).showToast()
        })
    })
}

function renderCarrito() {
    carritoContainer.innerHTML = ""
    carta_productos.forEach(producto => {
        const div = document.createElement("div")
        div.innerHTML = `
            <h4>${producto.marca}</h4>
            <p>Precio: $${producto.precio}</p>
            <button class="restar" data-id="${producto.id}">-</button>
            <span>${producto.cantidad}</span>
            <button class="sumar" data-id="${producto.id}">+</button>
            <p>Subtotal: $${producto.precio * producto.cantidad}</p>
            <hr>`
        carritoContainer.appendChild(div)
    })
    agregarEventosCantidad()
    actualizarTotal()
}

function agregarEventosCantidad() {
    const botonesSumar = document.querySelectorAll(".sumar")
    const botonesRestar = document.querySelectorAll(".restar")
    botonesSumar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.dataset.id)
            const producto = carta_productos.find(prod => prod.id === id)
            producto.cantidad++
            actualizarStorage()
            renderCarrito()
        })
    })
    botonesRestar.forEach(btn => {
        btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id)
            const producto = carta_productos.find(prod => prod.id === id)
            producto.cantidad--
            if (producto.cantidad === 0) {
                carta_productos = carta_productos.filter(prod => prod.id !== id)
            }
            actualizarStorage()
            renderCarrito()
        })
    })
}

function renderCarrito() {
    carritoContainer.innerHTML = ""
    carta_productos.forEach(producto => {
        const div = document.createElement("div")
        div.innerHTML = `
            <h4>${producto.marca}</h4>
            <p>Precio: $${producto.precio}</p>
            <button class="restar" data-id="${producto.id}">-</button>
            <span>${producto.cantidad}</span>
            <button class="sumar" data-id="${producto.id}">+</button>
            <p>Subtotal: $${producto.precio * producto.cantidad}</p>
            <hr>`
        carritoContainer.appendChild(div)
    })
    agregarEventosCantidad()
    actualizarTotal()
}

function agregarEventosCantidad() {
    const botonesSumar = document.querySelectorAll(".sumar")
    const botonesRestar = document.querySelectorAll(".restar")
    botonesSumar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.dataset.id)
            const producto = carta_productos.find(prod => prod.id === id)
            producto.cantidad++
            actualizarStorage()
            renderCarrito()
        })
    })
    botonesRestar.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const id = parseInt(e.currentTarget.dataset.id)
            const producto = carta_productos.find(prod => prod.id === id)
            producto.cantidad--
            if (producto.cantidad === 0) {
                carta_productos = carta_productos.filter(prod => prod.id !== id)
            }
            actualizarStorage()
            renderCarrito()
        })
    })
}


function actualizarTotal() {
    const total = carta_productos.reduce((acc, producto) => {
        return acc + (producto.precio * producto.cantidad)
    }, 0)
    console.log("total: ",total)
    totalSpan.textContent = total
}
const vaciarBtn = document.getElementById("vaciar-carrito")
const finalizarBtn = document.getElementById("finalizar-compra")

vaciarBtn.addEventListener("click", () => {
    carta_productos = []
    actualizarStorage()
    renderCarrito()
})

finalizarBtn.addEventListener("click", () => {
    const cantidadTotal = carta_productos.reduce((acc, prod) => acc + prod.cantidad, 0)
    if(cantidadTotal === 0){
        Swal.fire("el carrito esta vacio")
        return
    }
    Swal.fire ({
    title: "datos de compra",
    html: `
    <input id = "nombre" class = "swal2-input"placeholder = "nombre">
    <input id = "apellido" class = "swal2-input"placeholder = "apellido">
    <input id = "dni" class = "swal2-input"placeholder = "dni">
    <input id = "email" class = "swal2-input"placeholder = "email">
    <input id = "tarjeta" class = "swal2-input"placeholder = "tarjeta">
    `,
    confirmButtonText: "Comprar",
    preConfirm: () => {
        const nombre = document.getElementById("nombre").value
        const apellido = document.getElementById("apellido").value
        const DNI = document.getElementById("dni").value
        const email = document.getElementById("email").value
        const tarjeta = document.getElementById("tarjeta").value
        if (!nombre || !apellido || !DNI || !email || !tarjeta){
            Swal.showValidationMessage("completa todos los campos")
            return false
        }
        return {nombre}
    }
}).then((result) =>{
    if(result.isConfirmed){
        Swal.fire({
            title: "compra realizada",
            icon: "success",
            text: `Gracias por tu compra, ${result.value.nombre}`,
        })
        carta_productos = []
        actualizarStorage()
        renderCarrito()
        }
    })
})
function actualizarStorage() {
    localStorage.setItem("carta_productos", JSON.stringify(carta_productos))
}
renderProductos(productos)
renderCarrito()
