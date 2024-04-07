import mongoose from "mongoose";

mongoose.connect("mongodb+srv://santiribot79:coderhouse@cluster0.dxp69gq.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Siii nos conectamos a la BD"))
    .catch((error ) => console.log("SEVEN DAYS ", error))