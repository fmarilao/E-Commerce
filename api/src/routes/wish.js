const server = require('express').Router();
const { Product, WishList, WishLine } = require("../db.js");
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

// Add item to WishList
server.post('/:userId/wish', async (req, res, next) => {
  try {
    const wish = await WishList.findOne({
      where: {
        userId: req.params.userId,
      },
    });
    const product = await Product.findByPk(req.body.Id);
    console.log('PRODUCT', product)
    const prevWishLine = await WishLine.findOne({where: {productId: product.id, wishId: wish.id}})
      if(!prevWishLine){
        const wishLine = await WishLine.create({
          productId: product.id, wishId: wish.id })  
        res.json(wishLine);
      } else {
        res.json({message: 'Product already in wishlist '})
      }


  } catch (e) {
    res.status(500).send({
      message: 'There has been an error',
    });
    next(e);
  }
});
module.exports = server;