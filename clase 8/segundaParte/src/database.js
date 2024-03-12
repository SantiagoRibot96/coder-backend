import mongoose from "mongoose";

mongoose.connect("mongodb+srv://santiribot79:coderhouse@cluster0.dxp69gq.mongodb.net/Coderest?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectado a mongodb"))
    .catch((error) => console.log("Error en la coneccion", error));