import cron from "node-cron";
import { generateNewTurnos, eliminateTurnosPrev } from "../controllers/turnosController";

// Programar la tarea para ejecutarse **cada lunes a las 00:00**

//Para que se haga cada lunes debe ser '0 0 * * 1' y para que se haga cada minuto debe ser '* * * * *'
cron.schedule("0 0 * * 0", async () => {
    console.log("🕛 Ejecutando tarea programada: Actualización de turnos...");

    // Eliminar los turnos de la semana anterior
    eliminateTurnosPrev();

    // Generar los turnos para la nueva semana
    generateNewTurnos();
    
    console.log("✅ Turnos actualizados correctamente.");
});
