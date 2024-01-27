//Variables y metodos estaticos

    class Contador {
        static cantidad = 0;

        constructor() {
            Contador.cantidad++;
        }

        static obtenerCantidad() {
            return Contador.cantidad;
        }
    }

    let contador1 = new Contador();
    let contador2 = new Contador();
    let contador3 = new Contador();

    console.log(Contador.obtenerCantidad());

//Enfoque sincronico

    function a() {
        console.log("1");
        b();
    }

    function b() {
        console.log("2");
        c();
    }

    function c() {
        console.log("3");
    }

    a();

//Enfoque asincronico

    setTimeout(() => {
        console.log("Primer tarea");
    }, 3000);

    setTimeout(() => {
        console.log("Segunda tarea");
    }, 2000);

    console.log("Tercer tarea");

//Funcion Callback

    function suma(numA, numB, callback) {
        let resultado = numA + numB;
        callback(resultado);
    }

    function mostrarResultado(resultado) {
        console.log(resultado);
    }

    suma(8, 5, mostrarResultado);

//Metodo map

    let numeros = [1, 2, 3, 4, 5];

    const numerosMap = numeros.map(numero => numero*2);

    console.log(numerosMap);

    function mapear(array, callback) {
        let nuevoArray = [];

        for(let i = 0; i < array.length; i++) {
            nuevoArray.push(callback(array[i]));
        }

        return nuevoArray;
    }

    function duplicar(numero) {
        return numero*2;
    }

    console.log(mapear(numeros, duplicar));

//Promesas

    const promesa = new Promise((resolve, reject) => {

        let estado = false;

        if(estado) {
            resolve("Exito en la promesa");
        } else {
            reject("Error en la promesa, no se cumple");
        }
    });

    console.log(promesa);

//Then, catch y finally

    promesa
        .then(() => console.log("Estamos en el then"))
        .catch(() => console.log("Estamos en el catch"))
        .finally(() => console.log("Fin del proceso"));

//Ejemplo

    const productos = [
        {id: 1, nombre: "Mesa", precio: 5000},
        {id: 2, nombre: "Silla", precio: 8000},
        {id: 3, nombre: "Lampara", precio: 500},
        {id: 4, nombre: "Televisor", precio: 1000},
    ];

    function buscarProductoPorId(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const producto = productos.find((item) => item.id === id);

                if(producto) {
                    resolve(producto);
                }else {
                    reject("No existe ese producto");
                }

            }, 1000)
        })
    }

    console.log(buscarProductoPorId(3)); //El console log es mucho mas rapido que la promesa, porque le puse un timeout

    buscarProductoPorId(3)
        .then( producto => console.log(producto))
        .catch( error => console.log(error));

//Async-Await

    async function buscarProductoPorIdAsync(id) {
        const producto = await buscarProductoPorId(id);
        console.log(producto);
    }

    buscarProductoPorIdAsync(1);

//APIs
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
            .then(usuarios => console.table(usuarios))
        .catch(error => console.log(error));

//Try Catch - Manejo de errores
    async function buscarProductoPorIdAsyncNuevo(id) {
        try {
            const producto = await buscarProductoPorId(id);
            console.log(producto);
        }catch(error) {
            console.log(error);
        }
    }

    buscarProductoPorIdAsyncNuevo(4);

//Otro ejemplo de APIs
    async function pedirUsuarios() {
        const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");

        const usuarios = await respuesta.json();
        console.log(usuarios);
    }

    pedirUsuarios();