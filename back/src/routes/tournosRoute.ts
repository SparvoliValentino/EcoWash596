import { Router } from "express";
import { getTurnos, reservarTurno } from '../controllers/turnosController';

const router = Router();

// Obtener todos los turnos
router.get("/", getTurnos);

// Reservar un turno por ID
router.put("/reservar/:id", reservarTurno);

export default router;
