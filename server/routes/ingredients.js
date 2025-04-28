const express = require('express');
const router = express.Router();
const { getAllIngredients, getIngredient, updateIngredient, getIngredientsInItem,
    getNextIngredientId, deleteIngredient, createIngredient } = require('../controllers/ingredientsController');

router.get('/', getAllIngredients);
router.get('/:id', getIngredient);
router.put('/:id', updateIngredient);
router.get('/item/:id', getIngredientsInItem);
router.get('/next-id', getNextIngredientId);
router.delete('/:id', deleteIngredient);
router.post('/', createIngredient);

module.exports = router;
