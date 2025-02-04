import cron from "node-cron";
import { generateNewTurnos, eliminateTurnosPrev } from "../controllers/turnosController";

// Programar la tarea para ejecutarse **cada lunes a las 00:00**

//Para que se haga cada lunes debe ser '0 0 * * 1' y para que se haga cada minuto debe ser '* * * * *'
// 🕛 Ejecutar la actualización automática CADA DOMINGO a las 00:00
cron.schedule("0 0 * * 0", () => {
    console.log("🕛 [CRON] Actualizando turnos semanales...");

    // 1️⃣ Eliminar los turnos de la semana pasada
    eliminateTurnosPrev();

    // 2️⃣ Generar turnos para la nueva semana (manteniendo siempre 2 semanas activas)
    generateNewTurnos();
    
    console.log("✅ Turnos actualizados correctamente.");
});
