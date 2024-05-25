import express from "express";

import { CustomError } from "../services/errors/custom-error.js";
import { generarInfoError } from "../services/errors/info.js";
import { EErrors } from "../services/errors/enum.js";

const router = express.Router();
const arrayUsuario = [];

router.post("/", async (req, res, next) => {
    const {name, last_name, email} = req.body;

    try {
        if(!name || !last_name || !email){
            throw CustomError.createError({
                name: "Usuario nuevo",
                source: generarInfoError({name, last_name, email}),
                message: "Error al intentar crear el usuario",
                code: EErrors.INVALID_TYPES_ERROR
            });
        }

        const usuario = {
            name,
            last_name,
            email
        }

        arrayUsuario.push(usuario);
        res.status(200).send(`Creacion exitosa del usuario`);
    } catch (error) {
        next(error); //para manejar el error con un middleware
    }
});

export default router