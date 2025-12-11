const express = require('express');
const router = express.Router();
const reservationCtrl = require('../controllers/reservation');
const { checkAuth } = require('../middlewares/auth');
 
router.post('/', checkAuth, reservationCtrl.createReservation);
router.get('/', checkAuth, reservationCtrl.getMyReservations);
 
module.exports = router;