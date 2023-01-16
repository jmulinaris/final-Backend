import ContenedorMemoria from "../../contenedores/CotenedorMemoria.js";

class CarritosDaoMemoria extends ContenedorMemoria {
    saveProducts(id,id_prod,timestamp,name,description,code,thumbnail,price,stock) {
        let found = this.objects.find((car) => car.id === id);
        const index = this.objects.indexOf(found);
        const newProduct = {
            id: id_prod,
            timestamp,
            name,
            description,
            code,
            thumbnail,
            price,
            stock,
        }
        this.objects[index].products.push(newProduct);
    }

    deleteProdById(id, id_prod){
        let found = this.objects.find((car) => car.id === id);
        const index = this.objects.indexOf(found);
        this.objects[index].products = this.objects[index].products.filter((product)=> product.id != id_prod);
    }
}

export default CarritosDaoMemoria;