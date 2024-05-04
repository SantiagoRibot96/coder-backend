# Aqui yace toda la info de las clases de Backend de CoderHouse

## Clase 1:

Introduccion y repaso desde cero de JavaScript

- Java desde cero
- Clases y constructores
- Herencia y prototipos

## Clase 2:

Repaso de lo que trae ES

- Desestructuracion
- Valores por defecto
- Trabajo por modulos
- Exponenciacion **
- Metodo Includes
- Async y Await
- Metodos estaticos
- Values, entries y keys
- Finally
- Spread operator
- Propiedades privadas de clases
- Callback
- Promesas
- APIs

## Clase 3:

Manejo de archivos y NPM

- File System

- Manejo de archivos con callback

- Manejo de archivos con promesas

- Manejo de datos complejos

- Ejemplo de desafio 2

- Node y NPM

- Modulos nativos de Node

- NPM: Manjeo de paquetes de terceros

- Pasos para instalar una dependencia

- Instalaciones globales vs locales

- Versionado de dependencias

- Politivas de actualizacion de dependencias

- Importar Modulos propios

## Clase 4:

Servidores WEB y EXPRESS

- Que es un servidor
- Protocolo HTTP
- Modulo nativo HTTP
- Express JS (Framework)
- Object request
- nodemon
- API rest
- Peticiones
- Postman

## Clase 5

- Express router
- Middleware
- Servicios de archivos estaticos
- Multer
- Motores de plantillas
- Handlebars
- Estructuras, condicionales y ciclos
- Router de Handlebars
- JS y CSS cliente

## Clase 6

Websocket

- repaso de DOM
- repaso de handlebars
- programa basico
- chat con websocket

## Clase 7

MongoDB

- Instalamos MongoDB y Mongosh
- mongosh: Abre la consola
- show dbs: Muestra las bases de datos
- use nombreDB: Crea una nueva DB y se posiciona en ella. Si ya existe, solo se posiciona. La base "test" es una suerte de root.
- db.createCollection("nombreCollection")
- show collections: Muestra las colecciones de una db
- db.nombreCollection.drop(): Borra la coleccion
- db.nombreDB.drop(): Borra la DB. Tambien se puede usar db.dropDatabase() si estas dentro de la db a eliminar
- db.nombreCollection.insertOne({"clave": "valor", "clave": "valor", "clave": "valor"}): Crea un nuevo objeto en la coleccion. Le asigna un ID. (Se pega con click derecho)
- db.nombreCollection.find(): Muestra los objetos de la coleccion
- db.nombreCollection.insertMany([{objeto1}, {objeto2}, {objeto3}]): Inserta varios objetos a la vez.
- db.nombreCollection.findOne({"clave": "valor"}): Devuelve el primer objeto que cumple con la condicion
- db.nombreCollection.find({"clave": "valor"}): Devuelve todos los objetos con esa condicion
- db.nombreCollection.estimatedDocumentCount(): Hace un estimativo segun la metadata de la db
- db.nombreCollection.countDocuments(): Cuenta uno a uno los objetos de la base
- db.nombreCollection.find({$op: [{"clave":"Valor"},{"clave":"valor"}]}): Los operadores pueden ser: and, or, it(coincide con valores que son menores a un valor especificado), ite(coincide con valores menores o iguales), gt(coincide con valores mayores), gte(coincide con valores mayores o iguales), ne(coincide con valores que no son iguales), eq(coincide con valores que son iguales), exists(existe el campo), in(selecciona los documentos en un array), nin(coincide con ninguno de los valores), size(coincide con el numero de elementos), all(coincide con todos los valores definidos dentro de un array), elemMatch(coincide con algun valor dentro del query)

## Clase 8

- Clientes de base de datos
- MongoDB Compass
- MongoDB Atlas
- DBaas (Database as a service)
- Configuracion e instalacion de Mongoose
- CRUD en nuestr APP

## Clase 9
- Teoria de la indexacion
- Manejo de Populations en MongoDB
- Middleware PRE
- MongoDB Avanzado
- Paginacion
- Agregaciones

## Clase 10
- Cookies
- Set, get, clear cookies
- Cookies firmadas
- Session storage

## Clase 11
- Bcrypt (hasheo de passwords)
- Passport - Estrategias de autenticacion
- Metodos de autenticacion (google, github, JSON web token)
- Autenticacion vs autorizacion

## Clase 12
- JWT con localStorage
- JWT con cookies
- Privilegios de usuarios
- Passport avanzado y JWT
- Router avanzado

## Clase 13
- Repaso y practica integradora de JWT
- Proceso principal del servidor
- Manejo de argumentos por consola
- Proceso global
- Child process
- Variables de entorno
- Listener

## Clase 14
- Modelo de capas - Separar por responsabilidades
- Separacion del proyecto
- Orden del proyecto
- Sigleton
- Buenas practicas de programacion

## Clase 15
- DAO
- Patron de diseño "Factory"
- DTO