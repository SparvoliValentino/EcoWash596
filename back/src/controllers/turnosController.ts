import { Request, Response } from "express";

// Array en memoria para almacenar turnos temporalmente
let turnos: any[] = [];

// 🔹 Función para eliminar los turnos de la semana anterior
export const eliminateTurnosPrev = (): void => {
    const hoy = new Date();
    const diaActual = hoy.getDate();
    
    // Obtener la fecha de hace 7 días
    const fechaAnterior = new Date();
    fechaAnterior.setDate(diaActual - 7);
    const semanaPasada = fechaAnterior.toISOString().split("T")[0]; // Formato YYYY-MM-DD

    // Filtrar solo los turnos de la semana actual
    turnos = turnos.filter(turno => turno.dia > semanaPasada);
    
    console.log(`🗑 Turnos de la semana anterior eliminados. Fecha límite: ${semanaPasada}`);
};

// 🔹 Función para generar turnos de toda la semana
export const generateNewTurnos = (): void => {
    const hoy = new Date();
    turnos = []; // Reiniciamos los turnos antes de agregar los nuevos

    for (let i = 0; i < 7; i++) { // Generar turnos para 7 días
        const fecha = new Date();
        fecha.setDate(hoy.getDate() + i);
        const dia = fecha.toISOString().split("T")[0]; // YYYY-MM-DD

        const horarios = Array.from({ length: 9 }, (_, i) => `${8 + i}:00`); // ["08:00", ..., "16:00"]

        horarios.forEach((horario, index) => {
            turnos.push({
                id: turnos.length + 1,
                estado: false, // false = disponible
                dia,
                horario,
            });
        });
    }

    console.log("✅ Turnos generados para la nueva semana.");
};


// Función para obtener los turnos
export const getTurnos = (req: Request, res: Response): void => {
    res.json(turnos);
};

// Función para generar turnos de 8:00 a 16:00 cada hora
export const crearTurnos = (req: Request, res: Response): void => {
    const diaActual = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const horarios = Array.from({ length: 9 }, (_, i) => `${8 + i}:00`);

    // Evitar duplicados
    if (turnos.length > 0) {
        res.status(400).json({ message: "Los turnos ya han sido generados para hoy." });
        return;
    }

    turnos = horarios.map((horario, index) => ({
        id: index + 1,
        estado: false, // false = disponible, true = reservado
        dia: diaActual,
        horario,
    }));

    res.status(201).json({ message: "Turnos generados correctamente", turnos });
};

// Función para reservar un turno
export const reservarTurno = (req: Request, res: Response): void => {
    const { id } = req.params;

    // Buscar el turno por ID
    const turnoIndex = turnos.findIndex(turno => turno.id === parseInt(id));

    if (turnoIndex === -1) {
        res.status(404).json({ message: "Turno no encontrado" });
        return;
    }

    if (turnos[turnoIndex].estado) {
        res.status(400).json({ message: "Este turno ya está reservado" });
        return;
    }

    // Reservar el turno cambiando `estado` a true
    turnos[turnoIndex].estado = true;

    res.status(200).json({ message: "Turno reservado correctamente", turno: turnos[turnoIndex] });
};

