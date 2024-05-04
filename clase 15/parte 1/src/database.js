import mongoose from "mongoose";

mongoose.connect("mongodb+srv://santiribot79:coderhouse@cluster0.dxp69gq.mongodb.net/Jugueteria?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la DB"))
    .catch((error) => console.log("No nos pudimos conectar", error));