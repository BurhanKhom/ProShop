const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const authenticate = require('../middlewares/authMiddleware');
const Order = require('../models/orderModel');
const Razorpay = require('razorpay');
const uuid = require('uuid');

var razorpay = new Razorpay({
    key_id: process.env.RAZOR_PAY_KEY,
    key_secret: process.env.RAZOR_PAY_SECRET
});

router.post('/save', authenticate, asyncHandler(async (req, res) => {
    try {
        if (req.body && req.body.orderItems.length === 0) {
            res.status(404);
            throw new Error('No order items found');
        } else {

            //coming from payment
            if (req.body._id) {
                const existingOrder = await Order.findById(req.body._id);
                if (existingOrder) {
                    existingOrder.isPaid = req.body.isPaid
                    existingOrder.paidAt = req.body.paidAt
                    existingOrder.paymentData = req.body.paymentData
                    const saved = await existingOrder.save()
                    res.status(200).json(saved);
                }
            } else {
                //new order
                const order = new Order(req.body);
                const savedOrder = await order.save();
                res.status(201).json(savedOrder);
            }
        }
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
}));

router.post('/get', authenticate, asyncHandler(async (req, res) => {
    try {
        if (req.body && req.body.orderId) {
            const foundOrder = await Order.findById(req.body.orderId);
            res.status(200).json(foundOrder);
        } else {
            res.status(404);
            throw new Error('Order not found!');
        }
    } catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
}));


router.post('/razorpay/:orderId', authenticate, asyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.orderId);
        const payment_capture = 1;
        if (order) {
            const createdOrder = await razorpay.orders.create({
                amount: parseInt(order.totalPrice * 100),
                currency: 'INR',
                receipt: uuid.v1(),
                payment_capture,
                notes: { description: 'BKart Order' }
            });
            res.status(200).json({createdOrder});
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500)
        throw new Error(err.message);
    }

}));

router.post('/razorpayVerification', asyncHandler(async (req, res) => {
    const razorpayVerificationSecret = process.env.PAY_VERIFICATION_SECRET;

    const crypto = require('crypto');
    const shasum = crypto.createHmac('sha256', razorpayVerificationSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest === req.headers['x-razorpay-signature']) {
        // legit payment
        console.log('Payment Verified');
    } else {
        console.log('Payment not verified');
    }

    res.json({ message: 'ok' });


}));


module.exports = router;