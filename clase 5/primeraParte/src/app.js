import express from "express";
import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";

const app = express();

const PUERTO = 8080;

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});

// app.use(express.static("public"));

app.use("/static", express.static("public"));

/* import express from "express";
import multer from "multer";

const app = express();
const PUERTO = 8080;
app.use(express.json());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/img");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

app.post("/upload", upload.single("imagen"), (req, res) => {
    res.send("Imagen creada");
}); */