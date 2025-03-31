const express = require('express');
const router = express.Router();
const { getAllToppings, getTopping} = require('../controllers/toppingsController');

router.get('/', getAllToppings);
router.get('/:id', getTopping);
// router.get('/:id', getTopping);


module.exports = router;