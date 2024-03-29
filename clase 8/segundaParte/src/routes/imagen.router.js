import { Router } from "express";
import ImagenModel from "../models/imagen.js";
import { promises as fs } from "fs";

const router = Router();

router.get("/", async (req, res) => {
    const imagenes = await ImagenModel.find();

    const nuevoArrayImagenes = imagenes.map( imagen => {
        return{
            id: imagen._id,
            title: imagen.title,
            description: imagen.description,
            filename: imagen.filename,
            path: imagen.path
        }
    });

    res.render("index", {imagenes: nuevoArrayImagenes});
});

router.get("/upload", (req, res) => {
    res.render("upload");
});

router.post("/upload", async (req, res) => {
    try {
        const imagen = new ImagenModel();
        imagen.title = req.body.title;
        imagen.description = req.body.description;
        imagen.filename = req.file.filename;
        imagen.path = "/imagenes/" + req.file.filename;

        await imagen.save();

        res.redirect("/");
    } catch (error) {
        res.status(500).send({message: "Error del servidor"})
    }
});

router.get("/image/:id/delete", async (req, res) => {
    const {id} = req.params;
    const imagen = await ImagenModel.findByIdAndDelete(id);
    await fs.unlink("./src/public" + imagen.path);
    res.redirect("/");
});

export default router