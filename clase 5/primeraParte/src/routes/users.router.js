import express from "express";

const router = express.Router();

const users = [];

router.get("/", (req, res) => {
    res.json(users);
});

router.post("/", (req, res) => {
    const nuevoUsuario = req.body;
    users.push(nuevoUsuario);
    res.send({status: "success", message: "Usuario nuevo creado"});
});

export default router