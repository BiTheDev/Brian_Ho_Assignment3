const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const statusUpdateSchema = require('./statusUpdateSchema');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  joined: Date,
  description: String,
  statusUpdates: [statusUpdateSchema]
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
