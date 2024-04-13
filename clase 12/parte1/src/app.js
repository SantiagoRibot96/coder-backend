/* Clase 12 - Passport Avanzado y JWT */

const express = require("express");
const jwt = require("jsonwebtoken");
const initializePassport = require("./config/passport.config.js");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const { passportCall } = require("./utils/util.js");

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

app.post("/login", (req, res) => {
    const {usuario, pass} = req.body;

    if(usuario === "tinki" && pass === "winki") {
        let altoketoken = jwt.sign({usuario, pass}, "coderhouse", {expiresIn:  "24h"}); //La contraseña no deberia guardarse en el token, es para prueba nada mas

        res.cookie("coderCookieToken", altoketoken, {maxAge: 60*60*1000, httpOnly:true}).send({message: "Login exitoso"});
    }else {
        res.send("Login fallido: Usuario o Password incorrectas");
    }
});

// app.get("/current", passport.authenticate("jwt", {session: false}), (req, res) => {
//     res.send(req.user);
// });

app.get("/current", passportCall("jwt"), passport.authenticate("jwt", {session: false}), (req, res) => {
    res.send(req.user);
});

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});