import { Schema } from "mongoose";
import logger from "../../config/configLog4Js.js";
import contenedorMongoDB from "../../contenedores/contenedorMongoDB.js";

const products = new Schema({
    timestamp: {type: Date, required:true},
    id: {type: String, required:true},
    name: {type: String, required:true},
    description: {type: String, required:true},
    code: {type: Number, required:true},
    thumbnail: {type: String, required:true},
    price: {type: Number, required:true},
    stock: {type: Number, required:true}
})

class carritosDaoMongoDB extends contenedorMongoDB {
    constructor(){
        super ("carritos", {
            timestamp: {type: Date, required:true},
            id_user: {type: Object, required: true},
            finalized: {type: Boolean, default: false},
            products: [products]
        })
    }

    async saveProducts(id,id_prod,timestamp,name,description,code,thumbnail,price,stock){
        try {
            const newProduct = {
                id_prod,
                timestamp,
                name,
                description,
                code,
                thumbnail,
                price,
                stock
            }
            await this.collection.findByIdAndUpdate({_id:id}, {$push: {"products":newProduct}})
        } catch(e) {
            logger.error(`Error en DAO Carritos al guardar: ${e}`)
        }
    }

    async deleteProdById(id, id_prod){
        try {
            await this.collection.updateOne({_id:id}, {$pull:{"products":{_id:id_prod}}})
        } catch(e){
            logger.error(`Error en DAO Carritos al eliminar por ID: ${e}`)
        }
    }

    async getUserCart(id_user) {
        try {
            const cart = await this.collection.find({id_user:id_user});
            console.log(`El carrito encontrado es: ${cart}`)
            return cart;
        } catch (e) {
            logger.error(`Error en DAO Carritos al buscar carrito: ${e}`)
        }
    }
}

export default carritosDaoMongoDB;