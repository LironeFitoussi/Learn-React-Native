const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const expensesRouter = require('./routes/expenseRoutes');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Healthcheck
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// API routes
app.use('/api/expenses', expensesRouter);

// 404 and error handlers
app.use(notFoundHandler);
app.use(globalErrorHandler);

module.exports = app;

