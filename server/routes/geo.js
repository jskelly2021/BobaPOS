const express = require('express');
const router = express.Router();
const { getCountries, getRegions } = require('../controllers/geoController');

router.get('/countries', getCountries);
router.get('/regions', getCountries);

module.exports = router;
