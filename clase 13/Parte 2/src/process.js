/* 
Listeners: process.on() es un metodo que nos permite registrar escuchadores de eventos.
    -exit: Para ejecutar un codigo antes de que se finalice el proceso
    -uncaughtException: Para atrapar alguna excepcion que no haya sido atrapada por trycatch
    -message: Para comunicarce con otros procesos
*/

/* 
Codigo de salida de procesos: Cuando se termina un programa, podemos enviar un codigo para saber si el proceso se ejecuto bien, si hubo errores, etc.
    -0 proceso finalizado normalmente
    -1 proceso finalizado por excepcion fatal
    -5 error fatal
    -9 argumentos invalidos de ejecucion
*/

// process.on("exit", () => {
//     console.log("Me estoy apagando, ayuda!");
// });

// console.log("Hola mundo!");

// process.exit();

// console.log("Esto ya no se ve");

//////////////////////////////////////////////////////////////////////////

// process.on("uncaughtException", () => {
//     console.log("Error inesperado");
// });

// firulais();

// process.on("exit", (code) => {
//     console.log(`Error al finalizar el proceso ${code}`);
// });

// process.on("uncaughtException", () => {
//     process.exitCode = 1;
// });

// firulais();//firulais() es una funcion que no existe.

// console.log("Esto no se ve");

//////////////////////////////////////////////////////////////////////////