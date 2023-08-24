const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// Define your session-related routes
router.post('/api/', sessionController.createSession);
router.get('/api/:code', sessionController.getSessionData);

module.exports = router;
