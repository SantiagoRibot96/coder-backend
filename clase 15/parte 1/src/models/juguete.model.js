import mongoose from "mongoose";

const schema = new mongoose.Schema({
    nombre: String, 
    categoria: String,
    precio: Number,
    fullname: {
        String,
        required: true
    }
});

const JugueteModel = mongoose.model("juguetes", schema);

export default JugueteModel;