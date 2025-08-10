const { validationResult, matchedData } = require('express-validator');
const Expense = require('../models/Expense');

async function getAllExpenses(req, res) {
  const expenses = await Expense.find({}).sort({ date: -1, createdAt: -1 });
  res.json(expenses);
}

async function getExpenseById(req, res) {
  const { id } = req.params;
  const expense = await Expense.findById(id);
  if (!expense) return res.status(404).json({ message: 'Expense not found' });
  res.json(expense);
}

async function createExpense(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const data = matchedData(req, { locations: ['body'] });
  try {
    const expense = await Expense.create(data);
    return res.status(201).json(expense);
  } catch (err) {
    if (err?.name === 'ValidationError') {
      const modelErrors = Object.values(err.errors || {}).map((e) => ({ msg: e.message, path: e.path }));
      return res.status(400).json({ errors: modelErrors });
    }
    throw err;
  }
}

async function updateExpense(req, res) {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const data = matchedData(req, { locations: ['body'] });
  try {
    const expense = await Expense.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    return res.json(expense);
  } catch (err) {
    if (err?.name === 'ValidationError') {
      const modelErrors = Object.values(err.errors || {}).map((e) => ({ msg: e.message, path: e.path }));
      return res.status(400).json({ errors: modelErrors });
    }
    throw err;
  }
}

async function deleteExpense(req, res) {
  const { id } = req.params;
  const expense = await Expense.findByIdAndDelete(id);
  if (!expense) return res.status(404).json({ message: 'Expense not found' });
  res.status(204).send();
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};

