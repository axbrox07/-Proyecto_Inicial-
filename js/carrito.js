const carritoContainer = document.getElementById("carrito-container")
const totalSpan = document.getElementById("total")
const vaciarBtn = document.getElementById("vaciar-carrito")
const finalizarBtn = document.getElementById("finalizar-compra")


function renderCarrito() {
    carritoContainer.innerHTML = ""
    cartaProductos.forEach(producto => {
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
            const producto = cartaProductos.find(prod => prod.id === id)
            producto.cantidad++
            actualizarStorage()
            renderCarrito()
        })
    })
    botonesRestar.forEach(btn => {
        btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id)
            const producto = cartaProductos.find(prod => prod.id === id)
            producto.cantidad--
            if (producto.cantidad === 0) {
                cartaProductos = cartaProductos.filter(prod => prod.id !== id)
            }
            actualizarStorage()
            renderCarrito()
        })
    })
}

function actualizarTotal() {
    const total = cartaProductos.reduce((acc, producto) => {
        return acc + (producto.precio * producto.cantidad)
    }, 0)
    console.log("total: ",total)
    totalSpan.textContent = total
}

function actualizarStorage(){
    localStorage.setItem("carritoProductos", JSON.stringify(carritoProductos))
}

vaciarBtn.addEventListener("click", () => {
    cartaProductos = []
    actualizarStorage()
    renderCarrito()
})

finalizarBtn.addEventListener("click", () => {
    const cantidadTotal = cartaProductos.reduce((acc, prod) => acc + prod.cantidad, 0)
    if(cantidadTotal === 0){
        Swal.fire({
            title: "Carrito vacio",
            text: "Agregar al menos 1 producto antes de finalizar la compra",
            icon: "warning",
        })
        return
    }
    mostrarFormularioCompra()
})

function mostrarFormularioCompra(){
    Swal.fire ({
    title: "datos de compra",
    html: `
    <input id = "nombre" class = "swal2-input" type = "text" placeholder = "nombre">
    <input id = "apellido" class = "swal2-input" type = "text" placeholder = "apellido">
    <input id = "dni" class = "swal2-input" type = "number" placeholder = "dni">
    <input id = "email" class = "swal2-input" type = "email" placeholder = "email">
    <input id = "tarjeta" class = "swal2-input" type = "number" placeholder = "tarjeta">
    `,
    confirmButtonText: "Comprar",
    showCancelButton : true,
    cancelButtonText : "Cancelar",
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
        if (!isNaN(parseInt(nombre))){
            Swal.showValidationMessage("El nombre solo puede tener letras")
            return false
        }
        if (!isNaN(parseInt(apellido))){
            Swal.showValidationMessage("El apellido solo puede tener letras")
            return false
        }
        const dniNumero = parseInt(DNI)
        if (dniNumero < 1000000 || dniNumero > 99999999){
            Swal.showValidationMessage("El DNI dene tener entre 7 y 8 digitos")
            return false
        }
        if (!email.includes("@")){
            Swal.showValidationMessage("Ingrese un email valido (ejemplo@gmail.com)")
            return false
        }
        const tarjetaNum = parseInt(tarjeta)
        if (tarjetaNum < 1000000000000000 || tarjetaNum > 9999999999999999){
            Swal.showValidationMessage("La tarjeta debe tener 16 digitos")
            return false
        }
        return {nombre, apellido, DNI, email, tarjeta}
    }
}).then((result) =>{
    if(result.isConfirmed){
        mostrarResumenCompra(result.value)
        }
    })
}
function actualizarStorage() {
    localStorage.setItem("cartaProductos", JSON.stringify(cartaProductos))
}
renderProductos(productos)

function mostrarResumenCompra(datosCliente){
    let detalleProductos =""
    for(let prod of carritoProductos){
        detalleProductos +=`
        <tr>
            <td style="padding:6px;">${prod.marca}</td>
            <td style="padding:6px;">${prod.cantidad}</td>
            <td style="padding:6px;">${prod.precio.toLocaleString()}</td>
            <td style="padding:6px;">${(prod.precio * prod.cantidad).toLocaleString()}</td>
        <tr>`
    }
    let totalCompra = 0
    for(let prod of cartaProductos){
        totalCompra +=  prod.precio * prod.cantidad
        }
    let tarjetaOculta = ""
    let contador = 0
    for (let digito of datosCliente.tarjeta){
        if (contador < 12){
            tarjetaOculta += "*"
        }else{
            tarjetaOculta += digito
        }
        contador++
    }
    Swal.fire({
        title: "¡Compra realizada con éxito!",
        icon: "success",
        html: `
            <h3>Resumen de compra</h3>
            <p><strong>Cliente:</strong> ${datosCliente.nombre} ${datosCliente.apellido}</p>
            <p><strong>DNI:</strong> ${datosCliente.dni}</p>
            <p><strong>Email:</strong> ${datosCliente.email}</p>
            <p><strong>Tarjeta:</strong> ${tarjetaOculta}</p>
            <hr>
            <table style="width:100%; border-collapse:collapse; margin-top:10px; font-size:14px;">
                <thead>
                    <tr style="background:#f0f0f0;">
                        <th style="padding:6px;">Producto</th>
                        <th style="padding:6px;">Cant.</th>
                        <th style="padding:6px;">Precio unit.</th>
                        <th style="padding:6px;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${detalleProductos}
                </tbody>
            </table>
            <hr>
            <h3>Total: $${totalCompra.toLocaleString()}</h3>
        `,
        confirmButtonText: "Cerrar"
    })
    cartaProductos = []
    actualizarStorage()
    renderCarrito()
}
