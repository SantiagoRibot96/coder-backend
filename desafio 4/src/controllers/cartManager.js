import { getCurrentID, readFromFile, saveToFile } from "../functions.js";
import { newProductList } from "../app.js";

export class CartManager {

    constructor(path) {
        this.carts = [];
        this.path = path;
        this.currentId = 1;
    }

    async getCarts() {
        const carts = await readFromFile(this.path, []);
        this.carts = carts;
        return this.carts;
    }

    async addCart() {
        this.carts = await this.getCarts();
        this.currentId = getCurrentID(this.carts);
        const newCart = {
            id: this.currentId, 
            products: []
        };

        this.carts.push(newCart);
        saveToFile(this.path, this.carts);
    }

    async getCartById(id) {
        let cartSearched;
        const carts = await readFromFile(this.path, []);

        carts.forEach(item => {
            if(item.id === id){
                cartSearched = item;
            }
        });

        if(cartSearched){
            return cartSearched.products;
        }else {
            console.log("Carrito no encontrado");
            return false;
        }
    }

    async addProductToCart(id, newProductId) {
        const cartSearched = await this.getCartById(id);
        const carts = await this.getCarts();
        const product = await newProductList.getProductById(newProductId);
        const index = carts.findIndex((item) => item.id === id);

        if(!product){
            return false;
        }

        if(cartSearched){
            const prodIndex = carts[index].products.findIndex((item) => item.id === newProductId);
            
            if(prodIndex != -1){
                if(carts[index].products[prodIndex].quantity < product.stock){
                    carts[index].products[prodIndex].quantity++;
                }else{
                    console.log("No hay suficiente stock");
                    return false;
                }
            }else{
                const newProduct = {
                    id: newProductId,
                    quantity: 1
                };

                if(product.stock >= 1){
                    carts[index].products.push(newProduct);
                }else{
                    console.log("No hay suficiente stock");
                    return false;
                }
            }
            
            this.carts = carts;
            saveToFile(this.path, this.carts);
            return true;
        }else{
            console.log("No se encontro carrito con ese ID");
            return false;
        }
    }
}