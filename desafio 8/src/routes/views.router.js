import express from "express";
import { newCartList, newProductList } from "../app.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.redirect("/login");
});

router.get("/products", async (req, res) => {
    if(!req.session.login){
        return res.redirect("/login");
    }

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
            userName: req.session.user.first_name
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            error: "Error interno del servidor"
        });
    }
});

router.get("/chat", (req, res) => {
    if(!req.session.login){
        return res.redirect("/login");
    }

    res.render("chat", {userName: req.session.user.first_name});
});

router.get("/carts/:cid", async (req, res) => {
    if(!req.session.login){
        return res.redirect("/login");
    }

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
        
        res.render("carts", {productos: products, userName: req.session.user.first_name});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            error: "Error interno del servidor", 
        });
    }
});

router.get("/register", (req, res) => {
    if(req.session.login){
        return res.redirect("/products");
    }
    
    res.render("registro");
});

router.get("/login", (req, res) => {
    if(req.session.login){
        return res.redirect("/products");
    }
    res.render("login");
});

router.get("/profile", (req, res) => {
    if(!req.session.login){
        return res.redirect("/login");
    }

    res.render("profile", {user: req.session.user, userName: req.session.user.first_name});
});

export default router;