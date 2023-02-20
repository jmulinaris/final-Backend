import { Router } from "express";
import { CarritosDao } from "../daos/index.js";
//import authMW from "../middlewares/auth.js";

const router = Router();

const carrito = CarritosDao;

//* Crear carrito
router.post ("/:idUser", async (req,res) =>{
    try {
        const { idUser } = req.params;
        const id_user = idUser;
        // const user = req.user;
        // console.log(user);
        // const email = req.user.username;
        // const address = req.user.address;
        const products = [];
        const timestamp = new Date();
        const id = await carrito.save({ timestamp, products, id_user });
        res.send(id)
    } catch (e){
        res.send({ error:true })
    }
})

//* Eliminar el carrito
router.delete ("/:id", async (req, res) =>{
    try {
        const { id } = req.params;
        let found = await carrito.deleteById(id)
        if (found) {
            res.send("Carrito eliminado")
        } else {
            res.send({error:"Carrito no encontrado"})
        }
    } catch (e){
        res.send({ error:true })
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
            quantity,
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
            quantity,
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

//* Buscar el carrito del usuario
router.get("/idCarrito/:id_user", async (req,res) => {
    try {
        const { id_user } = req.params;
        let found = await carrito.getUserCart(id_user);
        if (found) {
            res.send(found);
        } else {
            res.send({ _id: null });
        }
    } catch (e) {
        res.send({ error: true });
    }
});


export default router;