const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, enum: ['Cake', 'Non-Veg','Veg'], required: true },
  price: { type: Number, required: true },
  tags: [String],
  imageUrl: String,
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
