import mongoose from "mongoose";
import Config from "../config/configDB.js";

await mongoose.connect(Config.mongodb.cnxStr);

class ContenedorMongoDB {
    constructor (collection, schema){
        this.collection = mongoose.model(collection, schema)
    }

    async getAll(){
        try {
            const objetos = await this.collection.find({});
            return objetos;
        } catch (e){
            console.log(`Error al listar todos: ${e}`)
        }
    };

    async getById(id){
        try {
            const find = await this.collection.findOne({_id:id})
            if (find){
                return find;
            } else {
                return "Elemento no encontrado"
            }
        } catch (e){
            console.log(`Error al listar por ID: ${e}`)
        }
    }

    async save(object){
        try {
            await this.collection.create(object)
            const id = await this.collection
                .find({}, ({_id:1}))
                .limit(1)
                .sort({_id: -1})
            return id;
        } catch (e) {
            console.log(`Error al guardar: ${e}`)
        }
    }

    async updateById(elem){
    const {id} = elem;
        try {
            const find = await this.collection.replaceOne({_id:id}, elem)
            return find;
        } catch (e){
            console.log(`Error al actualizar: ${e}`)
        }
    }

    async deleteById(id){
        try {
            const find = await this.collection.find({_id:id})
            if (!find){
                find = null;
            } else {
                await this.collection.deleteOne({_id:id})
            }
            return find;
        } catch (e){
            console.log(`Error al eliminar: ${e}`)
        }
    }
}

export default ContenedorMongoDB;
