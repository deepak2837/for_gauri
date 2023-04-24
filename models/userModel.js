const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  income: { type: String, required: true },
  city: { type: String, required: true },
  car: { type: String, required: true },
  quote: { type: String, required: true },
  phone_price: { type: String, required: true }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
