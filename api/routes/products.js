const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Product.find()
    .select('name price _id')
    .exec()
    .then(result => {
        console.log(result);
        const addResult = {
            count: result.length,
            products: result

            //OR
            //products: result.map(p => {
               // return {
                    //name: p.name,
                    //price: p.price,
                    //_id: p.id,
                    //request: {
                        //type: 'GET,
                        //url: 'http..../products/'+p._id
                   // }
              // }
            //})
        }
        res.status(200).json(addResult);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
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
            //OR
            //createProduct: {
                //_id: result._id,
                // name: result.name,
                // price: result.price,
           // }
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
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
        
    }
    Product.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
   });
   
});

router.delete('/:productId', (req, res, next)=> {
    res.status(200).json({
        message: "Deleted"
    });
});



module.exports = router;