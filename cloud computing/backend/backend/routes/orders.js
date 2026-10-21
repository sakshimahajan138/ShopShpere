const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// PLACE order → returns success for popup
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Order Placed Successfully! 🎉',
      orderId: order._id,
      order
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// GET all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;