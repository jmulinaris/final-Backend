import { Router } from "express";
import { OrdenesDao } from "../daos/DAOFactory.js";

const orderRouter = Router();

let orders = OrdenesDao;

orderRouter.get("/", (req, res) => {
    const ordenes = orders.getAll()
    res.send(ordenes);
})


export default orderRouter;
