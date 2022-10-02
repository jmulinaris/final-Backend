const express = require("express");
const dotenv = require ("dotenv");
dotenv.config();

const app = express();

const PORT =  process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", require("./routes/productos"));
app.use("/api/carrito", require ("./routes/carritos"));

app.get("*", (req, res) => {
    const route = req.originalUrl;
    const method = req.method;
    res.status(404).json({
        error: -2,
        descripcion: `Ruta ${route} método ${method} no implementada`,
    });
});

app.post("*", (req, res) => {
    const route = req.originalUrl;
    const method = req.method;
    res.status(404).json({
        error: -2,
        descripcion: `Ruta ${route} método ${method} no implementada`,
    });
});

app.put("*", (req, res) => {
    const route = req.originalUrl;
    const method = req.method;
    res.status(404).json({
        error: -2,
        descripcion: `Ruta ${route} método ${method} no implementada`,
    });
});

app.delete("*", (req, res) => {
    const route = req.originalUrl;
    const method = req.method;
    res.status(404).json({
        error: -2,
        descripcion: `Ruta ${route} método ${method} no implementada`,
    });
});

const server = app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));