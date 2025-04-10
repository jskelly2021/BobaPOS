const express = require('express');
const router = express.Router();
const { getTopSellingProducts, getSalesDuringDay,getSalesOverDays, getSalesDuringMonth, getSalesDuringWeek, getTotals, getItemSales, 
    getIngredientUsage, resetTotals} = require('../controllers/analyticsController'); // Import the analytics controller functions

router.get('/top-selling-products', getTopSellingProducts); // Route to get top selling products
router.post('/sales-over-days', getSalesOverDays); // Route to get sales over a range of days
router.post('/sales-during-day', getSalesDuringDay); // Route to get sales during a specific day
router.post('/sales-during-week', getSalesDuringWeek); // Route to get sales during a specific week
router.post('/sales-during-month', getSalesDuringMonth); // Route to get sales during a specific month
router.post('/totals', getTotals); // Route to get total sales
router.post('/item-sales', getItemSales); // Route to get item sales
router.post('/ingredient-usage', getIngredientUsage); // Route to get ingredient usage
router.post('/reset-totals', resetTotals); // Route to reset totals

module.exports = router;  // Export the router for use in the main app file
