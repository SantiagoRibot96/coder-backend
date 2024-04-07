/* Sessions */

/* npm i express-session */

/* Nos permite almacenar informacion del cliente EN EL SERVIDOR (Al contario de las cookies que son datos del servidor guardados EN EL CLIENTE) */

import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();
const PUERTO = 8080;
const CLAVE = "TinkiWinki";

app.use(cookieParser(CLAVE));
app.use(session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true
}));

app.get("/", (req, res) => {
    res.send("Funcionando!!");
});

app.get("/setcookie", (req, res) => {
    res.cookie("coderCookie", "Mi primera chamba", {maxAge: 4000}).send("Cookie seteada!");
});

app.get("/singcookie", (req, res) => {
    res.cookie("signedCookie", "Mensaje super secreto", {signed: true}).send("Creo cookie firmada");
});

app.get("/readcookie", (req, res) => {
    res.send(req.cookies);
});

app.get("/readsignedcookie", (req, res) => {
    const valorCookie = req.signedCookies.signedCookie;

    if(valorCookie){
        res.send(req.signedCookies);
    }else{
        res.send("Cookie adulterada");
    }
})

app.get("/deletecookie", (req, res) => {
    res.clearCookie("coderCookie").send("Cookie eliminada");
})

/* Session */

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

function auth(req, res, next) {
    if(req.session.admin === true) {
        return next();
    }
    return res.status(403).send("Error de autenticacion");
}

app.get("/privado", auth, (req, res) => {
    res.send("Soy admin");
});

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});