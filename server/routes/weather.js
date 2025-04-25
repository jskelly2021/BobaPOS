const express = require('express');
const router = express.Router();
const { updateWeatherLocation } = require('../controllers/weatherController');

router.put('/', updateWeatherLocation);


module.exports = router;
