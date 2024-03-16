import mongoose from "mongoose";

const alumnoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        index: true
    },
    apellido: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    edad: Number,
    cursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "cursos"
    }]
});

alumnoSchema.pre("findOne", function(next) {
    this.populate("cursos");
    next();
});

export const AlumnoModel = mongoose.model("alumnos", alumnoSchema);