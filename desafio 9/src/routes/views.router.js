import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

import { newCartList, newProductList } from "../app.js";

const router = express.Router();

router.get("/", passport.authenticate("current", {session: false, failureRedirect: "/tokenLogin"}), (req, res) => {
    res.redirect("/products");
});

router.get("/products", passport.authenticate("current", {session: false, failureRedirect: "/tokenLogin"}), async (req, res) => {
    try {
        const { limit = 8, page = 1, sort, query } = req.query;
        let firstPage = false;

        const products = await newProductList.getProducts({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query
        });

        if(!products.hasPrevPage){
            firstPage = true;
        }
        
        res.render("home", {
            status: "success",
            payload: products.docs,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            currentPage: products.page,
            totalPages: products.totalPages,
            nextLink: products.hasNextPage ? products.nextPage : null,
            prevLink: products.hasPrevPage ? products.prevPage : null,
            firstPage,
            limit,
            userName: req.user.first_name
        });

    } catch (error) {
        res.status(500).send(`Error interno del servidor ${error}`);
    }
});

router.get("/chat", passport.authenticate("current", {session: false, failureRedirect: "/tokenLogin"}), (req, res) => {
    res.render("chat", {userName: req.user.first_name});
});

router.get("/carts/:cid", passport.authenticate("current", {session: false, failureRedirect: "/tokenLogin"}), async (req, res) => {
    const cid = req.params.cid;

    try {
        const cart = await newCartList.getCartById(cid);

        if(!cart){
            console.log("No existe carrito con ese id");
            return res.status(404).send("Carrito no encontrado");
        }

        const products = cart.products.map(item => ({
            product: item.product.toObject(),
            quantity: item.quantity
        }));
        
        res.render("carts", {productos: products, userName: req.user.first_name});
    } catch (error) {
        res.status(500).send(`Error interno del servidor ${error}`);
    }
});

router.get("/tokenRegister", passport.authenticate("current", {session: false, failureRedirect: "/register"}), (req, res) => {
    res.redirect("/products");
});

router.get("/tokenLogin", passport.authenticate("current", {session: false, failureRedirect: "/login"}), (req, res) => {
    res.redirect("/products");
});

router.get("/register", (req, res) => {
    res.render("registro");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/profile", passport.authenticate("current", {session: false}), (req, res) => {
    res.render("profile", {user: req.user, userName: req.user.first_name});
});

export default router;