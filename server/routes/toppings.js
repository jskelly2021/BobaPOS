const express = require('express');
const router = express.Router();
const { getAllToppings, getTopping, updateTopping, createTopping, deleteTopping, getNextToppingId, 
    getDefaultToppingOnItem, updateDefaultToppingOnItem, insertDefaultToppingOnItem} = require('../controllers/toppingsController');

router.get('/', getAllToppings);
router.post('/', createTopping);
router.get('/next-id', getNextToppingId);
router.get('/:id', getTopping);
router.delete('/:id', deleteTopping);
router.put('/:id', updateTopping);
router.get('/default/:id', getDefaultToppingOnItem);
router.put('/default/:id', updateDefaultToppingOnItem);
router.post('/default/:id', insertDefaultToppingOnItem);


module.exports = router;