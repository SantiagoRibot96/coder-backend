/* 
npm install cookie-parser
*/

import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const PUERTO = 8080;
const CLAVE = "TinkiWinki";

app.use(cookieParser(CLAVE));

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

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});