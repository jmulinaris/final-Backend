const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", require("./routes/productos"));
app.use("/api/carrito", require ("./routes/carritos"))

app.listen(8080, () => {
    console.log("Servidor iniciado");
});