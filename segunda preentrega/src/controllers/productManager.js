import { ProductModel } from "../models/product.model.js";

export class ProductManager {

    async deleteProduct(id) {
        try {
            const productDelete = await ProductModel.findByIdAndDelete(id);

            if(!productDelete){
                console.log("Producto no encontrado");
                return false;
            }else{
                console.log("Producto eliminado");
                return true;
            }
        } catch (error) {
            console.log("Error al buscar y eliminar el producto ", error);
            return false;
        }
    }

    async updateProduct(id, newProduct) {
        try {
            const productUpdate = await ProductModel.findByIdAndUpdate(id, newProduct);

            if(!productUpdate){
                console.log("Producto no encontrado");
                return false;
            }else{
                console.log("Producto actualizado");
                return productUpdate;
            }
        } catch (error) {
            console.log("Error al buscar y actualizar el producto ", error);
            return false;
        }
    }

    async getProducts() {
        try {
            const productos = await ProductModel.find();
            return productos;
        } catch (error) {
            console.log("No se pudieron traer los productos ", error);
            return false;
        }
    }

    async addProduct(title, description, category, price, thumbnail, code, stock) {
        try {
            let newProduct = new ProductModel ({
                title,
                description,
                category,
                price,
                thumbnail,
                code,
                stock,
                status: true
            });

            await newProduct.save();
            
            return true;
        } catch (error) {
            console.log("Error al agregar producto " + error);
            return false;
        }
    }

    async getProductById(id) {
        try {
            const producto = await ProductModel.findById(id);

            if(producto){
                return producto;
            }else{
                console.log("Producto no encontrado");
                return false;
            }
        } catch (error) {
            console.log("Error al buscar producto ", error);
        }
    }
}