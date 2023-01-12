
import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super ("productos", {
            timestamp: {type: Date, required:true},
            name: {type:String, required: true},
            description: {type:String, required:true},
            code: {type: Number, required:true},
            thumbnail: {type:String, required: true},
            price: {type:Number, required: true},
            stock: {type:Number, required: true},
        })
    }
}

export default ProductosDaoMongoDB;