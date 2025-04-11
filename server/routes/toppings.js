const express = require('express');
const router = express.Router();
const { getAllToppings, getTopping, updateToppingQuantity } = require('../controllers/toppingsController');

router.get('/', getAllToppings);
router.get('/:id', getTopping);
router.put('/:id', updateToppingQuantity);

module.exports = router;