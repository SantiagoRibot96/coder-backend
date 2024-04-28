import JugueteModel from "../models/juguetes.model.js";

class JugueteService {
    async crearJuguete(datosJuguete) {
        try {
            const juguete = new JugueteModel(datosJuguete);
            return await juguete.save();
        } catch (error) {
            throw new Error(`Error al crear el juguete ${error}`);
        }
    }

    async obtenerJuguetes() {
        try {
            const juguetes = await JugueteModel.find();
            return juguetes;
        } catch (error) {
            throw new Error(`Error al obtener los juguetes ${error}`);
        }
    }
}

export default JugueteService;