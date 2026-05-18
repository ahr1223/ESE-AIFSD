const express = require('express');
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  searchEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getAnalytics,
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');
const { validateEmployee } = require('../middleware/validationMiddleware');

router.route('/')
  .post(protect, validateEmployee, createEmployee)
  .get(protect, getEmployees);

router.get('/search', protect, searchEmployees);
router.get('/analytics', protect, getAnalytics);

router.route('/:id')
  .get(protect, getEmployeeById)
  .put(protect, validateEmployee, updateEmployee)
  .delete(protect, deleteEmployee);

module.exports = router;
