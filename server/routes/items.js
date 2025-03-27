const express = require('express');
const router = express.Router();
const { getAllItems, getItem } = require('../controllers/itemsController');

router.get('/', getAllItems);
router.get('/:id', getItem);

module.exports = router;
