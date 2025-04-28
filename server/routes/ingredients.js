const express = require('express');
const router = express.Router();
const { getAllIngredients, getIngredient, updateIngredient, getIngredientsInItem, updateIngredientInItem, insertIngredientInItem,
    getNextIngredientId, deleteIngredient, createIngredient } = require('../controllers/ingredientsController');

router.get('/', getAllIngredients);
router.get('/next-id', getNextIngredientId);
router.get('id/:id', getIngredient);
router.put('/:id', updateIngredient);
router.get('/item/:id', getIngredientsInItem);
router.put('/item/:id', updateIngredientInItem);
router.post('/item/:id', insertIngredientInItem);
router.delete('/:id', deleteIngredient);
router.post('/', createIngredient);

module.exports = router;
