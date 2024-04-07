/* File Storage para Sessions */

/* npm i session-file-store */
/* npm i connect-mongo */

import express from "express";
import session from "express-session";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";

const fileStore = FileStore(session);
const app = express();
const PUERTO = 8080;

app.use(session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,//Aunque este vacia, crea la sesion igual
/*     store: new fileStore({
        path: "./src/sessions",
        ttl: 100000,//time to live, segundos
        retries: 1
    }) //Crea archivos locales*/
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://santiribot79:coderhouse@cluster0.dxp69gq.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 100000
    })
}));

app.get("/", (req, res) => {
    res.send("Funcionando!!");
});

function auth(req, res, next) {
    if(req.session.admin === true) {
        return next();
    }
    return res.status(403).send("Error de autenticacion");
}

app.get("/session", (req, res) => {

    if(req.session.counter) {
        req.session.counter++;
        res.send(`Visitaste este sitio ${req.session.counter} veces`);
    }else{
        req.session.counter = 1;
        res.send("Bienvenido al club!");
    }

});

app.get("/logout", (req, res) => {

    req.session.destroy( (error) => {
        if(!error) res.send("Session cerrada");
        else res.send(error);
    });

});

app.get("/login", (req, res) => {
    let {usuario, pass} = req.query;

    if(usuario === "tinki" && pass === "winki"){
        req.session.user = usuario;
        req.session.admin = true;
        res.send("Inicio de sesion exitoso");
    }else{
        res.send("Datos incorrectos")
    }
});

app.get("/privado", auth, (req, res) => {
    res.send("Soy admin");
});

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});