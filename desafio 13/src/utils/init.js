//Modules
import express from "express";
import exphbs from "express-handlebars";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

import { Server } from "socket.io";
import "../database.js";
import "../config/config.js";
import initializePassport from "../config/passport.config.js";
import addLogger from "./logger.js";

export const app = express();
export const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("*/css", express.static("./src/public/css"));
app.use("*/js", express.static("./src/public/js"));

app.use(session({
    secret: "secretCoder",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://santiribot79:coderhouse@cluster0.dxp69gq.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0",
        ttl: 100000
    })
}));

app.engine("handlebars", exphbs.engine({
    runtimeOptions:{
        allowProtoMethodsByDefault:true,
        allowProtoPropertiesByDefault:true,
    }})
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(cookieParser());

app.use(passport.initialize());
initializePassport();

app.use(addLogger);

//Swagger
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación del Ecommerce de Ribot", 
            description: "App para venta de productos al por menor"
        }
    },
    apis: ["./src/docs/**/*.yaml"]
}

const specs = swaggerJSDoc(swaggerOptions);

app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

//Listen server
const httpServer = app.listen(PORT, () => {
    console.log(`Abri el navegador en http://localhost:${PORT}`);
});

//Websocket
export const io = new Server(httpServer);