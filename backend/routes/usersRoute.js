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

router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    // res.send(user);
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            isAdmin: user.isAdmin,
            name: user.name,
            email: user.email,
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '30d'
            })
        });
    } else {
        res.status(401);
        throw new Error('Incorrect email or password');
    }

}));


router.post('/profile', authenticate, asyncHandler(async (req, res) => {

    const user = req.user;

    if (user) {
        res.json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(404);
        throw new Error('User Not Found');
    }
}));


router.post('/register', asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    // res.send(user);
    if (userExists) {
        res.status(400);
        throw new Error('Email already exists');
    } else {
        const encryptedPassword = await bcrypt.hashSync(password, 10);
        const user = await User.create({
            name: name,
            email: email,
            password: encryptedPassword
        });

        if (user) {
            res.status(201);
            res.json({
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin
            })
        } else {
            res.status(500);
            throw new Error('Internal Server Error');
        }
    }
}));


router.put('/update', authenticate, asyncHandler(async (req, res) => {
    const { _id, name, email, oldPassword, newPassword } = req.body;
    const userExists = await User.findById(_id);
    if (userExists) {
        if (await userExists.matchPassword(oldPassword)) {
            userExists.name = name;
            userExists.email = email;

            if (newPassword) {
                const encryptedNewPassword = await bcrypt.hashSync(newPassword, 10);
                userExists.password = encryptedNewPassword;
            }

            try {
                const updatedUser = await userExists.save();
                res.json({
                    _id: updatedUser._id,
                    isAdmin: updatedUser.isAdmin,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    token: await jwt.sign({ id: updatedUser._id }, process.env.JWT_SECRET, {
                        expiresIn: '30d'
                    })
                });
            } catch (err) {
                res.status(500);
                throw new Error(err.message);
            }
        } else {
            res.status(401);
            throw new Error('Incorrect current password');
        }

    } else {
        res.status(404);
        throw new Error('User not found')
    }
}));


router.post('/orders', authenticate, asyncHandler(async (req, res) => {
    const { userId } = req.body;
    try {
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
        if (orders && orders.length > 0) {
            res.status(200).json(orders);
        } else {
            res.status(404);
            res.json({ message: 'You have not placed any orders yet.' });
        }
    } catch (err) {
        res.status(500);
        throw new Error('Internal Server Error');
    }
}));


router.get('/all', [authenticate, admin], asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
}));


module.exports = router;