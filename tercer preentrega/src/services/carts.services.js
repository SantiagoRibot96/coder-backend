import { CartModel } from "../models/cart.model.js";

class CartService {
    async getCarts() {
        try {
            const carts = await CartModel.find();

            return carts;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async addCart(user) {
        try {
            const newCart = new CartModel({products: [], user});

            await newCart.save();

            return newCart;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async getCartById(cid) {
        try {
            const cart = await CartModel.findById(cid);

            return cart;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async addProductToCart(cid, pid, quantity = 1) {
        try {
            const cart = await this.getCartById(cid);
            const existeProducto = cart.products.find(item => item.product._id.toString() === pid);

            if(existeProducto){
                existeProducto.quantity += quantity;
            }else{
                cart.products.push({ product: pid, quantity});
            }

            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async deleteProduct(cid, pid) {
        try {
            const cart = await this.getCartById(cid);

            const existeProducto = cart.products.findIndex(item => item.product._id.toString() === pid);

            if(existeProducto != -1) cart.products.splice(existeProducto, 1);
            else console.log("No se encontr producto");
            
            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async updateCart(cid, updatedProducts){
        try {
            const cart = await this.getCartById(cid);

            cart.products = updatedProducts;

            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async updateProduct(cid, pid, newQuantity){
        try {
            const cart = await this.getCartById(cid);

            const productIndex = cart.products.findIndex(item => item.product._id.toString() !== pid);

            cart.products[productIndex].quantity = newQuantity;

            cart.markModified("products");
            await cart.save();
            return cart;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async deleteCart(cid){
        try {
            const deletedCart = await CartModel.findByIdAndDelete(cid);
            
            return deletedCart;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}

export default CartService;