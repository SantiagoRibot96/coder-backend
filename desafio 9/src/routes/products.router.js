import { Router } from "express";
import { newProductList } from "../app.js";
import { io } from "../init.js";

const router = Router();

router.get("/", async (req, res) => {
    const limit = parseInt(req.query.limit);

    const myProducts = await newProductList.getProducts();

    if(limit >= 1) {
        res.send(myProducts.slice(0, limit));
    }else {
        res.send(myProducts);
    }
});

router.get("/:pid", async (req, res) => {
    const pid = req.params.pid;
    
    const product = await newProductList.getProductById(pid);

    if(product){
        res.send(product);
    }else{
        res.send({status: "failed", message: "Producto no encontrado"})
    }
});

router.post("/", async (req, res) => {
    const {id,title, description, category, price, thumbnail, code, stock, status} = req.body;

    const cond = await newProductList.addProduct(title, description, category, price, thumbnail, code, stock);

    if(cond){
        io.emit("products", await newProductList.getProducts());

        res.send({status:"succes", message: "Producto creado"});
    }else{
        res.send({status:"failed", message: "Producto no creado: ver logs"});
    }
});

router.put("/:pid", async (req, res) => {
    const pid = req.params.pid;
    const prod = req.body;

    const cond = await newProductList.updateProduct(pid, {...prod});

    if(cond){
        res.send({status:"succes", message: "Producto actualizado"});
    }else{
        res.send({status:"failed", message: "Producto no actualizado: ver logs"});
    }
});

router.delete("/:pid", async (req, res) => {
    const pid = req.params.pid;
    
    const cond = await newProductList.deleteProduct(pid);

    if(cond){
        res.send({status:"succes", message: "Producto eleminado"});
    }else{
        res.send({status:"failed", message: "Producto no eliminado: ver logs"});
    }
});

export default router