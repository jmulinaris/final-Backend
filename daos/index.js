import * as dotenv from "dotenv";
dotenv.config();
const TIPO = process.env.TIPO;

import productosDaoArchivos from "./productos/productosDaoArchivos.js";
import productosDaoFirebase from "./productos/productosDaoFirebase.js";
import productosDaoMemoria from "./productos/productosDaoMemoria.js";
import productosDaoMongoDB from "./productos/productosDaoMongoDB.js";

import carritosDaoArchivos from "./carritos/carritosDaoArchivos.js";
import carritosDaoFirebase from "./carritos/carritosDaoFirebase.js";
import carritosDaoMemoria from "./carritos/carritosDaoMemoria.js";
import carritosDaoMongoDB from "./carritos/carritosDaoMongoDB.js";

let productosDao;
let carritosDao;

switch (TIPO) {
    case "archivos":
        productosDao = new productosDaoArchivos();
        carritosDao = new carritosDaoArchivos();
    break;
    case "memoria":
        productosDao = new productosDaoMemoria();
        carritosDao = new carritosDaoMemoria();
    break;
    case "mongoDB":
        productosDao = new productosDaoMongoDB();
        carritosDao = new carritosDaoMongoDB();
    break;
    case "firebase":
        productosDao = new productosDaoFirebase();
        carritosDao = new carritosDaoFirebase();
    break;
}

export { productosDao };

export { carritosDao };
