import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.model.js";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";
import { newCartList } from "../app.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const {first_name, last_name, email, password, age} = req.body;

    try {
        let user = await UserModel.findOne({email});

        if(user) return res.status(400).send("El usuario ya existe");

        const cartId = await newCartList.addCart();

        let newUser = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password),
            cart: cartId._id
        }

        await UserModel.create(newUser);
        
        const token = jwt.sign({email}, "coderhouse", {expiresIn: "1h"});

        res.cookie("coderCookieToken", token, {
            maxAge: 3600000,
            httpOnly: true
        });

        res.redirect("/products");
    } catch (error) {
        res.status(500).send(`Error interno del servidor ${error}`);
    }
});

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await UserModel.findOne({email});

        if(!user) return res.status(401).send("El usuario no existe");

        if(!isValidPassword(password, user)) return res.status(401).send("Usuario y contraseña no coinciden");

        const token = jwt.sign({email}, "coderhouse", {expiresIn: "1h"});

        res.cookie("coderCookieToken", token, {
            maxAge: 3600000,
            httpOnly: true
        });
    
        res.redirect("/products");
    } catch (error) {
        res.status(500).send(`Error interno del servidor ${error}`);
    }
});

router.get("/github", passport.authenticate("github", {
    scope: ["user: email"]
}), async (req, res) => {});

router.get("/githubcallback", passport.authenticate("github", {
    failureRedirect: "/login"
}), async (req, res) => {
    const token = jwt.sign({email: req.user.email}, "coderhouse", {expiresIn: "1h"});

    res.cookie("coderCookieToken", token, {
        maxAge: 3600000,
        httpOnly: true
    });

    res.redirect("/products");
});

router.get("/current", passport.authenticate("current", {session: false, failureRedirect: "/login"}), (req, res) => {
    res.send(req.user);
});

router.get("/logout", (req, res) => {
    res.clearCookie("coderCookieToken");
    res.redirect("/login");
});
export default router;