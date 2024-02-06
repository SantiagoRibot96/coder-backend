import { validateCode, arrayCompleted } from "./functions.js";
import * as fs from "fs";

export class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
        this.currentId = 1;
    }

    async readProductsFromFile() {
        try {
            const cont = await fs.promises.readFile(this.path, "utf-8");

            return JSON.parse(cont);
        } catch (error) {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));

            try {
                const cont = await fs.promises.readFile(this.path, "utf-8");

                return JSON.parse(cont);
            } catch (error) {
                console.log(`No se pudieron traer los productos al programa ${error}`);

                return false;
            }
        }
    }

    async saveProductsToFile(prod) {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(prod, null, 2));

            return true;
        } catch (error) {
            console.log(`No se pudieron guardar los productos al archivo ${error}`);

            return false;
        }
    }

    async deleteProduct(id) {
        if(await this.getProductById(id)) {
            let prod = await this.getProducts();

            let index = prod.findIndex((item) => item.id === id);

            prod.splice(index, 1);

            this.products = prod;

            await this.saveProductsToFile(this.products);
            
            return true;
        }else {
            console.log("No se pudo borrar el producto");
        }
    }

    async updateProduct(id, newProduct) {
        let prod = await this.getProducts();
        let copyProd = prod.slice();

        let index = prod.findIndex((item) => item.id === id);

        copyProd.splice(index, 1);

        if(await this.getProductById(id)) {
            if(arrayCompleted(newProduct.title, newProduct.description, newProduct.price, newProduct.thumbnail, newProduct.code, newProduct.stock)){
                if(validateCode(copyProd, newProduct.code)){
                    newProduct.id = id;
                    prod[id-1] = {...newProduct};

                    this.products = prod;

                    await this.saveProductsToFile(this.products);

                    return true;
                }else {
                    console.log(`El codigo ${newProduct.code} se repite, no se pudo actualizar el producto`);
                }
            }else {
                console.log("Faltan datos. No se pudo actualizar el producto");
                return false;
            }
        }else {
            console.log("No se pudo actualizar el producto");
            return false;
        }
    }

    async getProducts() {
        const prod = await this.readProductsFromFile();
        this.products = prod;
        return this.products;
    }

    async addProduct(newTitle, newDescription, newPrice, newThumbnail, newCode, newStock) {
        let prod = await this.getProducts();

        if(validateCode(prod, newCode)) {
            if(arrayCompleted(newTitle, newDescription, newPrice, newThumbnail, newCode, newStock)) {

                let newProduct = {
                    id: this.currentId++,
                    title: newTitle,
                    description: newDescription,
                    price: newPrice,
                    thumbnail: newThumbnail,
                    code: newCode,
                    stock: newStock
                };

                prod.push(newProduct);
                this.products = prod;

                await this.saveProductsToFile(this.products);

                return true;
            }else {
                console.log("Faltan datos. No se pudo agregar el producto");
                return false;
            }
        }else {
            console.log(`El codigo ${newCode} ya fue utilizado. No se pudo agregar el producto`);
            return false;
        }
    }

    async getProductById(id) {
        let productSearched;
        const prod = await this.readProductsFromFile();

        prod.forEach(item => {
            if(item.id === id){
                productSearched = item;
            }
        });

        if(productSearched){
            return productSearched;
        }else {
            console.log("Producto no encontrado");
            return false;
        }
    }
}