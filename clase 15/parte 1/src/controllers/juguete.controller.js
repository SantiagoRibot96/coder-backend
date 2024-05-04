// import MemoryJugueteDao from "../dao/memoryJugueteDao.js";
// const jugueteService = new MemoryJugueteDao();

// import MongoJugueteDao from "../dao/memoryJugueteDao.js";
// const jugueteService = new MongoJugueteDao();

// import FileSystemJugueteDao from "../dao/filesystemJugueteDao.js";
// const jugueteService = new FileSystemJugueteDao();

import JugueteDTO from "../dto/juguete.dto.js";
import DAO from "../dao/factory.js";
const jugueteService = new DAO();

class JugueteController {
    async obtenerJuguetes(req, res){
        try {
            const juguetes = await jugueteService.obtenerJuguetes();
            res.json(juguetes)
        } catch (error) {
            res.status(500).send("Error del servidor");
        }
    }

    async crearJuguete(req, res){
        try {
            const {nombre, categoria, precio} = req.body;
            const jugueteDTO = new JugueteDTO(nombre, categoria, precio);
            const juguete = await jugueteService.crearJuguete(jugueteDTO);
            res.json(juguete);
        } catch (error) {
            res.status(500).send("Error del servidor");
        }
    }
}

export default JugueteController;