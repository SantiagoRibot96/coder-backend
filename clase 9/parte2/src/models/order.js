import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const orderScheme = new mongoose.Schema({
    nombre: String,
    tam: String,
    precio: Number,
    cantidad: Number
});

orderScheme.plugin(mongoosePaginate);

export const OrderModel = new mongoose.model("pizzas", orderScheme);