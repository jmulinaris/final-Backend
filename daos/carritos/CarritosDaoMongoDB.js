import { Schema } from "mongoose";
import logger from "../../config/configLog4Js.js"
import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";

const products = new Schema({
    timestamp: {type: Date, required:true},
    id: {type: String, required:true},
    name: {type: String, required:true},
    description: {type: String, required:true},
    code: {type: Number, required:true},
    thumbnail: {type: String, required:true},
    price: {type: Number, required:true},
    quantity: {type: Number, default: 1},
    stock: {type: Number, required:true}
})

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor(){
        super ("carritos", {
            timestamp: {type: Date, required:true},
            id_user: {type: String, required: true},
            //email: {type: String, required:true},
            //address: {type: String, required: true},
            finalized: {type: Boolean, default: false},
            products: [products]
        })
    }

    async saveProducts(id, id_prod, timestamp, name, description, code, thumbnail, price, quantity, stock){
        try {
            const newProduct = {
                id_prod,
                timestamp,
                name,
                description,
                code,
                thumbnail,
                price,
                quantity,
                stock
            }
            //! aca me trae el carrito pero el id del producto me sale undefined
            // const cart = await this.collection.findOne({_id:id})
            // const { products } = cart;
            // console.log(products);
            // console.log("ID " + id_prod);
            // const find = products.filter((prod) => prod._id === id_prod);
            // console.log(find)
            // if (find) {
                
            // }
            //! opcion
            // console.log(newProduct.id_prod)
            // const find = await this.collection.findById({_id: id}, {products: {}})
            // console.log(find);
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

    async getUserCart(id) {
        try {
            const cart = await this.collection.findOne({ $and : [{ id_user: id }, { finalized: false }]});
            return cart;
        } catch (e) {
            logger.error(`Error en DAO Carritos al buscar carrito: ${e}`)
        }
    }
}

export default CarritosDaoMongoDB;