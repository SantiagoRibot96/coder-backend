import express from "express";

import "./database.js";
import jugueteRouter from "./routes/juguete.router.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", jugueteRouter);

app.listen(PORT, () => {
    console.log("Conectados en el puerto 8080");
});