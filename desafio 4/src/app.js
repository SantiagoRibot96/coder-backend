//Modules
import { app, createProducts} from "./init.js"
import { ProductManager } from "./controllers/productManager.js";
import { CartManager } from "./controllers/cartManager.js";
import { io } from "./init.js";

//Views
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter  from "./routes/views.router.js";

//Instancias
let newProductList = new ProductManager("./src/models/products.json");
let newCartList = new CartManager("./src/models/carts.json");

//Product routes
app.get("/api/products", productsRouter);
app.get("/api/products/:pid", productsRouter);
app.post("/api/products", productsRouter);
app.put("/api/products/:pid", productsRouter);
app.delete("/api/products/:pid", productsRouter);

//Cart routes
app.post("/api/carts", cartsRouter);
app.get("/api/carts/:cid", cartsRouter);
app.post("/api/carts/:cid/product/:pid", cartsRouter);

//Views routes
app.get("/", viewsRouter);
app.get("/realtimeproducts", viewsRouter);

export {newProductList, newCartList}