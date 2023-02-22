import ContenedorMongoDB from "../../contenedores/ContenedorMongoDB.js";

class MensajesDaoMongoDB extends ContenedorMongoDB {
    constructor () {
        super ("mensajes", {
            timestamp: {type: Date, required: true},
            id_user: {type: String, required: true},
            type: {type: String, required: true, default: "usuario"},
            message: {type: String, required: true}
        })
    }
}

export default MensajesDaoMongoDB;