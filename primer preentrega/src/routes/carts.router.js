import { Router } from "express";
import { newCartList } from "../app.js";

const router = Router();

router.post("/api/carts", async (req, res) => {
    await newCartList.addCart();

    res.send({status: "Success", message: `Cart con id ${newCartList.currentId} creado`});
});

router.get("/api/carts/:cid", async (req, res) => {
    const cid = parseInt(req.params.cid);

    const products = await newCartList.getCartById(cid);

    if(products){
        res.send(products);
    }else{
        res.send({status: "Failed", message: `No se puede acceder al carrito ${cid}`})
    }
});

router.post("/api/carts/:cid/product/:pid", async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);

    const cond = await newCartList.addProductToCart(cid, pid);

    if(cond){
        res.send({status: "Success", message: `Producto con id ${pid} agregado al carrito ${cid}`});
    }else{
        res.send({status: "Failed", message: `No se pudo cargar el producto ${pid} en el carrito ${cid}`});
    }
});

export default router