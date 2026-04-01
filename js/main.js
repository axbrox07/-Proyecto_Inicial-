let productos = []
let carta_productos = JSON.parse(localStorage.getItem("carta_productos")) || []
const productsContainer = document.getElementById("productos")

async function cargarProductos(){
    try{
        const response = await fetch("db/data.json")
        if(!response.ok){
            throw new Error("Error al cargar el Json")
            
        }
        const data = await response.json()
        productos = data
        renderProductos(productos)
    }catch(error){
        console.error("Hubo un ERROR", error)
    }finally{
        console.log("proceso de carga finalizado")
    }
    
}
cargarProductos()

function renderProductos(array) {
    productsContainer.innerHTML =""
    array.forEach(producto => {
        const card = document.createElement("div")
        card.classList.add("producto")
        card.innerHTML = `
            <img src="${producto.imagen}" class="producto-img"></img>
            <h3>${producto.marca}</h3>
            <p>$${producto.precio.toLocaleString()}</p>
            <button class="productoAgregar" id="${producto.id}">Agregar al carrito</button>`
        productsContainer.appendChild(card)
        console.log(producto.imagen)
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
cargarProductos()
renderCarrito()
