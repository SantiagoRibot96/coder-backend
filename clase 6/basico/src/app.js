/* 
1) npm i socket.io
2) const socket = require("socket.io");
*/

const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const socket = require("socket.io");
const viewsRouter = require("./routes/views.router.js")

app.use(express.static("./src/public"));

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/", viewsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
})