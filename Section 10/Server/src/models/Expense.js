const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Description is required'],
      minlength: [3, 'Description must be at least 3 characters'],
      maxlength: [100, 'Description is too long (max 100 characters)'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Amount is required'],
      min: [0.01, 'Amount must be greater than 0'],
      max: [999999, 'Amount is too large (max: 999,999)'],
      validate: {
        validator: function (value) {
          // Max 2 decimal places
          return /^\d+(?:\.\d{1,2})?$/.test(String(value));
        },
        message: 'Amount can have maximum 2 decimal places',
      },
    },
    date: {
      type: Date,
      required: [true, 'Date is required'],
      validate: {
        validator: function (value) {
          if (!(value instanceof Date) || isNaN(value.getTime())) return false;
          // Allow any time on the current day (not just before "now")
          const endOfToday = new Date();
          endOfToday.setHours(23, 59, 59, 999);
          if (value > endOfToday) return false;
          const tenYearsAgo = new Date(endOfToday);
          tenYearsAgo.setFullYear(endOfToday.getFullYear() - 10);
          return value >= tenYearsAgo;
        },
        message: 'Please select a valid date (not in future; not older than 10 years)',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', ExpenseSchema);

