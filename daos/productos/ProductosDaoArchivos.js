import ContenedorArchivo from "../../contenedores/contenedorArchivo.js";

class ProductosDaoArchivo extends ContenedorArchivo {
    
    constructor () {
        super("./data/productos.json")
    }

}


export default ProductosDaoArchivo;