import { Router } from "express";
import logger from "../config/configLog4Js.js";
import DAOFactory from "../daos/DAOFactory.js";

const router = Router();

const carrito = DAOFactory.getCarritosDAO();

//* Crear carrito
router.post ("/:idUser", async (req,res) =>{
    try {
        const { idUser } = req.params;
        const id_user = idUser;
        const products = [];
        const timestamp = new Date();
        const newId = await carrito.save({ timestamp, products, id_user });
        res.send(newId)
    } catch (e){
        logger.error(`Error al crear carrito: ${e}`)
    }
})

//* Eliminar el carrito
router.delete ("/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        let found = await carrito.deleteById(id)
        if (found) {
            res.send("Carrito eliminado")
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
            res.send(found);
        } else {
            res.send({ _id:null });
        }
    } catch (e) {
        console.log(e)
        res.send({ error: true });
    }
});


export default router;