const express = require("express");
const {Router} = express;
const router = Router();

const Api = require("../api/apiProducts")
const productos = new Api("./data/productos.json");

const authAdmin = (req, res, next) => {
    const admin = true;
        if (admin) {
        next();
        } else {
        res
            .status(401)
            .json({ error: -1, description: "unauthorized permission" });
    }
}

//* Listar productos disponibles
router.get("/", async (req, res) =>{
    try {
        products = await productos.getAll();
        return res.send(products)
    } catch (e){
        res.send({error:true})
    }
})

//*Buscar según ID
router.get("/:id", async (req,res) =>{
    try {
        const {id} = req.params;
        let found = await productos.getById(id);
        if (found){
        res.send(found)
        } else {
            res.send({error:"producto no encontrado"})
        }
    } catch (e){
        res.send({error:true})
    }
})

//*Agregar productos al listado
router.post("/", authAdmin, async (req, res) =>{
    try {
        const {name, price, description, codigo, thumbnail, stock} = req.body;
        const id = await productos.save(name, price, description, codigo, thumbnail, stock);
        res.send(`Se agregó el producto: ${name} con ID ${id}`)
    } catch {
        res.send({error:true})
    }
})

//*Actualizar por ID
router.put("/:id", authAdmin, async (req, res) =>{
    try {
        const {id} = req.params;
        const {name, price, description, codigo, thumbnail, stock} = req.body;
        const found = await productos.updateById(id, name, price, description, codigo, thumbnail, stock);
        if (found) {
            res.send(`Se reemplazó el producto con ID ${id} por ${name}`)
        } else {
            res.send({error: "producto no encontrado"})
        }
    } catch (e){
        res.send({error:true})
    }
})

//*Borrar por ID
router.delete("/:id", authAdmin, async (req, res) =>{
    try {
        const {id} = req.params;
        let found = await productos.deleteById(id);
        if (found) {
            res.send(`Se eliminó el producto con ID ${id}`)
        } else {
            res.send({error: "producto no encontrado"})
        }
    } catch (e){
        res.send({error:true})
    }
})


module.exports = router;