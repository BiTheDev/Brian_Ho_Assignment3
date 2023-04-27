const mongoose = require('mongoose');

const statusUpdateSchema = new mongoose.Schema({
  timestamp: Date,
  content: String
});

module.exports = statusUpdateSchema;
