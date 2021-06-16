const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

dotenv.config();

const admin = asyncHandler(async (req, res, next) => {

    if (req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as admin');
    }
});

module.exports = admin
