/* 
Plantillas literales
*/

    let mascota = "Fatiga";
    let mascotaEdad = 6;

    console.log("Nuestro perro es " + mascota + " y tiene " + mascotaEdad + " años");

    console.log(`Nuestro perro es ${mascota} y tiene ${mascotaEdad+1}`);


/*
Funciones
*/

    //Funciones declaradas

    function funcionDeclarada(param) {
        console.log(param);
    }

    funcionDeclarada("Soy una funcion declarada");

    //Funciones expresivas

    let funcionExpresiva = function(param) {
        console.log(param);
    }

    funcionExpresiva("Soy una funcion expresiva anonima");

    const funcionFlechita = (param) => {
        console.log(param);
    }

    funcionFlechita("Soy una funcion expresiva flechita");

/* 
Scope de una variable
*/

    let global = 2024; //esta variable como esta por fuera de todo, tiene como ambito de accion todo el codigo.

    function saludo() {
        let local = "backend"; //esta variable como esta dentro de una funcion, tiene como ambito de accion solo la funcion

        console.log(`Hola, estamos en el año ${global} haciendo ${local}`);
    }

    saludo();

    // console.log(local); //arroja error, porque no corresponde a este scope local

/* 
Closures: Hace referencia a la capacidad de una funcion anidada de acceder a las variables de su funcion padre. Se utilizaba cuando todavia no existian las Clases
*/

    function padre() {
        let deuda = 150;

        function anidada() {
            console.log(deuda);
        }

        return anidada;
    }

    let clausula = padre();

    clausula();

/* 
Clases: son moldes para realizar objetos con caracteristicas similares
*/

    class Persona {
        //Constructor
        constructor(nombre, edad) {
            this.nombre = nombre;
            this.edad = edad;
        }

        //Metodos
        saludo() {
            console.log(`Hola soy ${this.nombre}`);
        }

        despedir() {
            console.log(`${this.nombre} out!`);
        }

        //Metodos estaticos => pertenecen unicamente a la clase
        static planeta = "Tierra";
    }

    let coky = new Persona("Coky", 20);
    console.log(coky);
    coky.saludo();

    let paola = new Persona("Paola", 18);
    console.log(paola);
    paola.saludo();
    paola.despedir();

    console.log(Persona.planeta);

    //Herencia: Es la capacidad de una clase de heredar propiedades y metodos

    class Empleado extends Persona {
        constructor(nombre, edad, sueldo) {
            super(nombre, edad);//Si no voy a cambiar nada en nombre y edad, lo puedo poner dentro de super
            this.sueldo = sueldo;
        }

        //Si bien tengo mis nuevos metodos, tengo los viejos tambien

        pago() {
            console.log(`Hay que pagarle ${this.sueldo}`);
        }

        saludo2() {
            console.log(`Hola te vuelvo a saludar soy ${this.nombre}`);
        }

        //Si hago un metodo que se llama igual, va a respetar el de esta clase.

        // saludo() {
        //     console.log(`Soy ${this.nombre}`);
        // }
    }

    let raul = new Empleado("Raul", 45, 150000);
    console.log(raul);
    raul.saludo();
    raul.despedir();
    raul.pago();
    raul.saludo2();

    //Prototipo: Es un objeto del cual otro objeto hereda sus propiedades

    const animal = {
        especie: "Animal",
        comer: function() {
            console.log("Comiendo");
        }
    }

    const gato = {
        raza: "Gato",
        maullar: function() {
            console.log("Miau");
        }
    }

    gato.__proto__ = animal;//De esta forma gato hereda todas las propiedades y metodos de animal. Animal es un PROTOTIPO
    gato.comer();

    
    //En lugar de utlizar proto podemos utilizar Object.create()