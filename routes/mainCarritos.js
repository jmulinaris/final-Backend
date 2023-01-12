import { Router } from "express";
import { CarritosDao } from "../daos/index.js";

const router = Router();

const carrito = CarritosDao;

//* Crear carrito
router.post ("/", async (req,res) =>{
    try {
        const products = [];
        const timestamp = new Date();
        const id_user = `new ObjectId("63beecb292926df5c3822736")`
        await carrito.save({ timestamp, products, id_user });
        res.send(`Se creó el carrito`)
    } catch (e){
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

//* Encontrar carrito del usuario
// router.get("/:user", async (req,res) => {
//     try {
//         const id_user = req.params;
//         let found = await carrito.getUserCart(id_user);
//         console.log(found)
//     } catch (e) {
//         console.log(e);
//     }
// })

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


export default router;