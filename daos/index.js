import * as dotenv from "dotenv";
dotenv.config();
const TIPO = process.env.TIPO;

import ProductosDaoArchivos from "./productos/productosDaoArchivos.js";
import ProductosDaoFirebase from "./productos/productosDaoFirebase.js";
import ProductosDaoMemoria from "./productos/productosDaoMemoria.js";
import ProductosDaoMongoDB from "./productos/productosDaoMongoDB.js";

import CarritosDaoArchivos from "./carritos/carritosDaoArchivos.js";
import CarritosDaoFirebase from "./carritos/carritosDaoFirebase.js";
import CarritosDaoMemoria from "./carritos/carritosDaoMemoria.js";
import CarritosDaoMongoDB from "./carritos/carritosDaoMongoDB.js";

let ProductosDao;
let CarritosDao;

switch (TIPO) {
    case "archivos":
        ProductosDao = new ProductosDaoArchivos();
        CarritosDao = new CarritosDaoArchivos();
    break;
    case "memoria":
        ProductosDao = new ProductosDaoMemoria();
        CarritosDao = new CarritosDaoMemoria();
    break;
    case "mongoDB":
        ProductosDao = new ProductosDaoMongoDB();
        CarritosDao = new CarritosDaoMongoDB();
    break;
    case "firebase":
        ProductosDao = new ProductosDaoFirebase();
        CarritosDao = new CarritosDaoFirebase();
    break;
}

export { ProductosDao };

export { CarritosDao };
