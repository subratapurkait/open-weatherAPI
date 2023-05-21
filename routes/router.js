const express = require('express');
const router = express.Router();

const weather = require('../controllers/weatherController');

router.get('/location', weather.getLocation);

module.exports = router;    