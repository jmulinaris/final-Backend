class contenedorMemoria {
    constructor () {
        this.objects = [];
    }

    getAll(){
        return this.objects;
    }

    getById(id){
        let object = this.objects.find((obj) => obj.id === id);
        if (!object) {
            object = null;
        }
        return object;
    }

    save(obj){
        const numId = this.objects.length +1;
        const id = numId.toString();
        const newObj = {id:id,...obj}
        this.objects.push(newObj)
        return newObj.id;
    }

    updateById(elem) {
        const { id } = elem;
        let found = this.objects.find((obj) => obj.id === id);
        if (!found) {
            found = null;
        } else {
            const filterObj = this.objects.filter((obj) => obj.id != id);
            filterObj.push(elem);
            this.objects = filterObj;
        }
        return found;
    }

    deleteById(id){
        let found = this.objects.find((obj) => obj.id === id);
        if (!found){
            found = null;
        } else {
            this.objects = this.objects.filter((obj)=> obj.id != id);
        }
        return found;
    }
}

export default contenedorMemoria;