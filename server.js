import express from "express";
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import homeRouter from "./routes/home.js";
import { Server as HttpServer } from "http";
import { DBConnect } from "./config/configMongo.js";
import passport from "passport";
import * as dotenv from "dotenv";
import ParseArgs from "minimist";
import cluster from "cluster";
import { cpus } from "os";
import logger from "./config/configLog4Js.js";
import mainProductos from "./routes/mainProductos.js"
import mainCarritos from "./routes/mainCarritos.js"

dotenv.config();

const app = express();
const httpServer = new HttpServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join("public")));

app.set("views", "./views");
app.set("view engine", "ejs");

app.use("/api/productos", mainProductos);
app.use("/api/carrito", mainCarritos);

app.use(
    session({
        store: MongoStore.create({
        mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}.jwfbeyr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
        }),
        secret: "secreto",
        resave: false,
        saveUninitialized: false,
        //ttl: 600000,
        cookie: {
            maxAge: 600000,
        },
    })
);

//*Passport
app.use(passport.initialize());
app.use(passport.session());

//* Rutas
    app.use(homeRouter);

//* Logger para rutas inexistentes
app.all("*", (req, res, next) => {
    logger.warn(`Failed request ${req.method} at ${req.url}`);
    res.send({ error:true }).status(500);
    next();
});

//* Modo como parámetro
const options = {
    alias: {
        m: "MODO",
    },
    default: {
        MODO: "FORK",
    }
}

const argv = process.argv.slice(2);
const { MODO } = ParseArgs(argv, options)
const PORT = process.env.PORT || 8080;

const cpu = cpus().length;

if (MODO == "CLUSTER") {
    if (cluster.isPrimary) {
        logger.info(`Primary: ${process.pid}`);

        //Fork workers
        for (let i = 1; i <= cpu; i++){
        cluster.fork();
        }

        cluster.on("exit", (worker) => {
        console.log(`Worker with PID ${worker.process.pid} DOWN`);
        cluster.fork();
        })
    } else {
        DBConnect (()=> {
        const connectedServer = httpServer.listen(PORT, () => {
        console.log(
            `Servidor http escuchando en el puerto ${PORT} en modo ${MODO} en el worker ${process.pid}`
            );
        });
        connectedServer.on("error", (error) =>
            logger.warn(`Error en servidor ${error}`)
        );
        })
    }
    } else {
    DBConnect (()=> {
        const connectedServer = httpServer.listen(PORT, () => {
        console.log(
            `Servidor http escuchando en el puerto ${PORT} en modo ${MODO}`
        );
        });
        connectedServer.on("error", (error) =>
        logger.warn(`Error en servidor ${error}`)
        );
    })
}

const server = app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${server.address().port}`);
});
server.on('error', (error) => console.log(`Error en servidor ${error}`));