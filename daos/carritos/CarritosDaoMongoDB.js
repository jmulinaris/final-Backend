import { Schema } from "mongoose";
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
            products: [products],
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
            console.log(e)
        }
    }

    async deleteProdById(id, id_prod){
        try {
            await this.collection.updateOne({_id:id}, {$pull:{"products":{_id:id_prod}}})
        } catch(e){
            console.log(e)
        }
    }
}

export default CarritosDaoMongoDB;