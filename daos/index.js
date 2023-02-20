import * as dotenv from "dotenv";
dotenv.config();
const TIPO = process.env.TIPO;

import ProductosDaoArchivos from "./productos/ProductosDaoArchivos.js";
import ProductosDaoMongoDB from "./productos/ProductosDaoMongoDB.js";

import CarritosDaoArchivos from "./carritos/CarritosDaoArchivos.js";
import CarritosDaoMongoDB from "./carritos/CarritosDaoMongoDB.js";

let ProductosDao;
let CarritosDao;

switch (TIPO) {
    case "archivos":
        ProductosDao = new ProductosDaoArchivos();
        CarritosDao = new CarritosDaoArchivos();
    break;
    case "mongoDB":
        ProductosDao = new ProductosDaoMongoDB();
        CarritosDao = new CarritosDaoMongoDB();
    break;
}

export { ProductosDao };

export { CarritosDao };
