import express from "express";

import addLogger from "./utils/logger.js";

const app = express();
const PORT = 8080;

app.use(addLogger);

app.get("/firulais", (req, res) => {
    res.send("Hola");
});

app.get("/loggertest", (req, res) => {
    req.logger.debug("Mensaje de debug");
    req.logger.http("Mensaje de HTTP");
    req.logger.warning("Mensaje de warning");
    req.logger.info("Mensaje de info");
    req.logger.error("Mensaje de error");

    res.send("Logs generados");
});

app.listen(PORT, () => {
    console.log("Escuchando en el puerto 8080");
});