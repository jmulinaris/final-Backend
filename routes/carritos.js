const express = require("express");
const {Router} = express;
const router = Router();

const ApiCart = require("../api/apiCart")
const carrito = new ApiCart ("./data/carritos.json");

//* Crear carrito
router.post ("/", async (req,res) =>{
    try {
        const productos = [];
        const id = await carrito.createCart(productos);
        res.send(`Se creó el carrito con ID ${id}`)
    } catch {
        res.send({error:true})
    }
})

//* Eliminar el carrito
router.delete ("/:id", async (req, res) =>{
    try {
        const {id} = req.params;
        let found = await carrito.deleteCart(id)
        if (found) {
            res.send(`Se eliminó el carrito con ID ${id}`)
        } else {
            res.send({error:"Carrito no encontrado"})
        }
    } catch {
        res.send({error:true})
    }
})

//* Listar los productos de un carrito
router.get("/:id/productos", async (req, res) =>{
    try {
        const {id} = req.params;
        let found = await carrito.getAll(id);
        if (found) {
            res.send (found)
        } else {
            res.send ({error:"Carrito no encontrado"})
        }
    } catch {
        res.send({error:true})
    }
})

//* Agregar productos al carrito
router.post ("/:id/productos", async (req, res) => {
    try {
        const {id} = req.params;
        const {id_prod, name, price, description, codigo, thumbnail, stock} = req.body;
        let found = await carrito.addProduct(id, id_prod, name, price, description, codigo, thumbnail, stock);
        if (found){
            res.send(`Se agregó el producto: ${name} con ID ${id_prod} al carrito N° ${id}`)
        } else {
            res.send ({error:"Carrito no encontrado"})
        }
    } catch {
        res.send({error:true})
    }
})

//* Eliminar un producto del carrito
router.delete ("/:id/productos/:id_prod", async (req,res) =>{
    try {
        const {id, id_prod} = req.params;
        let found = await carrito.deleteById(id, id_prod)
        if (found){
            res.send(`Se eliminó el producto con ID ${id_prod}`)
        } else {
            res.send({error:"Carrito no encontrado"})
        }
    } catch {
        res.send({error:true})
    }
})


module.exports = router;