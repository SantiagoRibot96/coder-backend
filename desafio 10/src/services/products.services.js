import { ProductModel } from "../models/product.model.js";

class ProductService {
    async deleteProduct(pid) {
        try {
            const deletedProduct = await ProductModel.findByIdAndDelete(pid);

            return deletedProduct;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async updateProduct(pid, newProduct) {
        try {
            const productUpdate = await ProductModel.findByIdAndUpdate(pid, newProduct);
            
            return productUpdate;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async getProducts({limit = 10, page = 1, sort, query} = {}) {
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
            throw new Error(`${error}`);
        }
    }

    async addProduct(title, description, category, price, thumbnail, code, stock) {
        try {
            let status = true;

            if(stock < 1) status = false;

            let newProduct = new ProductModel ({
                title,
                description,
                category,
                price,
                thumbnail,
                code,
                stock,
                status
            });

            await newProduct.save();
            
            return newProduct;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }

    async getProductById(pid) {
        try {
            const product = await ProductModel.findById(pid);

            if(product) return product;
        } catch (error) {
            throw new Error(`${error}`);
        }
    }
}

export default ProductService;