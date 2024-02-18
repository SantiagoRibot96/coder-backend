import { Router } from "express";

const router = Router();

const productos = [
    {nombre: "fideos", descripcion: "los mas ricos", precio: 200},
    {nombre: "arroz", descripcion: "el que no se pasa", precio: 100},
    {nombre: "helado", descripcion: "congelados", precio: 300}
];

router.get("/", (req, res) => {
    const usuario = {
        nombre: "Tinki",
        apellido: "Winki",
        mayorEdad: true
    };

    res.render("index", {titulo: "Esto es un titulo", usuario, productos});
});

router.get("/contacto", (req, res) => {
    res.render("contacto", {titulo: "Contacto"});
});

export default router