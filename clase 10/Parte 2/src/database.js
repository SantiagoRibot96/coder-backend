import mongoose from "mongoose";

mongoose.connect("mongodb+srv://santiribot79:coderhouse@cluster0.dxp69gq.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Nos conectamos a la DB"))
    .catch((error) => console.log(`No se pudo conectar a la DB ${error}`));