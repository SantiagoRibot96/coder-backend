import express from "express";

const router = express.Router();

const pets = [];

router.post("/", (req, res) => {
    const nuevaMascota = req.body;
    pets.push(nuevaMascota);
    res.send({status: "success", message: "Mascota nueva creada"});
});

router.get("/", (req, res) => {
    res.json(pets);
});

export default router