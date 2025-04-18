const express = require('express');
const router = express.Router();
const { getAllItems, getItem, getDefaultToppings, deleteItem, 
    createItem, updateItem, updateItemQuantity, getItemsByCategory} = require('../controllers/itemsController');

router.get('/', getAllItems);
router.get('/category/:category', getItemsByCategory)
router.get('/:id', getItem);
router.get('/:id/defaultToppings', getDefaultToppings);
router.delete('/:id', deleteItem);
router.post('/', createItem);
router.put('/:id', updateItem);
router.put('/:id/quantity', updateItemQuantity);


module.exports = router;
