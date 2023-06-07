const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Get product request'
    });
});

router.post('/', (req, res, next)=> {
    const product = {
        name: req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message: "post product request",
        createProduct: product
    });
});

router.get('/:productId', (req, res, next)=> {
    const id = req.params.productId;
    if (id === 'special') {  
        res.status(200).json({
            message: "Special ID"
        });
    }else{
        res.status(200).json({
            message: "CorrectID"
        });
    }
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