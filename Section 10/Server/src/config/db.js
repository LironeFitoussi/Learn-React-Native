const mongoose = require('mongoose');

async function connectToDatabase(mongoUri) {
  const uri = mongoUri || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/expenses_db';

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(uri, {
      autoIndex: true,
    });
    console.log(`[db] Connected to MongoDB at ${uri}`);
  } catch (error) {
    console.error('[db] MongoDB connection error:', error.message);
    process.exit(1);
  }
}

module.exports = { connectToDatabase };

