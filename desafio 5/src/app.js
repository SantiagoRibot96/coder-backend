//Modules
import { app, io} from "./init.js"
import { ProductManager } from "./controllers/productManager.js";
import { CartManager } from "./controllers/cartManager.js";
import { MessageModel } from "./models/message.model.js";

//Views
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import viewsRouter  from "./routes/views.router.js";

//Instancias
let newProductList = new ProductManager();
let newCartList = new CartManager();

//Routes
app.use("/", productsRouter);
app.use("/", cartsRouter);
app.use("/", viewsRouter);

io.on("connection", (socket) => {
    socket.on("message", async (data) => {
        if(data.message === "Bienvenido"){
            const messages = await MessageModel.find();
            io.emit("messagesLogs", messages);
        }else{
            await MessageModel.create(data);

            const messages = await MessageModel.find();
            io.emit("messagesLogs", messages);
        }
    });
});

export {newProductList, newCartList}