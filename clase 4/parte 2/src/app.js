/* 
Express Avanzado
*/

/* 
Codigos de estado: Son las respuestas del servidor, que nos dan informacion sobre el estado del request.
    1xx: Son respuestas informativas
    2xx: Son respuestas exitosas
    3xx: Son redirecciones
    4xx: Son errores en la peticion del cliente
    5xx: Son errores del servidor
*/

/* 
API: Application Programming Interface: Es un conjunto de reglas que ayudan a conectar el front y el back
*/

    import express from "express";
    const app = express();
    const PORT = 8080;

    app.use(express.json());//Para poder recibir archivos json
    app.use(express.urlencoded({extended:true}));// Para poder recibir archivos complejos

    app.listen(PORT, () => {
        console.log(`Escuchando ${PORT}`);
    });

    const clientes = [
        {id: "1", nombre: "Lionel", apellido: "Messi"},
        {id: "2", nombre: "Lautaro", apellido: "Martinez"},
        {id: "3", nombre: "Fideo", apellido: "Di Maria"}
    ];

    app.get("/", (req, res) => {
        res.send(clientes);
    });

    app.get("/:id", (req, res) => {
        const {id} = req.params;

        const cliente = clientes.find(cliente => cliente.id == id);

        if(cliente){
            res.send(cliente);
        }else {
            res.send(`Cliente con id ${id} no encontrado`);
        }
    });

    app.post("/", (req, res) => {
        const clienteNuevo = req.body;

        clientes.push(clienteNuevo);

        console.log(clientes);

        res.send({status:"succes", message: "Cliente creado"});
    });

    app.put("/:id", (req, res) => {
        const {id} = req.params;

        const {nombre, apellido} = req.body;

        const clienteIndex = clientes.findIndex(cliente => cliente.id == id);

        if(clienteIndex !== -1){
            clientes[clienteIndex].nombre = nombre;
            clientes[clienteIndex].apellido = apellido;
            
            console.log(clientes);
            res.send({status: "succes", message: "Cliente actualizado"});
        }else{
            res.send("No se encontro al cliente");
        }
    });

    app.delete("/:id", (req, res) => {
        const {id} = req.params;

        const clienteIndex = clientes.findIndex(cliente => cliente.id == id);

        if(clienteIndex !== -1){
            clientes.splice(clienteIndex, 1);

            console.log(clientes);
            res.send({status: "succes", message: "Cliente eliminado"});
        }else{
            res.send("No se encontro al cliente");
        }
    });