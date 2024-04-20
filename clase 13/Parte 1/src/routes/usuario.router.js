import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

import UsuarioModel from "../models/usuario.model.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const {usuario, password} = req.body;

    try {
        const existeUsuario = await UsuarioModel.findOne({usuario});

        if (existeUsuario) {
            return res.status(400).send("El usuario ya existe, pruebe otro nombre");
        }

        const nuevoUsuario = new UsuarioModel({
            usuario,
            password
        });

        await nuevoUsuario.save();

        const token = jwt.sign({usuario, rol: ""}, "coderhouse", {expiresIn: "1h"});

        res.cookie("coderCookieToken", token, {
            maxAge: 3600000,
            httpOnly: true
        });

        res.redirect("/home");

    } catch (error) {
        res.status(500).send(`Error interno del servidor ${error}`);
    }
});

router.post("/login", async (req, res) => {
    const {usuario, password} = req.body;

    try {
        const existeUsuario = await UsuarioModel.findOne({usuario});

        if(!existeUsuario) {
            return res.status(401).send("El usuario no existe");
        }

        if(password !== existeUsuario.password) {
            return res.status(401).send("Usuario y contraseña no coinciden");
        }

        const token = jwt.sign({usuario: existeUsuario.usuario, rol: existeUsuario.rol}, "coderhouse", {expiresIn: "1h"});

        res.cookie("coderCookieToken", token, {
            maxAge: 3600000,
            httpOnly: true
        });

        res.redirect("/home");
    } catch (error) {
        res.status(500).send(`Error interno del servidor ${error}`);
    }
});

router.get("/home", passport.authenticate("jwt", {session: false}), (req, res) => {
    res.render("home", {usuario: req.user.usuario});
});

router.post("/logout", (req, res) => {
    res.clearCookie("coderCookieToken");
    res.redirect("/login");
});

router.get("/admin", passport.authenticate("jwt", {session: false}), (req, res) => {
    if(req.user.rol === "admin"){
        return res.render("admin");
    }
    res.status(403).send("Acceso denegado");
})

export default router;