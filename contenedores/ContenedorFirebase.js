import admin from "firebase-admin"
import Config from "../config.js"

admin.initializeApp({
    credential: admin.credential.cert(Config.firebase),
})

const db = admin.firestore();

class contenedorFirebase {
    constructor (collectionName){
        this.collection = db.collection(collectionName)
    }

    async getAll(){
        try {
            const query = this.collection;
            const querySnapshot = await query.get();
            const objects = querySnapshot.docs;
            const found = objects.map((obj) => ({id: obj.id, ...obj.data()}))
            return found;
        } catch (e) {
            throw new Error (`Error al listar todos:${e}`);
        }
    }

    async getById(id){
        try {
            const doc = await this.collection.doc(id).get();
            if (!doc.exists){
                throw new Error (`Error al listar por ID: no se encontró`)
            } else {
                const data = doc.data()
                return {...data, id}
            }
        } catch (e){
            throw new Error (e);
        }
    }

    async save(object){
        try {
            await this.collection.add(object)
        } catch (e) {
            throw new Error (`Error al guardar:${e}`);
        }
    }

    async updateById(elem){
    const {id} = elem;
        try {
            const find = await this.collection.doc(id).set(elem)
            return find;
        } catch (e){
            throw new Error (`Error al actualizar:${e}`);
        }
    }

    async deleteById(id){
        try {
            const find = await this.collection.doc(id).get()
            if (!find){
                find = null;
            } else {
                await this.collection.doc(id).delete();
            }
            return find;
        } catch (e) {
            throw new Error (`Error al eliminar:${e}`);
        }
    }
}

export default contenedorFirebase;