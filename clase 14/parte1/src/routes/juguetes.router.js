import express from "express";
import JugueteController from "../controller/juguetes.controller.js";

const router = express.Router();
const jugueteController = new JugueteController();

router.post("/", jugueteController.crearJuguete);
router.get("/", jugueteController.obtenerJuguetes);

export default router;