const express = require('express');
const router = express.Router();
const { addOrder, addOrderItem, addOrderItemTopping } = require('../controllers/ordersController');

router.post('/', addOrder);
router.post('/item', addOrderItem);
router.post('/itemtopping', addOrderItemTopping);

module.exports = router;
