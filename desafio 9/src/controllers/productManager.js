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

    async getProducts({ limit = 10, page = 1, sort, query} = {}) {
        try {
            const skip = (page -1) * limit;
            
            let queryOptions = {};
            let prevLink, nextLink;

            const sortOptions = {};

            if(sort){
                if(sort === "asc" || sort === "desc"){
                    sortOptions.price = sort === "asc" ? 1 : -1;
                }

                if(query){
                    queryOptions = {category: query};
                    prevLink = `/products?page=${page - 1}&limit=${limit}&sort=${sort}&query=${query}`;
                    nextLink = `/products?page=${page + 1}&limit=${limit}&sort=${sort}&query=${query}`;
                }else{
                    prevLink = `/products?page=${page - 1}&limit=${limit}&sort=${sort}`;
                    nextLink = `/products?page=${page + 1}&limit=${limit}&sort=${sort}`;
                }
            }else{
                if(query){
                    queryOptions = {category: query};
                    prevLink = `/products?page=${page - 1}&limit=${limit}&query=${query}`;
                    nextLink = `/products?page=${page + 1}&limit=${limit}&query=${query}`;
                }else{
                    prevLink = `/products?page=${page - 1}&limit=${limit}`;
                    nextLink = `/products?page=${page + 1}&limit=${limit}`;
                }
            }

            const products = await ProductModel.find(queryOptions).sort(sortOptions).skip(skip).limit(limit);

            const totalProducts = await ProductModel.countDocuments(queryOptions);

            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            return {
                docs: products,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevPage: hasPrevPage ? prevLink : null,
                nextPage: hasNextPage ? nextLink : null
            };
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