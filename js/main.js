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

