const express = require('express');
const router = express.Router();
const { getAllEmployees, getEmployee, deleteEmployee, createEmployee, updateEmployee, getNextEmployeeId } = require('../controllers/employeeController');

router.get('/', getAllEmployees);
router.get('/next-id', getNextEmployeeId);
router.get('/:id', getEmployee);
router.delete('/:id', deleteEmployee);
router.put('/:id', updateEmployee);
router.post('/', createEmployee);

module.exports = router;  // Export the router for use in the main app file
