const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id : String,
    name: String,
    price: Number
});

exports.Product = mongoose.model("Product", productSchema);