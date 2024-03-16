import mongoose from "mongoose";

await mongoose.connect("mongodb+srv://santiribot79:coderhouse@cluster0.dxp69gq.mongodb.net/tienda?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la DB"))
    .catch((error) => console.log("Error al conectarse: ", error));