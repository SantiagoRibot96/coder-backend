import { validateCode, arrayCompleted } from "./functions.js";

export class ProductManager {

    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(newTitle, newDescription, newPrice, newThumbnail, newCode, newStock) {
        if(validateCode(this.products, newCode)) {
            if(arrayCompleted(newTitle, newDescription, newPrice, newThumbnail, newCode, newStock)) {

                let newId = this.products.length + 1;

                let newProduct = {
                    id: newId,
                    title: newTitle,
                    description: newDescription,
                    price: newPrice,
                    thumbnail: newThumbnail,
                    code: newCode,
                    stock: newStock
                };

                this.products.push(newProduct);

                return true;
            }else {
                console.log("Faltan datos del producto");
                return false;
            }
        }else {
            console.log(`El codigo ${newCode} ya fue utilizado`);
            return false;
        }
    }

    getProductById(id) {
        let productSearched;

        this.products.forEach(item => {
            if(item.id === id){
                productSearched = item;
            }
        });

        if(productSearched){
            return productSearched;
        }else {
            return "Producto no encontrado";
        }
    }
}