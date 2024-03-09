import mongoose, { mongo } from "mongoose";

const clientesSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    edad: Number
});//Podria decir que uno de los datos es "unique" para asegurarme que ese dato sea unico en toda mi base de datos

const ClientesModel = mongoose.model("clientes", clientesSchema);

export default ClientesModel;