const server = require('express').Router(); 
const { Product, User, Reviews } = require('../db.js');
const { verifyToken, verifyUser } = require('../middlewares/auth');

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
server.get("/:productId", async (req, res, next) => {
  const productId = req.params.productId;
  try {
    const reviews = await Reviews.findAll({
      where: { productId: productId },
      include: [{ model: Product }],
    });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

//Editar una review de un producto
server.put('/:productId/:idReview', async (req, res, next) => {
  const { productId, idReview } = req.params;
   const { description, rating } = req.body;
  try {
    const reviews = await Reviews.update(
      {
        rating,
        description,
      },
      {
        where: { productId: productId, id: idReview },
      }
    );
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

server.delete('/:productId/:idReview'), async (req, res, next) => {
  const { idReview, productId } = req.params;
  try {
    const reviews = await Reviews.destroy(
      {
        where: { productId: productId, id: idReview },
      }
    );
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};


module.exports = server;