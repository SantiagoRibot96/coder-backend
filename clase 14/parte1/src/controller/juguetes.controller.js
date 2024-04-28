import JugueteService from "../services/juguetes.service.js";

const jugueteService = new JugueteService();

class JugueteController {
    async crearJuguete(req, res){
        const jugueteNuevo = req.body;
        try {
            await jugueteService.crearJuguete(jugueteNuevo);
            res.json(jugueteNuevo);
        } catch (error) {
            res.status(500).json(`Error al crear el juguete ${error}`);
        }
    }

    async obtenerJuguetes(req, res){
        try {
            const juguetes = await jugueteService.obtenerJuguetes();
            res.json(juguetes);
        } catch (error) {
            res.status(500).json(`Error al obtener los juguetes ${error}`);
        }
    }
}

export default JugueteController;