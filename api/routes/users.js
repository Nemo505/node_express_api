const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        console.log(user);
        if (user.length >= 1) {
           return res.status(409).json({
                message: "User exist"
           });
        }else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json(err);
                }else{
                    const user = new User({
                        _id: mongoose.Types.ObjectId,
                        email: req.body.email,
                        password: hash
                    })
                    user.save()
                    .exec()
                    .then(result => {
                        console.log(result);
                        res.status(200).json(result);
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err);
                    })
                }
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
    
   
});

module.exports = router;