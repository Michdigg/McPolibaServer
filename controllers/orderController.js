const {response} = require ("express");
const Order = require ('../models/order').Order;

module.exports = {
    createOrder: (req, res, next) => {
        const order = new Order (req.body);
        order.save ((error, savedDocument) => {
            if (error) console.log (error);
            res.send (order);
        });
    },

    acceptOrder: (req, res, next) => {
        Order.findOneAndUpdate ({_id: req.body._id}, {status: "accepted"}, {}, (error, response) => {
            if (error) console.log (error);
            res.send (response);
        })
    },

    completeOrder: (req, res, next) => {
        Order.findOneAndUpdate ({_id: req.body._id}, {status: "completed"}, {}, (error, response) => {
            if (error) console.log (error);
            res.send (response);
        })
    },

    getActiveOrders: (req, res, next) => {
        Order.find ({}, (error, orders) => {
            if (error) console.log (error);
            res.send (orders);
        });
    }
}