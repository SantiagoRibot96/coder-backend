/* Clase 8 */

/* 
1) npm install mongoose
2) import mongoose from "mongoose" en models
3) Definimos un esquema: Un objeto que nos permite configurar los documentos
4) Creamos un modelo: Una clase con sus metodos que nos va a permitir trabajar la DB
5) Coneccion con mongo atlas
*/

import express from "express";
import clientesRouter from "./routes/clientes.router.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/clientes", clientesRouter);

app.listen(PORT, () => {
    console.log(`Estamos conectados al puerto ${PORT}`);
})


//Coneccion con la DB
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://santiribot79:coderhouse@cluster0.dxp69gq.mongodb.net/tienda?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectamos la DB"))
    .catch(() => console.log("No se pudo conectar"));