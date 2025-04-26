const express = require('express');
const router = express.Router();
const { getAllIngredients, getIngredient, updateIngredient, getIngredientsInItem } = require('../controllers/ingredientsController');

router.get('/', getAllIngredients);
router.get('/:id', getIngredient);
router.put('/:id', updateIngredient);
router.get('/item/:id', getIngredientsInItem);

module.exports = router;
