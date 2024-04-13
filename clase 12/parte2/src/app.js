/*
1) Muchos pasos para crear la app en github (Ver diapo)
2) npm i passport-github2
3) import en passport

JsonWebToken
1) npm i jsoonwebtoken
*/

import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import exphbs from "express-handlebars";
import passport from "passport";

import "./database.js";
import sessionsRouter from "./routes/sessions.router.js";
import viewsRouter from "./routes/views.router.js";
import initializePassport from "./config/passport.config.js";


const app = express(); 
const PUERTO = 8080; 

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware de Session: 
app.use(session({
    secret:"secretCoder",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://santiribot79:coderhouse@cluster0.dxp69gq.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0", ttl: 100000
    })
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Rutas

app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);


//Listen
app.listen(PUERTO, ()=> {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
});