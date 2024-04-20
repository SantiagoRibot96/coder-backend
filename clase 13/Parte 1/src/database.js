import mongoose from "mongoose";

mongoose.connect("mongodb+srv://santiribot79:coderhouse@cluster0.dxp69gq.mongodb.net/JWT?retryWrites=true&w=majority&appName=Cluster0")
    .then(() =>  console.log("Conectados a la db"))
    .catch((error) => console.log(error));