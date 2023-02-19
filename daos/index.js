import * as dotenv from "dotenv";
dotenv.config();
const TIPO = process.env.TIPO;

import ProductosDaoArchivos from "./productos/ProductosDaoArchivos.js";
import ProductosDaoFirebase from "./productos/ProductosDaoFirebase.js";
import ProductosDaoMemoria from "./productos/ProductosDaoMemoria.js";
import ProductosDaoMongoDB from "./productos/ProductosDaoMongoDB.js";

import CarritosDaoArchivos from "./carritos/CarritosDaoArchivos.js";
import CarritosDaoFirebase from "./carritos/CarritosDaoFirebase.js";
import CarritosDaoMemoria from "./carritos/CarritosDaoMemoria.js";
import CarritosDaoMongoDB from "./carritos/CarritosDaoMongoDB.js";

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
