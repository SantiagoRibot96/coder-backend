// import mongoose from "mongoose";
// import { OrderModel } from "./models/order.js";

/* AGREGACION */

/* const main = async () => {
    await mongoose.connect("mongodb+srv://santiribot79:coderhouse@cluster0.dxp69gq.mongodb.net/tienda?retryWrites=true&w=majority&appName=Cluster0");
    
    //Ejercicio 1: El total de pizzas tamaño familiar vendidas por sabor

    let resultado = await OrderModel.aggregate([
        {
            $match: {
                tam: "familiar"
            }
        },
        {
            $group: {
                _id: "$nombre",
                total: {
                    $sum: "$cantidad"
                }
            }
        }
    ]);

    // console.log(`Filtro por tamaño y sabor, devuelvo cantidad: `, resultado);

    //Ejercicio 2: Nos piden mas datos y que los guardemos en una nueva coleccion "reporte"

    resultado = await OrderModel.aggregate([
        {
            $match: {
                tam: "familiar"
            }
        },
        {
            $sort: {
                total: -1
            }
        },
        {
            $group: {
                _id: 1,
                orders: {
                    $push: "$$ROOT"
                }
            }
        },
        {
            $project: {
                _id: 0,
                orders: "$orders",
            }
        },
        {
            $merge: {
                into: "reportes"
            }
        }
    ]);
}

main(); */

/* PAGINACION */
/* npm install mongoose-paginate-v2 */

import express from "express";
import exphbs from "express-handlebars";
import "./database.js";
import { OrderModel } from "./models/order.js";

const app = express();
const PORT = 8080;

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.get("/pizzas", async (req, res) => {
    const page = req.query.page || 1;
    const limit = 2;

    try {
        const pizzasListado = await OrderModel.paginate({}, {limit, page});
        
        const pizzasResultadoFinal = pizzasListado.docs.map( pizza => {
            const {_id, ...rest} = pizza.toObject();
            return rest; 
        })

        res.render("pizzas", {
            pizzas: pizzasResultadoFinal,
            hasPrevPage: pizzasListado.hasPrevPage,
            hasNextPage: pizzasListado.hasNextPage,
            prevPage: pizzasListado.prevPage,
            nextPage: pizzasListado.nextPage,
            currentPage: pizzasListado.page,
            totalPages: pizzasListado.totalPages
        });
    } catch (error) {
        res.status(500).send("Error al traer la DB ", error);
    }
});

app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`);
});