const server = require('express').Router(); 
const { Product, User, Reviews } = require('../db.js');
const { verifyToken, verifyUser } = require('../middlewares/auth');

//[verifyToken, verifyRole],

//Crear ruta para crear/agregar Review
server.post(
  '/:productId/:userId',

  (req, res, next) => {
    const { description, rating, author } = req.body;
    const { productId, userId } = req.params;
    Reviews.create({
      rating,
      description,
      productId,
      userId,
      author,
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

//Delete una review de un producto
server.delete('/:idReview',  (req, res, next) => {
  const { idReview } = req.params;
    Reviews.findByPk(idReview)
      .then((rev) => {
        if (rev) {
          rev.destroy()
          res.status(200).json(rev)
        } else {
          res.status(400).json({ message: 'Review not found' });
        }
    })
    .catch((e) => {
      res.status(400).send('error');
    }); 
});


module.exports = server;