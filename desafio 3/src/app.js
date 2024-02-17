import { ProductManager } from "./controllers/productManager.js";
import { PORT, app, createProducts} from "./controllers/init.js"

let newProductList = new ProductManager("./src/models/products.json");

createProducts(newProductList);

app.get("/", (req, res) => {
    res.send(`Desafio N°3 de CoderHouse-Backend. Con /products se te mostrara todos los productos en la lista. Con /products?limit=X se te mostraran solo X cantidad de productos. Con /products/:pid se te mostrara el producto correspondiente al pid solicitado. Por ejemplo /products/4`);
});

app.get("/products", async (req, res) => {
    const limit = parseInt(req.query.limit);

    const myProducts = await newProductList.getProducts();

    if(limit >= 1) {
        res.send(myProducts.slice(0, limit));
    }else {
        res.send(myProducts);
    }
});

app.get("/products/:pid", async (req, res) => {
    const pid = parseInt(req.params.pid);
    
    const product = await newProductList.getProductById(pid);

    if(product){
        res.send(product);
    }else{
        res.send({status: "failed", message: "Producto no encontrado"})
    }
});

app.listen(PORT, () => {
    console.log(`Abri el navegador en http://localhost:${PORT}`);
});