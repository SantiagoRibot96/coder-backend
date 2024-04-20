import express from "express";
import exphbs from "express-handlebars"
import passport from "passport";
import cookieParser from "cookie-parser";

import viewsRouter from "./routes/views.router.js";
import usuarioRouter  from "./routes/usuario.router.js";
import initializePassport from "./config/passport.config.js";

import "./database.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());
app.use(passport.initialize());
initializePassport();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/", viewsRouter);
app.use("/", usuarioRouter);

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});