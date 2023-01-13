import contenedorArchivo from "../../contenedores/contenedorArchivo.js";

class productosDaoArchivo extends contenedorArchivo {
    
    constructor () {
        super("./data/productos.json")
    }

}


export default productosDaoArchivo;