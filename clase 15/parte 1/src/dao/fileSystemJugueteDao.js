import fs from "fs";

class FileSystemJugueteDao {
    async crearJuguete(datosJuguete){
        try {
            const juguetes = await this.leerArchivo();
            juguetes.push(datosJuguete);
            return await this.escribirArchivo(juguetes);
        } catch (error) {
            throw new Error("Error al crear un jugete en Filesystem");
        }
    }

    async obtenerJuguetes(){
        try {
            const juguetes = await this.leerArchivo();
            return juguetes;
        } catch (error) {
            throw new Error("Error al obtener los jugetes en Filesystem");
        }
    }

    async leerArchivo() {
        try {
            const data = await fs.promises.readFile("./juguetes.json");
            return JSON.parse(data);
        } catch (error) {
            throw new Error(error);
        }
    }

    async escribirArchivo(juguetes) {
        try {
            await fs.promises.writeFile("./juguetes.json", JSON.stringify(juguetes, null, 2));
            return juguetes;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default FileSystemJugueteDao;