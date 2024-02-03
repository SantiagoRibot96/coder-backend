//Importar Modulos propios con Common JS
    // const saludos = require("./saludosComm.js");

    // saludos.temprano();
    // saludos.tarde();
    // saludos.noche();

//Importar Modulos propios con ES Modules (funciona una o la otra, no las dos a la vez. Para esto hay que crear el package.json)
    import { temprano, tarde, noche } from "./saludosES.js"

    temprano();
    tarde();
    noche();

//Modulos nativos de Node:
/* 
    -fs: File System
    -http: para crear un servidor web
    -path: ara trabajar con rutas de archivos
    -crypto: para trabajar con encriptacion de datos
    -timers: para trabajar con tareas asincronicas
    -console: para mostrar los mensajes en consola
*/

//Modulos de terceros: NPM

//Para crear un nuevo package.json npm init

//Luego con npm install y el nombre, se instala una dependencia (por ejemplo sass)

//instalar dependencias de desarrollo: Aquellas que no va a usar el projecto final (nodemon por ejemplo) npm install dependencia -D

//Con npm start podemos hacer que se ejecute un comando preestablecido en package.json