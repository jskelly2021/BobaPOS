const express = require('express');
const router = express.Router();
const { getTopSellingProducts, getSalesDuringDay, getSalesOverDays, getSalesOverMonths, getSalesOverWeeks, getTotals, getItemSales,
    getIngredientUsage, resetTotals, getIngredientUsageOverTime } = require('../controllers/analyticsController');


router.get('/top-selling-products', getTopSellingProducts);
router.post('/sales-over-days', getSalesOverDays);
router.post('/sales-during-day', getSalesDuringDay);
router.post('/sales-over-weeks', getSalesOverWeeks);
router.post('/sales-over-months', getSalesOverMonths);
router.get('/totals', getTotals);
router.get('/item-sales', getItemSales);
router.get('/ingredient-usage', getIngredientUsage);
router.put('/reset-totals', resetTotals);
router.get('/usage/:id/:interval/:start/:end', getIngredientUsageOverTime);

module.exports = router;
