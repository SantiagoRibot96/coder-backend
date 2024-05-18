/* 
Clase 16

npm i nodemailer

https://www.npmjs.com/package/nodemailer-express-handlebars

gmail app pass: kpxd npvt uxgm vduu 
*/

import express from "express";
import nodemailer from "nodemailer";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./src/public"));

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "ribotsantiago@gmail.com",
        pass: "kpxd npvt uxgm vduu"
    }
});

app.get("/mail", async (req, res) => {
    try {
        await transport.sendMail({
            from: "Codertest <ribotsantiago@gmail.com>",
            to: "santiago.ribot@hotmail.com",
            subject: "Correo de prueba",
            html: `<h1>Hola, estoy probando el mailing</h1> <img src="cid: logo1"/>`,
            attachments: [{
                filename: "images.jpg",
                path: "./src/public/img/images.jpg",
                cid: "logo1"
            }]
        });

        res.status(200).send("Correo enviado");
    } catch (error) {
        res.status(500).send("Error al enviar el mail.");
        console.log(`Ocurrio un error ${error}`);
    }
});

app.post("/enviarMensaje", async (req, res) => {
    const {email, message} = req.body;

    try {
        await transport.sendMail({
            from: "Codertest <ribotsantiago@gmail.com>",
            to: email,
            subject: "TEST",
            text: message
        });

        res.status(200).send("Correo enviado");
    } catch (error) {
        console.log(`Error al enviar el mensaje ${error}`);
        res.status(500).send("Error al enviar el mail");
    }
});

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});