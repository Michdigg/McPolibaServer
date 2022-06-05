const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    products: [{
        _id : String,
        name: String,
        price: Number
    }],
    amount: Number,
    status: String // pending || accepted || completed
});

orderSchema.pre("save", function(next) {
    let user = this;
    user.status = "pending"
    next()
});

exports.Order = mongoose.model("Order", orderSchema);