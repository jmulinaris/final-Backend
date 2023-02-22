import * as dotenv from "dotenv";
dotenv.config();
const TIPO = process.env.TIPO;

import ProductosDaoArchivos from "./productos/ProductosDaoArchivos.js";
import ProductosDaoMongoDB from "./productos/ProductosDaoMongoDB.js";

import CarritosDaoArchivos from "./carritos/CarritosDaoArchivos.js";
import CarritosDaoMongoDB from "./carritos/CarritosDaoMongoDB.js";

import MensajesDaoMongoDB from "./mensajes/MensajesDaoMongoDB.js";

let ProductosDao;
let CarritosDao;
let MensajesDao;

switch (TIPO) {
    case "archivos":
        ProductosDao = new ProductosDaoArchivos();
        CarritosDao = new CarritosDaoArchivos();
    break;
    case "mongoDB":
        ProductosDao = new ProductosDaoMongoDB();
        CarritosDao = new CarritosDaoMongoDB();
        MensajesDao = new MensajesDaoMongoDB();
    break;
}

export { ProductosDao };

export { CarritosDao };

export { MensajesDao };