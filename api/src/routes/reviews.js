const server = require('express').Router(); 
const { Product, User, Reviews } = require('../db.js');
const { verifyToken, verifyRole } = require('../middlewares/auth');

//[verifyToken, verifyRole],

server.post('/:productId/:userId',  (req, res, next) => {
  const { description, rating } = req.body;
  const { productId, userId } = req.params;
  Reviews.create({
    rating,
    description,
    productId,
    userId,
  }).then((response) => {
    res.status(200).send(response);
  }).catch((err) => {
    console.log(err)
  })
});

module.exports = server;