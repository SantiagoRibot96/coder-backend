/* 
Clase 3: Manejo de archivos y NPM
*/

// File System
    const { log } = require("console");
const fs = require("fs");

    //console.log(fs);

// Manejo de archivos de forma sincronica
    const rutaSin = "./ejemplo-sin.txt";//Creo una ruta local de un txt

    fs.writeFileSync(rutaSin, "Hola mi nombre es Santiago");//Escribo un archivo

    let contenido;

    if(fs.existsSync(rutaSin)){//Primero pregunto si efectivamente el archivo existe
        contenido = fs.readFileSync(rutaSin, "utf-8");//Leo un archivo
    }
    
    console.log(contenido);

    fs.writeFileSync(rutaSin, "Hola mundo");//Actualizo la informacion (Piso contenido!)

    fs.appendFileSync(rutaSin, "\nSoy santiago");//Actualizo la informacion (Agrego al final)

    if(fs.existsSync(rutaSin)){
        contenido = fs.readFileSync(rutaSin, "utf-8");
    }
    
    console.log(contenido);

    fs.unlinkSync(rutaSin);//Elimino el archivo

// Manejo de archivos con Callback
    const rutaCall = "./ejemplo-call.txt";

    fs.writeFile(rutaCall, "Hola, estamos trabajando con callbacks", (error) => {
        if(error) {
            return console.log("No se pudo crear el archivo");
        }
    });

    fs.readFile(rutaCall, "utf-8", (error, cont) => {
        if(error) {
            return console.log("No se pudo leer el archivo");
        }

        console.log(cont);
    });

    fs.appendFile(rutaCall, "Estoy agregando al final", (error) => {
        if(error) {
            return console.log("No se pudo agregar al final");
        }
    });

    fs.unlink(rutaCall, (error) => {
        if(error) {
            return console.log("No se pudo borrar el archivo");
        }
    });

// Manejo de archivos con promesas
    const rutaProm = "./ejemplo-prom.txt";

    const operacionesAsincronicas = async () => {
        await fs.promises.writeFile(rutaProm, "Soy un archivo creado atravez de una promesa");

        let respuesta = await fs.promises.readFile(rutaProm, "utf-8");

        console.log(respuesta);

        await fs.promises.appendFile(rutaProm, "\nEstoy agregando algo al final");

        respuesta = await fs.promises.readFile(rutaProm, "utf-8");

        console.log(respuesta);

        await fs.promises.unlink(rutaProm);
    }

    operacionesAsincronicas();

// Manejo de datos complejos
    const arrayPersonas = [
        {nombre: "pepe", apellido: "argento", edad: 50},
        {nombre: "moni", apellido: "argento", edad: 38},
        {nombre: "paola", apellido: "argento", edad: 17},
        {nombre: "coki", apellido: "argento", edad: 20},
        {nombre: "fatiga", apellido: "argento", edad: 8}
    ];

    const nuevaPersona = {
        nombre: "santiago",
        apellido: "ribot",
        edad: 27
    }

    const archivoArgento = "./archivo-argento.json";

    const guardarArchivos = async () => {
        await fs.promises.writeFile(archivoArgento, JSON.stringify(arrayPersonas, null, 2));
    }

    const mostrarArchivos = async () => {
        let res = await fs.promises.readFile(archivoArgento, "utf-8");

        console.log(JSON.parse(res));
    }

    guardarArchivos();
    mostrarArchivos();

// Ejemplo
    const fs2 = require("fs").promises;

    class ManagerUsuarios {
        constructor() {
            this.rutaArchivo = "./usuarios.json";
        }

        async crearUsuario(usuarioNuevo) {
            try {
                const usuariosActuales = await this.leerUsuarios();
                usuariosActuales.push(usuarioNuevo);
                await this.guardarUsuarios(usuariosActuales);
            } catch(error) {
                console.log("Error al crear el usuario");
            }
        }

        async leerUsuarios() {
            try {
                const conteni2 = await fs2.readFile(this.rutaArchivo, "utf-8");

                return JSON.parse(conteni2);
            } catch (error) {
                console.log("Error al leer los usuarios");
            }
        }

        async guardarUsuarios(usuarios) {
            try {
                await fs2.writeFile(this.rutaArchivo, JSON.stringify(usuarios, null, 2));
            } catch (error) {
                console.log("Error al guardar los usuarios");
            }
        }

        async mostrarUsuarios(){
            try {
                const conteni2 = await fs2.readFile(this.rutaArchivo, "utf-8");

                console.log(JSON.parse(conteni2));
            } catch (error) {
                console.log("No se pudieron mostrar los usuarios");
            }
        }
    }

    const manager = new ManagerUsuarios();

    manager.crearUsuario({
        nombre: "tinki",
        apellido: "winki",
        edad: 18,
        curso: "Backend"
    });

    manager.mostrarUsuarios();