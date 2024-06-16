import CartService from "../services/carts.services.js";

const cartService = new CartService();

class CartController {
    async getCarts(req, res, next) {
        try {
            const carts = await cartService.getCarts();

            req.logger.info(`Carts disponibles: ${carts}`)
            // res.status(200).send(`Cart creado: ${carts}`);
        } catch (error) {
            next(error);
        }
    }

    async addCart(req, res, next) {
        try {
            const user = req.user.email;
            // console.log(user);
            const newCart = await cartService.addCart(user);

            req.logger.info(`Cart creado: ${newCart}`);
            // res.status(200).send(`Cart creado: ${newCart}`);
        } catch (error) {
            next(error);
        }
    }

    async getCartById(req, res, next) {
        try {
            const cid = req.params.cid;
            const rol = req.user.rol === "admin" ? 1 : 0;
            const cart = await cartService.getCartById(cid);
        
            const products = cart.products.map(item => ({
                product: item.product.toObject(),
                quantity: item.quantity
            }));
            
            res.render("carts", {cid, rol, productos: products, userName: req.user.first_name});
        } catch (error) {
            next(error);
        }
    }

    async addProductToCart(req, res, next) {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const quantity = req.body.quantity || 1;

            const cart = await cartService.addProductToCart(cid, pid, quantity);

            req.logger.info(`Cart actualizado: ${cart}`);
            // console.log(`Cart actualizado: `);
            res.redirect("/products");
        } catch (error) {
            // console.log(error);
            next(error);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
        
            const cart = await cartService.deleteProduct(cid, pid);

            req.logger.info(`Producto eliminado del Cart: ${cart}`);
            // console.log(`Producto eliminado del Cart: ${cart}`);
        } catch (error) {
            next(error);
        }
    }

    async updateCart(req, res, next){
        try {
            const cid = req.params.cid;
            const updatedProducts = req.body;

            const updatedCart = await cartService.updateCart(cid, updatedProducts);
            
            req.logger.info(`Cart actualizado: ${updatedCart}`);
            // res.status(200).send(`Cart actualizado: ${updatedCart}`);
        } catch (error) {
            next(error);
        }
    }

    async updateProduct(req, res, next){
        try {
            const cid = req.params.cid;
            const pid = req.params.pid;
            const newQuantity = req.body.quantity;

            const updatedCart = await cartService.updateProduct(cid, pid, newQuantity);
            
            req.logger.info(`Cart actualizado: ${updatedCart}`);
            // res.status(200).send(`Cart actualizado: ${updatedCart}`);
        } catch (error) {
            next(error);
        }
    }

    async deleteCart(req, res, next){
        try {
            const cid = req.params.cid;
            const deletedCart = await cartService.deleteCart(cid);

            req.logger.info(`El carrito ha sido eliminado: ${deletedCart}`);
            // res.status(200).send(`El carrito ha sido eliminado: ${deletedCart}`);
        } catch (error) {
            next(error);
        }
    }
}

export default CartController;