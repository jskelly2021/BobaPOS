const express = require('express');
const router = express.Router();
const { getTopSellingProducts, getSalesDuringDay, getSalesOverDays, getSalesDuringMonth, getSalesDuringWeek, getTotals, getItemSales, 
    getIngredientUsage, resetTotals, getIngredientUsageOverTime} = require('../controllers/analyticsController');


router.get('/top-selling-products', getTopSellingProducts);
router.post('/sales-over-days', getSalesOverDays);
router.post('/sales-during-day', getSalesDuringDay);
router.post('/sales-during-week', getSalesDuringWeek);
router.post('/sales-during-month', getSalesDuringMonth);
router.post('/totals', getTotals);
router.post('/item-sales', getItemSales);
router.post('/ingredient-usage', getIngredientUsage);
router.post('/reset-totals', resetTotals);
router.get('/usage/:id', getIngredientUsageOverTime);

module.exports = router;
