import express from "express";
const router = express.Router();
import UserModel from "../models/user.model.js";

router.post("/", async (req, res) => {
    const {first_name, last_name, email, password, age} = req.body;

    try {
        const existeUsuario = await UserModel.findOne({email: email});

        if(existeUsuario){
            return res.status(400).send("El correo electronico ya esta registrado")
        }else{
            const nuevoUsuario = await UserModel.create({first_name, last_name, email, password, age});

            req.session.login = true;
            req.session.user = {...nuevoUsuario._doc};
            res.redirect("/profile");
        }
    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try {
        const usuario = await UserModel.findOne({email: email});
        if(usuario){
            if(usuario.password === password){
                req.session.login = true;
                req.session.user = {
                    first_name: usuario.first_name,
                    last_name: usuario.last_name,
                    email: usuario.email,
                    password: usuario.password,
                    age: usuario.age
                };
                res.redirect("/profile");
            }else{
                res.status(401).send("Contraseña no valida");
            }
        }else{
            res.status(404).send("Usuario no encontrado")
        }

    } catch (error) {
        res.status(500).send("Error interno del servidor");
    }
});

router.get("/logout", (req, res) => {
    if(req.session.login){
        req.session.destroy();
    }
    res.redirect("/login");
});

export default router;