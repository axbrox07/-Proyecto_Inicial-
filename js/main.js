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

Swal.fire("SweetAlert2 is working!");

Toastify({
    text: "Producto Agregado",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
    background: "linear-gradient(to right, #099282, #000000)",
    },
    onClick: function(){} // Callback after click
}).showToast();
