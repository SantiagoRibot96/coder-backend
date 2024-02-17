import express from "express";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";

const app = express();

const PUERTO = 8080;

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});