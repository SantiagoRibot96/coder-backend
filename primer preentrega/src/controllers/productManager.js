import { validateCode, arrayCompleted, getCurrentID, readFromFile, saveToFile } from "../functions.js";

export class ProductManager {

    constructor(path) {
        this.products = [];
        this.path = path;
        this.currentId = 1;
    }

    async deleteProduct(id) {
        if(await this.getProductById(id)) {
            let prod = await this.getProducts();

            let index = prod.findIndex((item) => item.id === id);

            prod.splice(index, 1);

            this.products = prod;

            await saveToFile(this.path, this.products);
            
            return true;
        }else {
            console.log("No se pudo borrar el producto");
            
            return false;
        }
    }

    async updateProduct(id, newProduct) {
        let prod = await this.getProducts();
        let copyProd = prod.slice();

        const index = prod.findIndex((item) => item.id === id);

        copyProd.splice(index, 1);

        if(await this.getProductById(id)) {
            if(arrayCompleted(newProduct.title, newProduct.description, newProduct.category, newProduct.price, newProduct.thumbnail, newProduct.code, newProduct.stock)){
                if(validateCode(copyProd, newProduct.code)){
                    newProduct.id = id;
                    prod[id-1] = {...newProduct};

                    this.products = prod;

                    await saveToFile(this.path, this.products);

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
        const prod = await readFromFile(this.path, []);
        this.products = prod;
        return this.products;
    }

    async addProduct(newTitle, newDescription, newCategory, newPrice, newThumbnail, newCode, newStock) {
        let prod = await this.getProducts();
        this.currentId = getCurrentID(prod);

        if(validateCode(prod, newCode)) {
            if(arrayCompleted(newTitle, newDescription, newCategory, newPrice, newThumbnail, newCode, newStock)) {

                let newProduct = {
                    id: this.currentId,
                    title: newTitle,
                    description: newDescription,
                    category: newCategory,
                    price: newPrice,
                    thumbnail: newThumbnail,
                    code: newCode,
                    stock: newStock
                };

                prod.push(newProduct);
                this.products = prod;

                await saveToFile(this.path, this.products);

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
        const prod = await readFromFile(this.path, []);

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