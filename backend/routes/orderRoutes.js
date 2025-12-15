const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/order");
const sendOrderMail = require("../utils/sendMail");

const router = express.Router();

/* ======================
   AUTH MIDDLEWARE
====================== */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret123"
    );

    req.userId = decoded.id;
    req.userEmail = decoded.email; // 🔥 IMPORTANT FOR MAIL
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

/* ======================
   CREATE ORDER
====================== */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const order = new Order({
      user: req.userId,
      items: req.body.items,
      total: req.body.total,
    });

    await order.save();

    // 🔥 SEND MAIL (NON-BLOCKING)
    const emailToSend = req.userEmail || process.env.EMAIL_USER;

    sendOrderMail(emailToSend, order)
      .then(() => console.log("📧 Order mail sent"))
      .catch((err) =>
        console.error("❌ Mail error (ignored):", err.message)
      );

    res.status(201).json(order);
  } catch (err) {
    console.error("ORDER ERROR:", err);
    res.status(500).json({ message: "Order failed" });
  }
});

/* ======================
   GET ORDERS
====================== */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

/* ======================
   DELETE ORDER (HISTORY)
====================== */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    console.error("DELETE ORDER ERROR:", err);
    res.status(500).json({ message: "Failed to delete order" });
  }
});

module.exports = router;
