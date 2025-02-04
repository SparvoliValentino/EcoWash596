import { Request, Response } from "express";
import { Turno } from "../models/turnosModel";

// 🔹 Eliminar los turnos de la semana pasada
export const eliminateTurnosPrev = async (): Promise<void> => {
    const hoy = new Date();
    const fechaAnterior = new Date();
    fechaAnterior.setDate(hoy.getDate() - 7);
    const semanaPasada = fechaAnterior.toISOString().split("T")[0]; // YYYY-MM-DD

    await Turno.deleteMany({ dia: { $lte: semanaPasada } });

    console.log(`🗑 Turnos de la semana pasada eliminados. Fecha límite: ${semanaPasada}`);
};

// 🔹 Generar turnos para las próximas dos semanas
export const generateNewTurnos = async (): Promise<void> => {
    const hoy = new Date();

    for (let i = 0; i < 14; i++) { // Generar turnos para 14 días (2 semanas)
        const fecha = new Date();
        fecha.setDate(hoy.getDate() + i);
        const dia = fecha.toISOString().split("T")[0]; // YYYY-MM-DD

        const horarios = Array.from({ length: 9 }, (_, i) => `${8 + i}:00`);

        for (const horario of horarios) {
            const existe = await Turno.findOne({ dia, horario });
            if (!existe) {
                await Turno.create({ dia, horario, estado: false });
            }
        }
    }

    console.log("✅ Turnos generados para las próximas dos semanas.");
};

// 🔹 Obtener todos los turnos
export const getTurnos = async (req: Request, res: Response): Promise<void> => {
    const turnos = await Turno.find();
    res.json(turnos);
};

// 🔹 Generar turnos del día (NO SE USA, PERO SE DEJA POR SI SE NECESITA)
export const crearTurnos = async (req: Request, res: Response): Promise<void> => {
    res.status(400).json({ message: "Esta función ya no es necesaria." });
};

// 🔹 Reservar un turno
export const reservarTurno = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const turno = await Turno.findById(id);

        if (!turno) {
            res.status(404).json({ message: "Turno no encontrado" });
            return;
        }

        if (turno.estado) {
            res.status(400).json({ message: "Este turno ya está reservado" });
            return;
        }

        turno.estado = true;
        await turno.save();

        res.status(200).json({ message: "Turno reservado correctamente", turno });
    } catch (error) {
        res.status(500).json({ message: "Error en la reserva del turno" });
    }
};
