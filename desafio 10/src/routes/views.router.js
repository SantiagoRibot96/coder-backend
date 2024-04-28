import express from "express";
import passport from "passport";

import ProductController from "../controllers/products.controller.js";
import CartController from "../controllers/carts.controller.js";

const router = express.Router();
const productController = new ProductController();
const cartController = new CartController();

router.get("/", passport.authenticate("current", {session: false, failureRedirect: "/tokenLogin"}), (req, res) => {
    res.redirect("/products");
});
router.get("/products", passport.authenticate("current", {session: false, failureRedirect: "/tokenLogin"}), productController.getProducts);
router.get("/chat", passport.authenticate("current", {session: false, failureRedirect: "/tokenLogin"}), (req, res) => {
    res.render("chat", {userName: req.user.first_name});
});
router.get("/carts/:cid", passport.authenticate("current", {session: false, failureRedirect: "/tokenLogin"}), cartController.getCartById);
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