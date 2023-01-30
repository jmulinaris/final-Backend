import { Server as HttpServer } from "http";
import { DBConnect } from "./config/configMongo.js";
import ParseArgs from "minimist";
import cluster from "cluster";
import { cpus } from "os";
import app from "./app.js";
import logger from "./config/configLog4Js.js";

const httpServer = new HttpServer(app);

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