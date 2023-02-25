import { Router } from "express";
import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { Users } from "../config/configMongo.js";
import path from "path";
import logger from "../config/log4JS.js";
import authMW from "../middlewares/auth.js";

const homeRouter = new Router();

const port = process.env.APP_PORT;
const host = process.env.APP_HOST;

//* Estrategia de registro
passport.use("signup", new localStrategy ({
    passReqToCallback: true
}, (req, username, password, done) =>{
    const { name } = req.body;
    const { address } = req.body;
    const { phone } = req.body;
    const phoneBd = `+549${phone}`
    Users.findOne ({ username }, (err, user)=> {
        if (user) return done(null, false);

    Users.create({ username, password: hasPassword (password), name, address, phoneBd}, (err, user) => {
            if (err) return done(err);
            return done(null, user);
        })
    })
}))

//* Estrategia de login
passport.use("login", new localStrategy({}, ( username, password, done) =>{
    Users.findOne({ username }, (err, user)=>{
        if (err) return done(err);
        if (!user) return done(null, false);
        if(!validatePass(password, user.password)) return done(null,false);
        return done(null, user);
    })
}))

//* Encriptación de contraseña
const hasPassword = (pass) =>{
    return bcrypt.hashSync(pass, bcrypt.genSaltSync(10), null);
};

const validatePass = (pass, hashedPass) => {
    return bcrypt.compareSync(pass,hashedPass);
};

//* Almacenar la información
passport.serializeUser((user, done) => {
    done (null, user._id)
})

passport.deserializeUser((id, done)=>{
    Users.findById(id, done);
})

//* Rutas
homeRouter.get("/", (req, res) => {
    if (req.isAuthenticated()){
        res.redirect("/productos");
    } else {
        res.redirect("/login");
    }
});

homeRouter.get("/login", (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect("/productos");
    } else {
        res.render(path.join(process.cwd(), "/public/views/login.ejs"));
    };
});

homeRouter.get("/signup", (req,res) => {
    res.render(path.join(process.cwd(), "/public/views/signup.ejs"), {
        okRegister: "",
    });
})

homeRouter.post("/signup", passport.authenticate("signup", {failureRedirect:"/errorSignUp"}), (req, res, next) => {
    res.render(path.join(process.cwd(), "/public/views/signup.ejs"), {
        okRegister: "¡Usuario registrado con éxito! Puede iniciar sesión",
    });
});

homeRouter.post("/login", passport.authenticate("login", {failureRedirect:"/errorLogin"}), (req, res) => {
    res.redirect("/");
});

homeRouter.get("/logout", (req, res) =>{
    const name = req.user.name;
    req.logout((err) =>{
        if (err) {
            return next (err);
        }
        res.render(path.join(process.cwd(), "/public/views/logout.ejs"), { name: name });
    });
})

homeRouter.get("/errorLogin", (req, res) => {
    res.render(path.join(process.cwd(), "/public/views/errorLogin.ejs"));
})

homeRouter.get("/errorSignUp", (req, res) => {
    res.render(path.join(process.cwd(), "/public/views/errorSignUp.ejs"));
})

//* Extraer id de usuario
homeRouter.get("/idUsuario", (req, res) => {
    const idUsuario = req.user._id;
    res.send(idUsuario);
})


//* Rutas del menú
homeRouter.get("/miCuenta", authMW, (req, res)=> {
    const name = req.user.name;
    const username = req.user.username;
    const phone = req.user.phoneBd;
    const address = req.user.address;
    res.render(path.join(process.cwd(), "/public/views/miCuenta.ejs"), { name: name, email: username, phone: phone, address: address});
});

homeRouter.get("/carrito", authMW, (req, res)=> {
    res.render(path.join(process.cwd(), "/public/views/carrito.ejs"));
});

homeRouter.get("/productos", authMW, (req, res)=> {
    const name = req.user.name;
    res.render(path.join(process.cwd(), "/public/views/productos.ejs"), { name: name });
});

homeRouter.get("/productos/:id", authMW, (req, res) => {
    res.render(path.join(process.cwd(), "/public/views/productDetail.ejs"));
});


//* Rutas inexistentes
homeRouter.all("*", (req, res, next) => {
    logger.warn(`Failed request ${req.method} at ${req.url}`);
    res.render(path.join(process.cwd(), "/public/views/notFound.ejs"));
    next();
});

export default homeRouter;