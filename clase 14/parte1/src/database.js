import mongoose from "mongoose";
import configObject from "./config/config.js";

const { mongo_url } = configObject;

// mongoose.connect(mongo_url)
//     .then(() => console.log("Conectados a la DB"))
//     .catch((error) =>  console.log(`No se pudo conectar con la DB: ${error}`));

//Patron singleton

class BaseDatos {
    static #instancia;

    constructor() {
        mongoose.connect(mongo_url);
    }

    static getInstancia() {
        if(this.#instancia) {
            return this.#instancia;
        }

        this.#instancia = new BaseDatos();
        return this.#instancia;
    }
}

export default BaseDatos.getInstancia();