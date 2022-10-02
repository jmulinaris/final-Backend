const fs = require ("fs");

class ApiCart {
    constructor (file) {
        this.file = file;
        this.products = [];
        this.date = new Date().toLocaleTimeString()
    }

//* Crea un carrito y devuelve su ID
    async createCart (){
        try {
            const data = await fs.promises.readFile(this.file, "utf-8");
            const carts = JSON.parse(data);
            const id = carts.length + 1;
            const newCart = {
                id:`${id}`,
                timestamp: this.date,
                productos: this.products,
            }
            carts.push(newCart);
            const cartString = JSON.stringify(carts);
            await fs.promises.writeFile(this.file, cartString);
            return newCart.id;
        } catch (e) {
            console.log(e)
        }
    }

//* Vacia el carrito y elimina por ID
    async deleteCart (id){
        try {
            const data = await fs.promises.readFile(this.file, "utf-8");
            const carts = JSON.parse(data);
            let found = carts.find ((cart) => cart.id === id)
            if (!found){
                found = null
            } else {
                let i = carts.findIndex ((cart) => cart.id === id)
                carts[i].productos = [];
                const filterCart = carts.filter((cart) => cart.id != id)
                const stringCart = JSON.stringify(filterCart);
                await fs.promises.writeFile(this.file, stringCart)
            }
            return found;
        } catch (e) {
            console.log(e)
        }
    }

//* Listar productos del carrito según su ID
    async getAll (id){
        try {
            const data = await fs.promises.readFile(this.file, "utf-8");
            const carts = JSON.parse(data);
            let found = carts.find ((cart) => cart.id === id)
            if (!found) {
                found = null;
            } else {
                let i = carts.findIndex((cart) => cart.id === id);
                found = carts[i].productos;
            }
            return found;
        } catch (e) {
            console.log(e)
        }
    }

//* Agregar productos
    async addProduct (id, id_prod, name, price, description, codigo, thumbnail, stock){
        try {
            const data = await fs.promises.readFile(this.file, "utf-8");
            const carts = JSON.parse(data);
            let found = carts.find ((cart) => cart.id === id)
            if (!found) {
                found = null;
            } else {
                const timestamp = new Date().toLocaleString();
                const newProduct = {
                id_prod,
                timestamp,
                name,
                description,
                codigo,
                thumbnail,
                price,
                stock
            }
            found.productos.push(newProduct)
            let i = carts.findIndex((cart) => cart.id === id);
            carts[i].productos.push(newProduct)
            const stringCart = JSON.stringify(carts);
            await fs.promises.writeFile(this.file, stringCart)
            }
            return found;
        } catch (e) {
            console.log(e)
        }
    }

//* Eliminar por ID
    async deleteById (id, id_prod){
        try {
            const data = await fs.promises.readFile(this.file, "utf-8");
            const carts = JSON.parse(data);
            let found = carts.find ((cart) => cart.id === id)
            if (!found) {
                found = null;
            } else {
                let i = carts.findIndex((cart) => cart.id === id)
                let findProduct = carts[i].productos.find(prod => prod.id === id_prod)
                if (findProduct){
                    const filterProduct = carts[i].productos.filter (prod => prod.id != id_prod)
                    const stringCart = JSON.stringify(filterProduct);
                    await fs.promises.writeFile(this.file, stringCart);
                } else {
                    findProduct = null;
                }
                return findProduct;
            }
        } catch (e) {
            console.log(e)
        }
    }
}




module.exports = ApiCart;