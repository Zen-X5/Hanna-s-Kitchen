const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
      },
      quantity: {
        type: Number,
        default: 1
      }
    }
  ],
  totalAmount: Number,
  customerName: String,
  phone: String,
  address: String,
  placedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
