const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/orders
router.post('/', async (req, res) => {
  console.log("Order body:", req.body); // Add this line
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: "Order placed successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to place order." });
  }
});

// Get all orders
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("items.itemId");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
