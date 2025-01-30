import { Router } from "express";
import { getTurnos, crearTurnos, reservarTurno } from '../controllers/turnosController';

const router = Router();

// Obtener todos los turnos
router.get("/", getTurnos);

// Crear los turnos del día
router.post("/crear", crearTurnos);

// Reservar un turno por ID
router.put("/reservar/:id", reservarTurno);

export default router;
