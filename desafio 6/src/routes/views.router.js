import express from "express";
import { newProductList } from "../app.js";
import { io } from "../init.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const products = await newProductList.getProducts();

    const newProducts = products.map(product => {
        return{
            id: product._id,
            title: product.title,
            description: product.description,
            category: product.category,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
            status: product.status
        }
    });
    res.render("home", {products: newProducts, title: "Productos"});
});

router.get("/chat", (req, res) => {
    res.render("chat");
});

export default router;