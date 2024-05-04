import JugueteModel from "../models/juguete.model.js";

class MongoJugueteDao {
    async crearJuguete(datosJuguete){
        try {
            const juguete = new JugueteModel(datosJuguete);
            return await juguete.save();
        } catch (error) {
            throw new Error("Error al crear el juguete en MongoDB");
        }
    }

    async obtenerJuguetes(){
        try {
            const juguetes = JugueteModel.find();
            return juguetes;
        } catch (error) {
            throw new Error("Error al obtener los juguetes en MongoDB");
        }
    }
}

export default MongoJugueteDao;