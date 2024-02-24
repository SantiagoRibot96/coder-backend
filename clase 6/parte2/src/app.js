/* 
1) instalar el modulo:                  npm i socket.io
2) importar el modulo:                  const socket = require("socket.io");
3) guardar una referencia del servidor: const httpServer = ....
4) creamos el socket:                   const io = socket(httpServer)
5) configuramos el socket:              io.on("connection", () => {...}
6) en este caso, desde el index.hbs:    <script src="https://cdn.socket.io/4.7.3/socket.io.min.js"></script>
7) instanciamos en main.js:             const socket = io();
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

const httpServer = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});

const io = socket(httpServer);

const usuarios = [
    {id: 1, nombre: "lionel", apellido: "messi"},
    {id: 2, nombre: "cristiano", apellido: "ronaldo"},
    {id: 3, nombre: "neymar", apellido: "jr"},
    {id: 4, nombre: "tinki winki", apellido: "teletubie"},
    {id: 5, nombre: "lala", apellido: "teletubie"},
    {id: 6, nombre: "dipsy", apellido: "teletubie"},
    {id: 7, nombre: "poo", apellido: "teletubie"}
];

io.on("connection", (socket) => {
    console.log(`Se conecto un nuevo cliente`);

    socket.on("mensaje", (data) => {
        console.log(data);
    });

    socket.emit("respuesta", usuarios);
});