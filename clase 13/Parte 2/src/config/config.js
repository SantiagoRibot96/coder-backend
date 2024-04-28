import dotenv from "dotenv";//npm i dotenv

import program from "../utils/commander.js";

const { mode } = program.opts();

dotenv.config({
    path: mode === "produccion" ? "./.env.produccion" : "./.env.desarrollo"
});

const configObject = {
    port: process.env.PORT,
    mongo_url: process.env.MONGO_URL
}

console.log(configObject.port);
export default configObject;