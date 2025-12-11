const express = require('express');
const router = express.Router();
const materialCtrl = require('../controllers/material');
const { checkAuth, checkAdmin } = require('../middlewares/auth');
 
router.get('/', materialCtrl.getAllMaterials);
router.post('/', checkAuth, checkAdmin, materialCtrl.createMaterial);
router.delete('/:id', checkAuth, checkAdmin, materialCtrl.deleteMaterial);
 
module.exports = router;