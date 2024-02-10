/* 
Clase 4 - Servidores WEB && EXPRESS
*/

//Servidores

/* 
Es un conjunto sw y hw que almacena y administra recursos. Estos pueden ser imagenes, archivos, texto, sitios web, datos, videos, etc. La funcion del servidor es responder las peticiones del cliente. Es importante aclarar que el servidor puede responder a multiples clientes al mismo tiempo (Modelo cliente-servidor).
*/

/* 
Cliente: El que hace el pedido
Servidor: Da la respuesta
*/

/* 
La comunicacion se hace atravez del protocolo HTTP (Hyper Text Transfer Protocol)

nodemon:    npm i nodeon -D
            Agregamos en package.json "dev": "nodemon src/app.js"
            npm run dev
Nos permite mantener el servidor vivo y que se actualice a cada cambio
*/

/* 
Modulo HTTP
*/

    // import http from "http";

    // const server = http.createServer( (request, response) => {
    //     console.log("Conectado!");
    //     response.end("<h1> Mi primer Hola Mundo desde backend </h1>");
    // });

    // const PORT = 8080;

    // server.listen(PORT, () => {
    //     console.log(`escuchando en el http://localhost:${PORT}`);
    // });

/*
Express JS: Es un framework minimalista de NodeJS que nos permite crear servidores web de una forma sencilla
    1)Instalamos: npm install express
    2)Importamos el modulo
    3)Creamos la app de express
    4)Creamos la ruta para conectarnos con la app
    5)Ponemos a escuchar el servidor
    6)Object Request

Los metodos HTTP son los que nos permiten indicarle al servidor que tipo de accion queremos realizar. Los mas usados:
    GET: Se utiliza para pedir datos
    POST: Se utiliza para enviar datos
    PUT: Se utiliza para actualizar datos
    DELETE: Se utiliza para elimminar datos
*/

    import express from "express";

    const app = express();

    const PORT = 8080;

    app.get("/", (req, res) => {
        res.send("Mi primer servidor desde Express JS");
    });

    app.get("/tienda", (req, res) => {
        res.send("Esta es la tienda");
    });

    app.listen(PORT, () => {
        console.log(`Escuchando en el puerto ${PORT}`);
    });

    const misProductos = [
        {id: 1, nombre: "Fideos", precio: 100},
        {id: 2, nombre: "Arroz", precio: 160},
        {id: 3, nombre: "Pan", precio: 290},
        {id: 4, nombre: "Helado", precio: 280},
        {id: 5, nombre: "Galletitas", precio: 150},
        {id: 6, nombre: "Mermelada", precio: 60},
        {id: 7, nombre: "Queso", precio: 120},
        {id: 8, nombre: "Gaseosa", precio: 2000}
    ];

    app.get("/productos", (req, res) => {
        res.send(misProductos);
    });

    app.get("/productos/:id", (req, res) => {
        const id = req.params.id;//NOTA: Siempre que recupero un dato de los params, es un STRING

        const producto = misProductos.find(producto => producto.id == id);

        if(producto){
            res.send(producto);
        }else {
            res.send("Producto no encontrado");
        }
    });

    app.get("/clientes", (req, res) => {
        let {nombre, apellido} = req.query;

        res.send(`Bienvenido cliente ${nombre} ${apellido}`)
    });//Por ejemplo http://localhost:8080/clientes?nombre=Santiago&apellido=Ribot

    app.get("/product", (req, res) => {
        let limit = parseInt(req.query.limit);

        const productos = misProductos.slice(0, limit);
        res.send(productos);
    });