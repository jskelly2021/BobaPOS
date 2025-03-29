const express = require('express');
const router = express.Router();
const { getAllIngredients, getIngredient, updateIngredientQuantity } = require('../controllers/ingredientsController');

router.get('/', getAllIngredients);
router.get('/:id', getIngredient);
router.put('/:id', updateIngredientQuantity);

module.exports = router;
