import express from "express";
import session from "express-session";
import path from "path";
import MongoStore from "connect-mongo";
import homeRouter from "./routes/home.js";
import passport from "passport";
import * as dotenv from "dotenv";
import mainProductos from "./routes/mainProductos.js"
import mainCarritos from "./routes/mainCarritos.js"
import chatRouter from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join("public")));

app.set("views", "./views");
app.set("view engine", "ejs");


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
app.use("/api/productos", mainProductos);
app.use("/api/carrito", mainCarritos);
app.use("/chat", chatRouter);
app.use(homeRouter);

export default app;
