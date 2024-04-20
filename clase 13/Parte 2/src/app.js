/* 
Process: es un objeto que guarda informacion sobre los procesos de nodejs: 
    -Uso de memoria  
    -Id del proceso
    -Sistema operativo

Cada vez que se ejecuta en la consola nose src/app.js se crea un objeto process
*/

console.log("Bienvenidos!");

// console.log(process);//Me muestra el objeto process completo

console.log(process.cwd());//Me muestra la raiz donde se ejecuta node

console.log(process.pid);//Me muestra el ID de proceso (Cada vez que ejecuto node src/app.js el id cambia)

console.log(process.memoryUsage());//Me muestra informacion sobre la memoria

console.log(process.version);//Me muestra la version de node que estamos usando

// process.exit();//Finaliza el proceso actual o el que pases por paramentro (pid)

// console.log("Texto adicional");

/*
Manejo de argumentos por consola
    funcion(arg1, arg2);

Le puedo pasar argumentos por consola:
    node src/app.js pepe tinkiwinki lionel
        -arg1: pepe
        -arg2: tinkiwinki
        -arg3: lionel

Puedo acceder con process.argv. Por ejemplo puedo pasar el puerto de apertura.
*/

console.log(process.argv);

/* 
Para facilitar el manejo por argumentos, vamos a usar commander:
    -npm i commander
    -utils/commander.js
*/

import express from "express";
import mongoose from "mongoose";

import configObject from "./config/config.js";
import UserModel from "./models/usuario.model.js";

const app = express();
const {mongo_url, port} = configObject;

mongoose.connect(mongo_url)
    .then(() => console.log(`Conectados a la DB ${mongo_url}`));

app.get("/", async (req, res) => {
    try {
        const usuarios = await UserModel.find();
        res.send(usuarios);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
});

/* 
Ahora este programa tiene dos opciones de modo:
    -node src/app.js --mode produccion: abre el puerto 8080 y se conecta a la db produccion
    -node src/app.js --mode desarrollo: abre el puerto 3000 y se conecta a la db desarrollo

Tambien puedo usar npm run dev o start que estan configurados con los flags en el package.json
*/

/* Procesos hijo */

import { fork } from "child_process"; //Es una dependencia nativa, no hay que instalar nada

// function operacionCompleja() {
//     let resultado = 0;

//     for(let i = 0; i<5e9; i++){
//         resultado += 1;
//     }

//     return resultado;
// }

// app.get("/suma", (req, res) => {
//     const resultado = operacionCompleja();
//     res.send(`El resultado es ${resultado}`);
// });

app.get("/suma", (req, res) => {
    const child = fork("./src/operacionesComplejas.js");
    child.send("iniciando");
    child.on("message", resultado => {
        res.send(`El resultado de la operacion es ${resultado}`);
    });
});//Me genero un nuevo proceso que corre en paralelo. Por lo cual si la operacion se demora mucho, yo puedo seguir interactuando con el servidor (En otra pestaña puedo ingresar a otro path)