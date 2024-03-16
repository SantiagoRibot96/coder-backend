/* INDEXACION */
// import mongoose from "mongoose";
// import UserModel from "./models/user.js";

// const main = async () => {
//     await mongoose.connect("mongodb+srv://santiribot79:coderhouse@cluster0.dxp69gq.mongodb.net/tienda?retryWrites=true&w=majority&appName=Cluster0");

//     const respuesta = await UserModel.find().explain("executionStats");
//     console.log(respuesta);


// }

// main();

/* POPULATION y PRE*/
import mongoose from "mongoose";
import {AlumnoModel} from "./models/alumno.js";
import {CursoModel} from "./models/curso.js";

const main = async () => {
    await mongoose.connect("mongodb+srv://santiribot79:coderhouse@cluster0.dxp69gq.mongodb.net/tienda?retryWrites=true&w=majority&appName=Cluster0");

    // const respuesta = await AlumnoModel.find();
    // console.log(respuesta);

    const estudiante = await AlumnoModel.findById("65f5c08c2f5a2151ee8da4a3");
    // console.log(estudiante);

    const curso = await CursoModel.findById("65f5c0822f5a2151ee8da49f");
    // console.log(curso);

    // estudiante.cursos.push(curso);

    // await AlumnoModel.findByIdAndUpdate("65f5c08c2f5a2151ee8da4a3", estudiante);

    // const estudianteConCursoAsignado = await AlumnoModel.findById("65f5c08c2f5a2151ee8da4a3").populate("cursos");
    // console.log(estudianteConCursoAsignado);

    const estudianteConCursoAsignado = await AlumnoModel.findById("65f5c08c2f5a2151ee8da4a3");
    console.log(estudianteConCursoAsignado);
}

main();