const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://'+ 
        process.env.MONGO_ATLAS_USER+':'+
        process.env.MONGO_ATLAS_PW+
        '@cluster0.qnl2i0r.mongodb.net/?retryWrites=true&w=majority'      
);

mongoose.Promise = global.Promise;
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'))

//Response Proper Header
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 
        'Origin, X-Requested-Width, Content-Type, Accept, Authorization'
    );
    if (req.method ==='OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE');
        return res.status(200).json({});
    }
})

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');

//Route Path
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use("/users", userRoutes);

//Errors For all unknown routes
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
})


module.exports = app;