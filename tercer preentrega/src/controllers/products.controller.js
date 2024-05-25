import ProductService from "../services/products.services.js";

const productService = new ProductService();

class ProductController {
    async deleteProduct(req, res) {
        try {
            const pid = req.params.pid;
            const deletedProduct = await productService.deleteProduct(pid);

            console.log(`Producto actualizado ${deletedProduct}`);
        } catch (error) {
            res.status(500).send(`Error al eliminar el producto: ${error}`);
        }
    }

    async updateProduct(req, res) {
        try {
            const pid = req.params.pid;
            const prod = req.body;
            console.log(`${pid}, ${prod}`);
            const newProduct = await productService.updateProduct(pid, {...prod});

            console.log(`Producto actualizado ${newProduct}`);
            res.redirect("/products");
        } catch (error) {
            res.status(500).send(`Error al actualizar el producto: ${error}`);
        }
    }

    async getProducts(req, res) {
        try {
            const { limit = 8, page = 1, sort, query } = req.query;
            let firstPage = false;
    
            const products = await productService.getProducts({
                limit: parseInt(limit),
                page: parseInt(page),
                sort,
                query
            });
    
            if(!products.hasPrevPage){
                firstPage = true;
            }

            res.render("home", {
                status: "success",
                payload: products.docs,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                currentPage: products.page,
                totalPages: products.totalPages,
                nextLink: products.hasNextPage ? products.nextPage : null,
                prevLink: products.hasPrevPage ? products.prevPage : null,
                firstPage,
                limit,
                userName: req.user.first_name, 
                rol: req.user.rol === "admin" ? 1 : 0,
                cid: req.user.cart
            });
        } catch (error) {
            res.status(500).send(`Error al obtener los productos: ${error}`);
        }
    }

    async addProduct(req, res) {
        try {
            const {title, description, category, price, thumbnail, code, stock} = req.body;
            const newProduct = await productService.addProduct(title, description, category, price, thumbnail, code, stock);
        
            res.status(200).send(`Producto creado`);
        } catch (error) {
            res.status(500).send(`Error al crear el producto: ${error}`);
        }
    }

    async getProductById(req, res) {
        try {
            const pid = req.params.pid;
            const product = await productService.getProductById(pid);

            res.status(200).send(product);
        } catch (error) {
            res.status(500).send(`Error al obtener el producto ${pid}: ${error}`);
        }
    }
}

export default ProductController;