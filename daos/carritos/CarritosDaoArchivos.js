import fs from "fs";
import contenedorArchivo from "../../contenedores/contenedorArchivo.js";

class carritosDaoArchivos extends contenedorArchivo {
    
    constructor () {
        super("./data/carritos.json")
    }

//* Agregar productos al carrito
async saveProducts(
    id,
    id_prod,
    timestamp,
    name,
    description,
    code,
    thumbnail,
    price,
    stock
    ) 
    {
        try {
            const cars = await fs.promises.readFile(this.file, "utf-8");
            const carsParse = JSON.parse(cars);
            let found = carsParse.find((car) => car.id === id);
            const index = carsParse.indexOf(found);
            const newProduct = {
                id: id_prod,
                timestamp,
                name,
                description,
                code,
                thumbnail,
                price,
                stock,
            };
            carsParse[index].products.push(newProduct);
            const carsString = JSON.stringify(carsParse);
            await fs.promises.writeFile(this.file, carsString);
        } catch (e) {
        console.error(e);
        }
    }

    //* Eliminar por ID
    async deleteProdById(id, id_prod) {
        try {
            const cars = await fs.promises.readFile(this.file, "utf-8");
            let carsParse = JSON.parse(cars);
            let found = carsParse.find((car) => car.id === id);
            const index = carsParse.indexOf(found);
            carsParse[index].products = carsParse[index].products.filter((product) => product.id != id_prod);
            const carsString = JSON.stringify(carsParse);
            await fs.promises.writeFile(this.file, carsString);
        } catch (e) {
            console.error(e);
        }
    }
}


export default carritosDaoArchivos;