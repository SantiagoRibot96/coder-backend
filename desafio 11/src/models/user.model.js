import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    cart: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;