//Modules
import express from "express";
import exphbs from "express-handlebars";
import { Server } from "socket.io";
import { newProductList } from "./app.js";
import "./database.js";

//Server consts
export const app = express();
export const PORT = 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("*/css", express.static("./src/public/css"));
app.use("*/js", express.static("./src/public/js"));

//Handlebars
app.engine("handlebars", exphbs.engine({
    runtimeOptions:{
        allowProtoMethodsByDefault:true,
        allowProtoPropertiesByDefault:true,
    }})
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Init function
export async function createProducts(newProductList){
    const products = await newProductList.getProducts();

    if(!(products[0])){
        await newProductList.addProduct("Harina", "Haria 000 blancaflor", "Almacen", 1500, "https://Harina", "ABC001", 10);
        await newProductList.addProduct("Miel", "Miel pura de abeja", "Almacen", 1200, "https://Miel", "ABC002", 12);
        await newProductList.addProduct("Arroz", "Arroz grano largo", "Almacen", 100, "https://Arroz", "ABC003", 5);
        await newProductList.addProduct("Papa", "Papa blanca", "Almacen", 500, "https://Papa", "ABC004", 17);
        await newProductList.addProduct("Espinaca", "Espinaca congelada Granja del Sol", "Almacen", 150, "https://Espinaca", "ABC005", 15);
        await newProductList.addProduct("Lentejas", "Lentejas grandes enlatadas", "Almacen", 1700, "https://Lentejas", "ABC006", 20);
        await newProductList.addProduct("Yerba", "Yerba playadito", "Almacen", 200, "https://Yerba", "ABC007", 4);
        await newProductList.addProduct("Helado", "Helado casata", "Congelados", 2000, "https://Helado", "ABC008", 5);
        await newProductList.addProduct("Arvejas", "Arvejas en caja", "Enlatados", 1800, "https://Arvejas", "ABC009", 8);
        await newProductList.addProduct("Porotos", "Poroto negro en lata", "Enlatados", 2000, "https://Porotos", "ABC010", 3);
    }
}

//Listen server
const httpServer = app.listen(PORT, () => {
    console.log(`Abri el navegador en http://localhost:${PORT}`);
});

//Websocket
export const io = new Server(httpServer);