import express from "express";

const router = express.Router();

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    const cliente = req.params.cliente;

    console.log(cliente);

    res.send(`Cliente: ${cliente}`);
});

router.get("/email/:email", (req, res) => {
    const patronCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = req.params.email;

    if(patronCorreo.test(email)) {
        res.send(`Email Valido`);
    }else {
        res.send(`Email Invalido`);
    }
});

//Si tenemos un proyecto donde se repiten los parametros que requerimos y eso nos genera un delay (por ejemplo buscando en base de datos):

// router.get("/nombre/:cliente([a-z]+)", (req, res) => {
//     res.send("Obteniendo un recurso para el cliente: " + req.params.cliente);
// });

// router.post("/nombre/:cliente([a-z]+)", (req, res) => {
//     res.send("Enviando un recurso del cliente: " + req.params.cliente);
// });

// router.put("/nombre/:cliente([a-z]+)", (req, res) => {
//     res.send("Actualizando un recurso del cliente: " + req.params.cliente);
// });

// router.get("/nombre/:cliente([a-z]+)", (req, res) => {
//     res.send("Eliminando un recurso del cliente: " + req.params.cliente);
// });

//Mejor hacemos esto:

router.param("cliente", (req, res, next, cliente) => {
        const clientes = ["Firu", "Lionel", "Pepe"];//Si fuera una base de datos, hago una sola busqueda

        if(clientes.includes(cliente)) {
            req.cliente = cliente;
            next();
        }else {
            res.status(404).send("Cliente no valido");
        }
});

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    res.send("Obteniendo un recurso para el cliente: " + req.params.cliente);
});

router.post("/nombre/:cliente([a-z]+)", (req, res) => {
    res.send("Enviando un recurso del cliente: " + req.params.cliente);
});

router.put("/nombre/:cliente([a-z]+)", (req, res) => {
    res.send("Actualizando un recurso del cliente: " + req.params.cliente);
});

router.get("/nombre/:cliente([a-z]+)", (req, res) => {
    res.send("Eliminando un recurso del cliente: " + req.params.cliente);
});

export default router;