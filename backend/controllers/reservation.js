const Reservation = require('../models/reservation');
const Material = require('../models/material');
 
exports.createReservation = async (req, res) => {
    try {
        const { materialId, startDate, endDate } = req.body;
        const material = await Material.findByPk(materialId);
        if (!material) return res.status(404).json({ error: "Matériel introuvable" });
 
        const newResa = await Reservation.create({
            startDate,
            endDate,
            MaterialId: materialId,
            clientName: req.user.userId 
        });
 
        res.status(201).json(newResa);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
 
exports.getMyReservations = async (req, res) => {
    try {
        const resas = await Reservation.findAll({ 
            where: { clientName: req.user.userId },
            include: Material 
        });
        res.status(200).json(resas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};