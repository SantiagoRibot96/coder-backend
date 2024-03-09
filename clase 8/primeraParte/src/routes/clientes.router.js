import { Router } from "express";

const router = Router();

import ClientesModel from "../models/clientes.model.js";

router.get("/", async (req, res) => {
    try {
        const clientes = await ClientesModel.find();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({message: "Error en le servidor"});
    }
});

export default router;