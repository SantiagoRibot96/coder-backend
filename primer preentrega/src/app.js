import { PORT, app, createProducts} from "./init.js"
import { ProductManager } from "./controllers/productManager.js";
import { CartManager } from "./controllers/cartManager.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

let newProductList = new ProductManager("./src/models/products.json");
let newCartList = new CartManager("./src/models/carts.json");

app.get("/", (req, res) => {
    res.send(`Desafio N°3 de CoderHouse-Backend. Con /products se te mostrara todos los productos en la lista. Con /products?limit=X se te mostraran solo X cantidad de productos. Con /products/:pid se te mostrara el producto correspondiente al pid solicitado. Por ejemplo /products/4`);
});

app.get("/api/products", productsRouter);
app.get("/api/products/:pid", productsRouter);
app.post("/api/products", productsRouter);
app.put("/api/products/:pid", productsRouter);
app.delete("/api/products/:pid", productsRouter);

app.post("/api/carts", cartsRouter);
app.get("/api/carts/:cid", cartsRouter);
app.post("/api/carts/:cid/product/:pid", cartsRouter);


app.listen(PORT, () => {
    console.log(`Abri el navegador en http://localhost:${PORT}`);
});

export {newProductList, newCartList}