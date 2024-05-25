/*
Compresion
1- npm i express-compression
2- import
3- middleware
*/

import express from "express";
import compression  from "express-compression";
import userRouter from "./routes/users.router.js";
import { errorHandler } from "./middleware/error.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
// app.use(compression()); Utiliza gzip
app.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
    }
})); //Utiliza brotli

app.get("/", (req, res) => {
    let string = "Hola este es un string largo aproposito ";

    for(let i = 0; i < 5e4; i++){
        string += "Hola este es un string largo aproposito";
    }

    res.send(string);
});

app.use("/user", userRouter);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Conectados al puerto ${PORT}`);
});