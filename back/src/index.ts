import express from "express";
import cors from "cors";
import turnoRoutes from "./routes/tournosRoute";
import "./helpers/shedule"; // Cron para la actualización semanal
import { generateNewTurnos } from "./controllers/turnosController"; // Importamos la función

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Generar los turnos al iniciar el servidor
console.log("🛠 Creando turnos al iniciar el servidor...");
generateNewTurnos(); // Se ejecuta una vez al inicio

// Rutas
app.use("/api/turnos", turnoRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
