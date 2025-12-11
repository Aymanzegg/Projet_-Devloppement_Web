const Material = require('../models/material');
 
exports.getAllMaterials = async (req, res) => {
    try {
        const materials = await Material.findAll();
        res.status(200).json(materials);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
 
exports.createMaterial = async (req, res) => {
    try {
        const newMaterial = await Material.create(req.body);
        res.status(201).json(newMaterial);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
 
exports.deleteMaterial = async (req, res) => {
    try {
        await Material.destroy({ where: { id: req.params.id } });
        res.status(200).json({ message: "Material deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};