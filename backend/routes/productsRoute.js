const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

router.get('/', asyncHandler(async (req, res) => {
    // res.status(200).json(Product.find());

    try {
        const products = await Product.find();
        if (products) {
            res.status(200).json(products);
        } else {
            res.status.name(404).json({ message: 'No products found' });
        }
    } catch (err) {

    }
}));


router.get('/:id', asyncHandler(async (req, res) => {
    try {
        const product = await Product.find({ _id: req.params.id });
        // console.log(product);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        console.log(err);
    }
}));


module.exports = router;