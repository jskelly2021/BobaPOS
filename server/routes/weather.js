const express = require('express');
const router = express.Router();
const { getWeather, getCountryCode, getRegionCode, getCityName, getCountryName, getRegionName, updateWeatherLocation } = require('../controllers/weatherController');

router.put('/', updateWeatherLocation);
router.get('/', getWeather);
router.get('/country', getCountryCode);
router.get('/region', getRegionCode);
router.get('/city', getCityName);
router.get('/countryName', getCountryName);
router.get('/regionName', getRegionName);


module.exports = router;
