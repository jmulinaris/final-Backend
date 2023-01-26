import { Schema } from "mongoose";
import logger from "../../config/configLog4Js.js";
import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";

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

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super ("carritos", {
            timestamp: {type: Date, required:true},
            id_user: {type: String, required: true},
            finalized: {type: Boolean, default: false},
            products: [products]
        })
    }

    //* Agregar producto a un carrito
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

    //* Eliminar producto de un carrito
    async deleteProdById(id, id_prod){
        try {
            await this.collection.updateOne({_id:id}, {$pull:{"products":{_id:id_prod}}})
        } catch(e){
            logger.error(`Error en DAO Carritos al eliminar por ID: ${e}`)
        }
    }

    //* Buscar carrito no finalizado del usuario
    async getUserCart(id) {
        try {
            const cart = await this.collection.findOne({ $and : [{ id_user: id }, { finalized: false }]});
            return cart;
        } catch (e) {
            logger.error(`Error en DAO Carritos al buscar carrito: ${e}`)
        }
    }

    //* Pasar carrito a finalizado
    async updateCart (id) {
        try {
            await this.collection.updateOne({ $and: [{ id_user: id}, { finalized:false }]},
            { $set: { finalized: true } })
        } catch (e) {
            logger.error(`Error en DAO Carritos al actualizar estado: ${e}`)
        }
    }
}

export default CarritosDaoMongoDB;