/* 
Chat
*/

//Imports
import express from "express";
import exphbs from "express-handlebars";
import viewsRouter from "./routes/views.router.js";
import { Server } from "socket.io";

//Constantes de express
const app = express();
const PUERTO = 8080;

//Middleware para carpeta public
app.use(express.static("./src/public"));

//Configuracion de handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.use("/", viewsRouter);

//Listen
const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});

//Websocket
const io = new Server(httpServer);

let messages = [];

io.on("connection", (socket) => {
    console.log(`Se conecto un nuevo cliente`);

    socket.on("message", (data) => {
        messages.push(data);

        io.emit("messagesLogs", messages);
    });
});