import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import turnoRoutes from "./routes/tournosRoute";
import "./helpers/shedule"; // Mantiene la ejecución del cron
import { generateNewTurnos } from "./controllers/turnosController"; // Función de generación

dotenv.config();

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI as string, { dbName: "Ecowash" })
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch(err => console.error("❌ Error conectando a MongoDB:", err));

// Generar los turnos al iniciar el servidor
console.log("🛠 Creando turnos al iniciar el servidor...");
generateNewTurnos(); // Se ejecuta una vez al inicio

// Rutas
app.use("/api/turnos", turnoRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});




