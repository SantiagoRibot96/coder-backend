import express from "express";
import passport from "passport";

import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";
import { read } from "fs";

const router = express.Router(); 
//Registro: 

// router.post("/", async (req, res) => {
//     const {first_name, last_name, email, password, age} = req.body; 

//     try {
//         //Verificamos si el correo que recibo ya esta en la bd. 
//         const existeUsuario = await UserModel.findOne({email:email});
//         if(existeUsuario) {
//             return res.status(400).send("El correo electronico ya esta registrado");
//         }
        
//         //Creamos un nuevo usuario: 
//         const nuevoUsuario = await UserModel.create({first_name, last_name, email, password: createHash(password), age});

//         //Armamos la session: 
//         req.session.login = true;
//         req.session.user = {...nuevoUsuario._doc}

//         //res.status(200).send("Usuario creado con éxito!");
//         res.redirect("/profile");

//     } catch (error) {
//         res.status(500).send("Error interno del servidor")
//     }
// })

// //Login: 

// router.post("/login", async (req, res) => {
//     const {email, password} = req.body;

//     try {
//         const usuario = await UserModel.findOne({email:email}); 
//         if(usuario) {
//                 if(isValidPassword(password, usuario)) {
//                 req.session.login = true;
//                 req.session.user = {
//                     email: usuario.email, 
//                     age: usuario.age,
//                     first_name: usuario.first_name, 
//                     last_name: usuario.last_name
//                 }
//                 res.redirect("/profile");
//             } else {
//                 res.status(401).send("Contraseña no valida, moriras!");
//             }

//         } else {
//             res.status(404).send("Usuario no encontrado");
//         }
        
//     } catch (error) {
//         res.status(500).send("Error interno del servidor")
//     }

// })

//Version para Passport

router.post("/", passport.authenticate("register", {
    failureRedirect: "/api/sessions/failedregister"
}), async (req, res) => {
    if(!req.user) return res.status(400).send("Credenciales invalidas");

    req.session.user = {
        fist_name: req.user.fist_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    req.session.login = true;

    res.redirect("/profile");
});

router.get("/failedregister", (req, res) => {
    res.send("Registro fallido");
});

router.post("/login", passport.authenticate("login", {
    failureRedirect: "/api/sessions/faillogin"
}), async (req, res) => {
    if(!req.user) return res.status(400).send("Credenciales invalidas");

    req.session.user = {
        fist_name: req.user.fist_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    req.session.login = true;

    res.redirect("/profile");
});

router.get("/faillogin", (req, res) => {
    res.send("Fallo al iniciar sesion");
});

//Logout

router.get("/logout", (req, res) => {
    if(req.session.login) {
        req.session.destroy();
    }
    res.redirect("/login");
})


export default router; 