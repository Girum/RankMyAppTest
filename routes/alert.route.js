const express = require('express');
const router = express.Router();

const alert_controller = require('../controllers/alert.controller');

router.get('/get', alert_controller.getAlerts);
router.post('/create', alert_controller.createAlert);
router.put('/update', alert_controller.updateAlert);
router.delete('/delete', alert_controller.deleteAlert);
module.exports = router;