import { Router } from "express";
import { CarritosDao } from "../daos/index.js";

const router = Router();

const carrito = CarritosDao;

//* Crear carrito
router.post ("/", async (req,res) =>{
    try {
        const products = [];
        const timestamp = new Date();
        //const id_user = Users.findOne({ username: username })
        //console.log(id_user);
        //const id_user = req.user._id;
        //const id_user = req.user.username;
        //const id_user = `63c08eae0895049fb0cde635`;
        const newId = await carrito.save({ timestamp, products, id_user });
        res.send(`Se creó el carrito ID ${newId}`)
    } catch (e){
        console.log(e);
        res.send({error:true})
    }
})

//* Eliminar el carrito
router.delete ("/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        let found = await carrito.deleteById(id)
        if (found) {
            res.send(`Se eliminó el carrito con ID ${id}`)
        } else {
            res.send({error:"Carrito no encontrado"})
        }
    } catch (e){
        res.send({error:true})
    }
})

//* Listar los productos de un carrito
router.get("/:id/productos", async (req, res) => {
    try {
        const { id } = req.params;
        let found = await carrito.getById(id);
        if (found) {
            const { products } = found;
            res.send(products);
        } else {
            res.send({ error: "Carrito no encontrado" });
        }
    } catch (e){
        res.send({ error: true });
    }
});

//* Agregar productos al carrito
router.post("/:id/productos", async (req, res) => {
    try {
        const { id } = req.params;
        const {
            id_prod,
            timestamp,
            name,
            description,
            code,
            thumbnail,
            price,
            stock,
        } = req.body;
        await carrito.saveProducts(
            id,
            id_prod,
            timestamp,
            name,
            description,
            code,
            thumbnail,
            price,
            stock
        );
        return res.send("Producto Cargado");
    } catch (e) {
        res.send({ error: true });
    }
});

//* Eliminar un producto del carrito
router.delete("/:id/productos/:id_prod", async (req, res) =>{
    try {
        const { id, id_prod } = req.params;
        await carrito.deleteProdById(id, id_prod);
        res.send("Producto Eliminado");
    } catch (e) {
        res.send({ error: true });
    }
});

//* Encontrar carrito del usuario
router.get("/idCarrito/:id_user", async (req,res) => {
    try {
        const { id_user } = req.params;
        let found = await carrito.getUserCart(id_user);
        if (found) {
            const { _id } = found;
            res.send(_id);
        } else {
            res.send({ _id:null });
        }
    } catch (e) {
        console.log(e)
        res.send({ error: true });
    }
});


export default router;