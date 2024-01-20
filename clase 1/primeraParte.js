/* 
Tipos de Datos:
    -Primitivos: string, number, booleanos, undefined, null
    -Objetos: objetos, arrays y funciones
*/

    // Primitivos

    let alumno; //variable

    console.log( alumno); //undefined

    alumno = "tinky winki"; //asignacion

    console.log( alumno);  //tinky winki

    console.log( typeof alumno); //string

    alumno = 10; //asignacion

    console.log( alumno, typeof alumno); //10, number

    const nacimiento = 1996; //constante, siempre debe ser inicializada. No puede cambiar su valor

    console.log( nacimiento); //1996

    // nacimiento = 1997; //da error

/* 
Expresiones: Es una combinacion de valores, variables y operadores que se pueden evaluar para producir un resultado
*/

    let ejemploExpresionBooleana = 10 > 5; //Como resultado da True o False

    console.log( ejemploExpresionBooleana); //true

    // Objetos

    let unArray = [15, true, "tengo hambre", null];

    console.log( unArray);

    let unObjeto = {
        nombre: "roman",
        raza: "perro",
        edad: 5,
        color: "blanco"
    };

    console.log( unObjeto);

    unObjeto.nombre = "luna";

    console.log( unObjeto);