import { Schema } from "mongoose";
import logger from "../../config/log4JS.js";
import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";

const products = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
})

class OrdenesDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super ("ordenes", {
            timestamp: { type: Date, required: true},
            products: [products],
            id_user: { type: String, required: true },
            status: { type: String, default: "generada" },
            number: { type: String, required: true }
        })
    }
}

export default OrdenesDaoMongoDB;