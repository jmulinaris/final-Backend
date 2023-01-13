import contenedorFirebase from "../../contenedores/ContenedorFirebase.js";

class productosDaoFirebase extends contenedorFirebase {
    constructor(){
        super("productos");
    }
}

export default productosDaoFirebase;