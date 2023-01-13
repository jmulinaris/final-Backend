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

let ProductosDao;
let CarritosDao;

switch (TIPO) {
    case "archivos":
        ProductosDao = new productosDaoArchivos();
        CarritosDao = new carritosDaoArchivos();
    break;
    case "memoria":
        ProductosDao = new productosDaoMemoria();
        CarritosDao = new carritosDaoMemoria();
    break;
    case "mongoDB":
        ProductosDao = new productosDaoMongoDB();
        CarritosDao = new carritosDaoMongoDB();
    break;
    case "firebase":
        ProductosDao = new productosDaoFirebase();
        CarritosDao = new carritosDaoFirebase();
    break;
}

export { ProductosDao };

export { CarritosDao };
