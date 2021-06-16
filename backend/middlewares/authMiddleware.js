const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

dotenv.config();

const authenticate = asyncHandler(async (req, res, next) => {

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        let token = req.headers.authorization.split(' ')[1];
        try {
            const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(verifiedToken.id).select('-password');
        } catch (err) {
            res.status(401);
            throw new Error('Invalid Token')
        }
    } else {
        res.status(401);
        throw new Error('Token not found')
    }
    next();
});

module.exports = authenticate
