import { EErrors } from "../services/errors/enum.js";

export const errorHandler = (error, req, res, next) => {
    console.log(error.source);

    switch(error.code) {
        case EErrors.BD_ERROR:
            break;
        case EErrors.INVALID_TYPES_ERROR:
            res.send({status: "error", error: error.name});
            break;
        case EErrors.RUTA_ERROR:
            break;
        default:
            res.send({status: "error", error: "Error desconocido"});
            break;
    }
}