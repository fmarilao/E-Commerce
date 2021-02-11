const server = require('express').Router();
const { Order, WishList } = require("../db.js");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Create Wish
server.post('/:userId', async (req, res, next) => {
    try {
        if(typeof parseInt(req.params.userId) === 'number'){
        const state = 'created'
        const wish = await WishList.create({state})
        wish.userId = req.params.userId;
        wish.save()
        res.json(wish);
      }
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// Update Wish
server.put('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const order = await Order.findOne({
          where: {
            [Op.or]: [
              { state: 'cart' },
              { state: 'created' },
              { state: 'processing' }
            ],
            userId
          }
        })
        const { state, purchaseAmount, shippingCost, shippingAddress, shippingZip, shippingCity, shippingState, firstName, lastName, comments } = req.body;
        order.state = state;
        order.purchaseAmount= purchaseAmount;
        order.shippingCost = shippingCost;
        order.shippingAddress= shippingAddress;
        order.shippingZip = shippingZip;
        order.shippingCity= shippingCity;
        order.shippingState = shippingState;
        order.firstName= firstName;
        order.lastName = lastName;
        order.comments= comments;
        order.save()
        res.json(order)
    } catch (e) {
        res.status(500).json({
            message: 'There has been an error'
        });
        next(e);
    }
})

module.exports = server;