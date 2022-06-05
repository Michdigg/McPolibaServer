const {response} = require("express");
const Product = require('../models/product').Product

module.exports = {
    getProducts: (req, res, next) => {
        Product.find({}, (error, products) => {
            if (error) console.log(error);
            console.log(req.user)
            res.send(products);
        });
    },

    addProduct: (req, res, next) => {
        const product = new Product(req.body);
        product.save((error, savedDocument) => {
            if (error) console.log(error);
            res.send(product);
        });
    },

    deleteProduct: (req, res, next) => {
        Product.deleteOne({id : req.body._id}, (error, response) => {
            if (error) console.log(error);
            res.send(response);
        })
    },

    updateProduct: (req, res, next) => {
        Product.findOneAndUpdate({id : req.body._id}, {name: req.body.name, price: req.body.price}, {}, (error,response) => {
            if (error) console.log(error);
            res.send(response);
        })
    }
}