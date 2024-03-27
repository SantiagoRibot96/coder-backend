import { CartModel } from "../models/cart.model.js";

export class CartManager {

    async getCarts() {
        try {
            const carts = await CartModel.find();
            return carts;
        } catch (error) {
            console.log("No se pudieron traer los carritos ", error);
            return false;
        }
    }

    async addCart() {
        try {
            const newCart = new CartModel({products: []});
            await newCart.save();
            return newCart;
        } catch (error) {
            console.log("Error al crear el carrito ", error);
            return false
        }
    }

    async getCartById(id) {
        try {
            const cart = await CartModel.findById(id);
            
            if(!cart){
                console.log("Carrito no encontrado");
                return false;
            }else{
                return cart;
            }
        } catch (error) {
            console.log("Error al buscar carrito ", error);
            return false;
        }
    }

    async addProductToCart(id, newProductId, quantity = 1) {
        try {
            const cart = await this.getCartById(id);

            const existeProducto = cart.products.find(item => item.product.toString() === newProductId);

            if(existeProducto){
                existeProducto.quantity += quantity;
            }else{
                cart.products.push({ product: newProductId, quantity});
            }

            cart.markModified("products");

            await cart.save();
            return cart;
        } catch (error) {
            console.log("No se pudo encontrar el carrito ", error);
            return false
        }
    }

    async deleteProduct(cid, pid) {
        try {
            const cart = await this.getCartById(cid);

            const existeProducto = cart.products.findIndex(item => item.product.toString() === pid);

            if(existeProducto != -1){
                cart.products.splice(existeProducto, 1);
                
                cart.markModified("products");

                await cart.save();
                return true;
            }else{
                console.log("No se encontro el producto en el carrito");
                return false;
            }
        } catch (error) {
            console.log("No se pudo eliminar el producto del carrito", error);
            return false;
        }
    }
}