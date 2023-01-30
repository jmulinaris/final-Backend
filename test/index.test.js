import app from "../app.js";
import request from "supertest";
import { expect } from "chai";

let App = request(app);

describe("Test productos endpoint", () => {
    it ("Should show all the products", async () => {
        let res = await App.get("/api/productos");
        expect(res.status).to.eql(200);
    });
    it ("Should create a new product", async () => {
        let product = {
            name: "empanadas de pollo",
            description:"6 unidades",
            price: 500,
            code: 104,
            thumbnail: "la foto",
            stock: 20
        };
        let res = await App.post("/api/productos").send(product);
        expect(res.status).to.eql(200);
    });
    it ("Should update product 63d7d83fb85825b99e02eb79", async () => {
        let product = {
            name: "zanahoria",
            description:"zanahoria en cubos",
            price: 500,
            code: 104,
            thumbnail: "la foto",
            stock: 20
        };
        let res = await App.put("/api/productos/63d7d83fb85825b99e02eb79").send(product);
        expect(res.status).to.eql(200);
    });
    it ("Should delete product 63d7d83fb85825b99e02eb79", async () => {
        let res = await App.delete("/api/productos/63d7d83fb85825b99e02eb79");
        expect(res.status).to.eql(200);
    });
});