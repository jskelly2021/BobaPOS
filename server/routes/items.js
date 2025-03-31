const express = require('express');
const router = express.Router();
const { getAllItems, getItem, getDefaultToppings } = require('../controllers/itemsController');

router.get('/', getAllItems);
router.get('/:id', getItem);
router.get('/:id/defaultToppings', getDefaultToppings);


module.exports = router;
