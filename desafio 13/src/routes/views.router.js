import express from "express";
import passport from "passport";

import ProductController from "../controllers/products.controller.js";
import CartController from "../controllers/carts.controller.js";
import ProductService from "../services/products.services.js";
import { generarProductos } from "../utils/moks.js";
import { isAdmin, isUser, isPremium} from "../middleware/roles.js";

const router = express.Router();
const productController = new ProductController();
const cartController = new CartController();
const productService = new ProductService();

router.get("/", (req, res) => {
    res.redirect("/products");
});

router.get("/products", passport.authenticate("current", {session: false, failureRedirect: "/home"}), productController.getProducts);

router.get("/chat", passport.authenticate("current", {session: false, failureRedirect: "/tokenLogin"}), isUser, (req, res) => {
    const rol = req.user.rol === "admin" ? 1 : 0;
    res.render("chat", {rol, userName: req.user.first_name});
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

router.get("/addProduct", passport.authenticate("current", {session: false, failureRedirect: "/login"}), isAdmin, (req, res) => {
    const rol = req.user.rol === "admin" ? 1 : 0;
    res.render("products", {rol, userName: req.user.first_name});
});

router.get("/profile", passport.authenticate("current", {session: false}), (req, res) => {
    const {first_name, last_name, email, rol, age} = req.user;
    const role = req.user.rol === "admin" ? 1 : 0;
    const user = {
        first_name,
        last_name, 
        email,
        rol,
        age
    }

    res.render("profile", {rol: role, user, userName: first_name});
});

router.get("/home", (req, res) => {
    res.render("mainPage");
});

router.get("/updateProducts/:pid", passport.authenticate("current", {session: false, failureRedirect: "/login"}), async (req, res) => {
    const rol = req.user.rol === "admin" ? 1 : 0;
    const pid = req.params.pid;
    const product = await productService.getProductById(pid)
    res.render("updateProducts", {rol, userName: req.user.first_name, product});
});

router.get("/mockingproducts", async (req, res) => {
    const productos = [];

    for(let i = 0; i < 100; i++) {
        productos.push(generarProductos());
    }

    res.render("mocking", {
        status: "success",
        payload: productos,
    });
});

router.get("/loggerTest", (req, res) => {
    req.logger.fatal("Mensaje de error fatal");
    req.logger.debug("Mensaje de debug");
    req.logger.http("Mensaje de HTTP");
    req.logger.warning("Mensaje de warning");
    req.logger.info("Mensaje de info");
    req.logger.error("Mensaje de error");

    res.send("Logs generados");
});

router.get("/reset-password", (req, res) => {
    res.render("resetPassword");
});

router.get("/password", (req, res) => {
    res.render("changePassword");
});

router.get("/premiumPanel", passport.authenticate("current", {session: false, failureRedirect: "/login"}), isPremium, async (req, res) => {
    const products = await productService.getProductsByOwner(req.user._id);
    res.render("premiumPanel", {userProducts: products});
})

export default router;