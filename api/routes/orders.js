const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

router.get('/', (req, res, next) => {
    Order.find()
    .select('product quantity _id')
    .populate('product', 'name')
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(505).json(err)
    })
});


router.post('/', (req, res, next) => {
    Product.findById(req.body.productId)
    .exec()
    .then(product => {
        const order = new Order({
            _id: mongoose.Types.ObjectId,
            quantitiy: req.body.quantitiy,
            product: req.body.productId
    
        });
        return order.save();
    })
    .exec()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Order Created'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(505).json(err)
    })
});

router.get('/:orderId', (req, res, next) => {
    Order.findById(req.params.orderId)
    .exec()
    .then(order => {
        if (!order) {
            res.status(404).json({
                message: 'Order Not Found '
            });
        }else{
            console.log(order);
            res.status(200).json({
                message: 'Order '
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(505).json(err)
    })
})

router.delete('/:orderId', (req, res, next) => {
    Order.remove({
        _id: req.params.orderId
    })
    .exec()
    .then(order => {
        if (!order) {
            res.status(404).json({
                message: 'Order Not Found '
            });
        }else{
            console.log(order);
            res.status(200).json({
                message: 'Order Deleted'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(505).json(err)
    })
})

module.exports = router;