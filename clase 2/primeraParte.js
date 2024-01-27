/* 
Clase 2 - Funcionalidades de ES
*/

//Desestructuracion

    const pelicula = {
        titulo: "El Padrino",
        director: "Francis Ford Coppola",
        genero: "Drama",
        lanzamiento: 1972
    };

    const {titulo, director, genero, lanzamiento} = pelicula;

    console.log(titulo);

    const numeros = [1, 2, 3, 4, 5];

    let [cero, , dos, tres, cuatro] = numeros;

    console.log(cero);

//Valores por defecto

    function saludar(nombre = "invitado") {
        console.log(`Hola ${nombre}`);
    }

    saludar("Firulais");
    saludar();

//Trabajo por modulos

    import productosMarolio from "./datos.js";

    console.log(productosMarolio);

//Exponenciacion **

    let base = 4;
    let exponente = 3;

    let resultado = base ** exponente;

    console.log(resultado);

//Metodo includes

    const losSimpsons = ["Homero", "Marge", "Bart", "Lisa", "Maggie"];

    console.log(losSimpsons.includes("Bart"));

    let frase = "Hola soy Bart Simpson";

    console.log(frase.includes("Bart"));

//Object.Values

    const empleado = {
        nombre: "Pepe",
        apellido: "Argento",
        edad: 45,
        puesto: "Vendedor de zapatos"
    };

    let resultadoValues = Object.values(empleado);

    console.log(resultadoValues);

//Object.entries

    let resultadoEntries = Object.entries(empleado);

    console.table(resultadoEntries);

    console.log(resultadoEntries);

//Object.keys

    let resultadoKeys = Object.keys(empleado);

    console.log(resultadoKeys);

//Spread operator

    let arrayNombres = ["Kelvis", "Lucas", "Gustavo"];

    console.log(...arrayNombres);

    const coky = {
        nombre: "Coky",
        apellido: "Argento",
        edad: 17
    };

    const alumno = coky;//Al hacer esto, paso el valor por referencia, no por copia. Esto quiere decir que si modifico alumno, modifico coky

    console.log(alumno);
    alumno.edad = 19;
    console.log(coky);

    const alumno2 = {...coky};//Al hacer esto, paso el valor por copia. Es la forma correcta

    console.log(alumno2);
    alumno2.edad = 17;
    console.log(coky);

    let numeros1 = [1, 2, 3, 4, 5];
    let numeros2 = [6, 7, 8, 9, 10];

    let numerosConcatenados = [...numeros1, ...numeros2];

    console.log(numerosConcatenados);

//Clases

    class Persona {
        constructor(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }

        saludar() {
            console.log(`Hola soy ${this.nombre} ${this.apellido}`);
        }
    }

    const persona = new Persona("Pepe", "Argento", 40);

    persona.saludar();

//Herencia

    class Estudiante extends Persona {
        #promedio;//Queda privada la variable promedio
        constructor(nombre, apellido, edad, carrera, promedio) {
            super(nombre, apellido, edad);
            this.carrera = carrera;
            this.#promedio = promedio;
        }

        get getPromedio() {
            return this.#promedio;
        }//El metodo get es necesario para poder acceder a esta variable
    }

    const estudiante = new Estudiante("Juan Roman", "Riquelme", 24, "Ingenieria", 7);

    console.log(estudiante.promedio);//No puedo acceder a promedio porque es privada

    console.log(estudiante.getPromedio);//A travez de un metodo get, si puedo acceder

