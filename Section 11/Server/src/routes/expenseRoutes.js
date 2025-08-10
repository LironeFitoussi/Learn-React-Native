const express = require('express');
const { body, param } = require('express-validator');
const controller = require('../controllers/expenseController');

const router = express.Router();

// Validation rules
const idParam = [
  param('id').isMongoId().withMessage('Invalid id'),
];

const baseBodyRules = [
  body('description')
    .isString().withMessage('Description must be a string')
    .trim()
    .isLength({ min: 3 }).withMessage('Description must be at least 3 characters')
    .isLength({ max: 100 }).withMessage('Description is too long (max 100 characters)'),
  body('amount')
    .isFloat({ gt: 0, max: 999999 }).withMessage('Amount must be greater than 0 and less than 999,999')
    .custom((value) => /^\d+(?:\.\d{1,2})?$/.test(String(value))).withMessage('Amount can have maximum 2 decimal places')
    .toFloat(),
  body('date')
    .isISO8601().withMessage('Date must be a valid ISO date')
    .toDate()
    .custom((value) => {
      const endOfToday = new Date();
      endOfToday.setHours(23, 59, 59, 999);
      if (value > endOfToday) return false;
      const tenYearsAgo = new Date();
      tenYearsAgo.setFullYear(endOfToday.getFullYear() - 10);
      return value >= tenYearsAgo;
    }).withMessage('Please select a valid date (not in future; not older than 10 years)'),
];

// Routes
router.get('/', controller.getAllExpenses);
router.get('/:id', idParam, controller.getExpenseById);
router.post('/', baseBodyRules, controller.createExpense);
router.put('/:id', [...idParam, ...baseBodyRules], controller.updateExpense);
router.delete('/:id', idParam, controller.deleteExpense);

module.exports = router;

