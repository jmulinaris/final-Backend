import fs from "fs";

class ContenedorArchivo {
    constructor (file){
        this.file = file;
    }

//* Buscar todos
    async getAll(){
        try {
            const objs = await fs.promises.readFile(this.file, "utf-8");
            const objsParse = JSON.parse(objs);
            return objsParse;
        } catch (e){
            throw new Error (`Error al listar todos: ${e}`);
        }
    }

//* Buscar por ID
    async getById(id) {
        try {
        const objects = await fs.promises.readFile(this.file, "utf-8");
        const objectsParse = JSON.parse(objects);
        let found = objectsParse.find((object) => object.id === id);
        if (!found) {
            found = null;
        }
        return found;
        } catch (err) {
            throw new Error (`Error al listar por ID: ${e}`)
        }
    }

//* Crear nuevo
    async save(obj) {
        try {
            const objs = await fs.promises.readFile(this.file, "utf-8");
            const objsParse = JSON.parse(objs);
            const numId = objsParse.length + 1;
            const id = numId.toString();
            const newObj = {id,...obj}
            objsParse.push(newObj);
            const objString = JSON.stringify(objsParse);
            await fs.promises.writeFile(this.file, objString);
            return `${id}`;
        } catch (e) {
            throw new Error (`Error al guardar: ${e}`)
        }
    }

//* Actualizar por ID
    async updateById (elem){
        const { id } = elem;
        try {
            const objs = await fs.promises.readFile(this.file, "utf-8");
            const objsParse = JSON.parse(objs);
            let findItem = objsParse.find((obj) => obj.id === id);
            if (!findItem){
                findItem = null;
            } else {
                const filterItem = objsParse.filter ((obj) => obj.id != id);
                filterItem.push(elem)
                const objString = JSON.stringify(filterItem);
                await fs.promises.writeFile(this.file, objString);
            }
            return findItem;
        } catch (e) {
            throw new Error (`Error al actualizar: ${e}`)
        }
    }

//* Borrar por ID
    async deleteById(id){
        try {
            const objs = await fs.promises.readFile(this.file, "utf-8");
            const objsParse = JSON.parse(objs);
            let found = objsParse.find((obj) => (obj.id) === id)
            if (!found) {
                found = null;
            } else {
                const filterItem = objsParse.filter ((obj) => obj.id != id);
                const objString = JSON.stringify(filterItem);
                await fs.promises.writeFile(this.file, objString);
            }
            return found;
        } catch (e){
            throw new Error (`Error al eliminar: ${e}`)
        }
    }
}

export default ContenedorArchivo;