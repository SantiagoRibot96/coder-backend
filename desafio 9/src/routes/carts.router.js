import { Router } from "express";
import { newCartList } from "../app.js";
import { CartManager } from "../controllers/cartManager.js";

const router = Router();

router.post("/", async (req, res) => {
    const newCart = await newCartList.addCart();

    res.send({status: "Success", message: `Cart con id ${newCart._id} creado`});
});

router.get("/:cid", async (req, res) => {
    const cid = req.params.cid;

    const products = await newCartList.getCartById(cid);

    if(products){
        res.send(products);
    }else{
        res.send({status: "Failed", message: `No se puede acceder al carrito ${cid}`})
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity || 1;

    const cond = await newCartList.addProductToCart(cid, pid, quantity);

    if(cond){
        res.send({status: "Success", message: `Producto con id ${pid} agregado al carrito ${cid}`});
    }else{
        res.send({status: "Failed", message: `No se pudo cargar el producto ${pid} en el carrito ${cid}`});
    }
});

router.delete("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;

    const cond = await newCartList.deleteProduct(cid, pid);

    if(cond){
        res.send({status: "Success", message: `Producto con id ${pid} fue eliminado del carrito ${cid}`});
    }else{
        res.send({status: "Failed", message: `No se pudo eliminar el producto ${pid} del carrito ${cid}`});
    }
});

router.put("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const updatedProducts = req.body;

    try {
        const updatedCart = await newCartList.updateCart(cid, updatedProducts);
        res.json({
            status: "Success",
            message: `Carrito ${cid} actualizado con exito`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            error: "Error interno del servidor",
        });
    }
});

router.put("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const newQuantity = req.body.quantity;

    try {
        const updatedCart = await newCartList.updateProduct(cid, pid, newQuantity);
        res.json({
            status: "Success",
            message: `Cantidad de producto ${pid} actualizada en carrito ${cid}`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            error: "Error interno del servidor",
        });
    }
});

router.delete("/:cid", async (req, res) => {
    const cid = req.params.cid;

    try {
        const updatedCart = await newCartList.deleteCart(cid);
        res.json({
            status: "Success",
            message: `Carrito ${cid} eliminado con exito`,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            error: "Error interno del servidor",
        });
    }
});

export default router