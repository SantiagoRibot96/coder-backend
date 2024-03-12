/* 
Actividad integradora
    -Clases
    -Express
    -Router y Multer
    -Express Handlebars
    -Mongodb y Mongoose
*/

import express from "express";
import exphbs from "express-handlebars";
import multer from "multer";
import "../src/database.js";
import imagenRouter from "./routes/imagen.router.js";

const app = express();
const PORT = 8080;

//Express-Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));

//Configuracion Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./src/public/imagenes");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

app.use(multer({storage}).single("image"));

//Configuramos las rutas
app.use("/", imagenRouter);

//Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});