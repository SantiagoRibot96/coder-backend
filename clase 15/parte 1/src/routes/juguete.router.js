import express from "express";

import JugueteController from "../controllers/juguete.controller.js";

const router = express.Router();
const jugueteController = new JugueteController();

router.get("/", jugueteController.obtenerJuguetes);
router.post("/", jugueteController.crearJuguete);

export default router;