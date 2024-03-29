const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true,
    }
})

module.exports = mongoose.model("Order", orderSchema);