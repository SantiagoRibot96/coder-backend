/* Modelo por capas */
import express from "express";

import "./database.js";
import jueguesRouter from "./routes/juguetes.router.js";
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/juguetes", jueguesRouter);

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});