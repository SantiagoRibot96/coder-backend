/* 
Motores de plantillas - Express handlebars

1)npm install express-handlebars
2)import exphbs from "express-handlebars";
3)app.engine("handlebars", exphbs.engine());
4)app.set("view engine", "handlebars");
5)app.set("views", "./src/views");
6)res.render("index");

*/

import express from "express";
import exphbs from "express-handlebars";
import viewsRouter from "./routes/views.router.js";

const app = express();
const PORT = 8080;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/", viewsRouter);
app.get("/contacto", viewsRouter);


app.use(express.static("./src/public"));

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});
