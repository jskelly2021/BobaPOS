const express = require('express');
const router = express.Router();
const { ensureLoggedIn, requireRole } = require('../middleware/authMiddleware');
const { getAllItems, getItem, getDefaultToppings, deleteItem, 
    createItem, updateItem, updateItemQuantity, getItemsByCategory, getNextItemId } = require('../controllers/itemsController');


router.get('/', getAllItems);
router.get('/next-id', getNextItemId);
router.get('/category/:category', getItemsByCategory)
router.get('/:id', getItem);
router.get('/:id/defaultToppings', getDefaultToppings);

// public (any logged-in user)
router.get('/', ensureLoggedIn, getAllItems);

router.delete('/:id', deleteItem);
router.post('/', createItem);
router.put('/:id', updateItem);
router.put('/:id/quantity', updateItemQuantity);

// manager-only writes
//router.post('/', ensureLoggedIn, requireRole('manager'), createItem);
//router.put('/:id', ensureLoggedIn, requireRole('manager'), updateItem);
//router.delete('/:id', ensureLoggedIn, requireRole('manager'), deleteItem);


module.exports = router;