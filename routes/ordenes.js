import { Router } from "express";
import { CarritosDao, OrdenesDao } from "../daos/DAOFactory.js";

const orderRouter = Router();

let orders = OrdenesDao;

orderRouter.get("/", async (req, res) => {
    try {
        const ordenes = await orders.getAll();
        res.send(ordenes);
    } catch (e) {
        res.send({ error: true })
    }
})

orderRouter.post("/:id", async (req, res)=> {
    const { id } = req.params;
    try {
        const timestamp = new Date();
        const id_user = req.user._id;

        let found = await CarritosDao.getById(id);
        const { products } = found

        const total = products.reduce((acc, prod) => acc + (prod.price * prod.quantity), 0)

        const ordenes = await orders.getAll()
        const number = ordenes.length + 1
        
        const orderId = await orders.save({ timestamp, products, id_user, number, total });
        res.send(orderId)
    } catch (e) {
        res.send({ error: true })
    }
});


export default orderRouter;
