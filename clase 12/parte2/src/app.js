/* Clase 12 - Ruteo avanzado */

/* 
1) Expresiones regulares
2) Restriccion de parametros
3) Validacion de parametros
4) Custom router
5) Custom response
*/

// //Validacion de correo electronico

// let correoIngresado = "lionel@messi.com";
// let correoFalso = "tinkiwinki"

// const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //expresion regular para validar un correo, sacado de chatGTP

// console.log(patronCorreo.test(correoIngresado));
// console.log(patronCorreo.test(correoFalso));

// //Validacion de numero de telefono "(xxx) xxx-xxxx"

// let telefonoIngresado = "(223) 669-1111";

// const patronTelefono = /\(\d{3}\) \d{3}-\d{4}/;

// console.log(patronTelefono.test(telefonoIngresado));

import express from "express";
import clientesRouter from "./routes/clientes.router.js";
import UserRouter from "./routes/user.router.js";

const userRouter = new UserRouter();
const app = express();
const PORT = 8080;

app.use("/users", userRouter.getRouter);
app.use("/clientes", clientesRouter);

app.get("*", (req, res) => {
    res.status(404).send({message: "recurso no encontrado"});
});

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});