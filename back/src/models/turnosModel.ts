import mongoose from "mongoose";

const turnoSchema = new mongoose.Schema({
    horario: { type: String, required: true },
    dia: { type: String, required: true },
    estado: { type: Boolean, default: false } // false = disponible, true = reservado
});

export const Turno = mongoose.model("Turno", turnoSchema);
