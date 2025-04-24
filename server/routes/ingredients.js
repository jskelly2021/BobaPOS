const express = require('express');
const router = express.Router();
const { getAllIngredients, getIngredient, updateIngredientQuantity, getIngredientsInItem } = require('../controllers/ingredientsController');

router.get('/', getAllIngredients);
router.get('/:id', getIngredient);
router.put('/:id', updateIngredientQuantity);
router.get('/item/:id', getIngredientsInItem);

module.exports = router;
