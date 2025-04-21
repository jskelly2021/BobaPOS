const express = require('express');
const router = express.Router();
const { getAllToppings, getTopping, updateToppingQuantity, createTopping, deleteTopping, getNextToppingId } = require('../controllers/toppingsController');

router.get('/', getAllToppings);
router.post('/', createTopping);
router.get('/next-id', getNextToppingId);
router.get('/:id', getTopping);
router.delete('/:id', deleteTopping);
router.put('/:id', updateToppingQuantity);

module.exports = router;