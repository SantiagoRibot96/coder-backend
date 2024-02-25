import express from "express";
import { newProductList } from "../app.js";
import { io } from "../init.js";

const router = express.Router();

router.get("/", async (req, res) => {
    res.render("home", {products: await newProductList.getProducts(), title: "Productos sin Websocket"});
});

router.get("/realtimeproducts", async (req, res) => {
    io.on("connection", async () => {
        console.log("New client");

        io.emit("products", await newProductList.getProducts());
    });

    res.render("realTimeProducts", {title: "Productos con Websocket"});
});

export default router;