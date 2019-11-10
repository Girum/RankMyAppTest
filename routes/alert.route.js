const express = require('express');
const router = express.Router();

const alert_controller = require('../controllers/alert.controller');

router.get('/get', alert_controller.getAlerts);
router.get('/get/email', alert_controller.getAlertsByEmail);
router.get('/get/uptime', alert_controller.getAlertsByTime);
router.post('/create', alert_controller.createAlert);
router.put('/update', alert_controller.updateAlertSearchPhrase);
router.put('/update/time', alert_controller.updateAlertTime);
router.delete('/delete', alert_controller.deleteAlert);

module.exports = router;