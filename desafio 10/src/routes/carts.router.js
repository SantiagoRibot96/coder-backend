import { Router } from "express";
import CartController from "../controllers/carts.controller.js";

const router = Router();
const cartController = new CartController();

router.get("/", cartController.getCarts)
router.post("/", cartController.addCart);
router.get("/:cid", cartController.getCartById);
router.post("/:cid/product/:pid", cartController.addProductToCart);
router.delete("/:cid/product/:pid", cartController.deleteProduct);
router.put("/:cid", cartController.updateCart);
router.put("/:cid/product/:pid", cartController.updateProduct);
router.delete("/:cid", cartController.deleteCart);

export default router