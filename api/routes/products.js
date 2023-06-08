const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Get product request'
    });
});

router.post('/', (req, res, next)=> {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
    });

    product.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: "post product request",
            createProduct: product
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
   });

  
});

router.get('/:productId', (req, res, next)=> {
    const id = req.params.productId;
   Product.findById(id)
   .exec()
   .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
   })
   .catch(err => {
        console.log(err);
        res.status(500).json(err);
   });
});

router.patch('/:productId', (req, res, next)=> {
    res.status(200).json({
        message: "Updated"
    });
});

router.delete('/:productId', (req, res, next)=> {
    res.status(200).json({
        message: "Deleted"
    });
});

module.exports = router;