const server = require('express').Router();
const { Order } = require("../db.js");

// Create Order
server.post('/:userId', async (req, res, next) => {
    try {
        const { state, purchaseAmount, shippingCost, shippingAddress, shippingZip, shippingCity } = req.body
        let obj = { state, purchaseAmount, shippingCost, shippingAddress, shippingZip, shippingCity }
        const order = await Order.create(obj)
        order.userId = req.params.userId;
        order.save()
        res.json(order);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// Update Order
server.put('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { state, purchaseAmount, shippingCost, shippingAddress, shippingZip, shippingCity } = req.body;
        let obj = { state, purchaseAmount, shippingCost, shippingAddress, shippingZip, shippingCity };
        const order = await Order.update( obj, { where: { userId } });
        order.userId = userId;
        order.save();
        res.json(order)
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// List all orders
server.get('/', async (req, res, next) => {
    try {
        const orders = await Order.findAll()
        res.json(orders);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// List one order
server.get('/:id', async (req, res, next) => {
    try {
      const {id} = req.params
      const order = await Order.findByPk(id)
      res.json(order)
    } catch (e) {
      res.status(500).send({
        message: 'There has been an error'
      });
      next(e);
    }
  })

// List user's orders
server.get('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params
        let response = [];
        const orders = await Order.findAll( { where: {userId } });
        orders.forEach(order => order.userId === userId && response.push(order));
        res.json(response);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

module.exports = server;
