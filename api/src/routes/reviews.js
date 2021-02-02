const server = require('express').Router(); 
const { Product, User, Reviews } = require('../db.js');
const { verifyToken, verifyRole } = require('../middlewares/auth');

//[verifyToken, verifyRole],


//Crear ruta para crear/agregar Review
server.post(
  '/:productId/:userId',
  
  (req, res, next) => {
    const { description, rating } = req.body;
    const { productId, userId } = req.params;
    Reviews.create({
      rating,
      description,
      productId,
      userId,
    })
      .then((response) => {
        res.status(200).send(response);
      })
      .catch((error) =>
        res.status(400).json({
          error: error,
        })
      );
  }
);
//Obtener todas las reviews de un producto
server.get('/product/:id', (req, res) => {
  const { productId } = req.params.id;
  Reviews.findAll({
    where: {
      productId: productId,
    }
  })
  console.log(review)
    .then((review) => res.status(200).send(review))
    .catch((err) => res.send(err));
}); 

module.exports = server;