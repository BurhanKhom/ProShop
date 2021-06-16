const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authenticate = require('../middlewares/authMiddleware');
const admin = require('../middlewares/adminMiddleware');
const { route } = require('./productsRoute');
const Order = require('../models/orderModel');

router.post('/razorpay', asyncHandler(async (req, res) => {
    res.json({ key: process.env.RAZOR_PAY_KEY });
}));


module.exports = router;