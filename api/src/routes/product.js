const server = require('express').Router();
const { Product, Category } = require("../db.js");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

server.get('/', (req, res, next) => {
  const value = req.query.search
  if (value) {
    console.log("entre 1: " + value)
    Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: '%' + value + '%', 
            },
          },
          {
            description: {
              [Op.iLike]: '%' + value + '%',
            },
          },
        ],
      },
    })
      .then((products) => {
        if (products.length === 0) {
          res.status(404).send('No se encontro producto');
        } else {
          res.send(products);
        }
      })
      .catch((err) => res.status(500).send(err));
  } else {
    console.log("entre 2: " + value)
    Product.findAll({
      where: {
        stock: {
          [Op.gt]: 0,
        },
      },
    })
      .then((products) => res.send(products))
      .catch((err) => res.status(500).send(err));
  }
});

server.get('/:id', (req, res) => {
	Product.findOne({
		where: {
			id: req.params.id
		}
	})
	.then(productId => {
		res.json('product', {productId})
	})
	.catch(err => {
		res.status(500).send(err)
	})
})

server.get("/category/:idCat", (req, res, next) => {
  let idCategory = req.params.idCat;
  Category.findAll({
    where: { id: idCategory },
    include: [{ model: Product }],
  }).then((products) => {
    if (!products) {
      res.status(404).send("Error");
    } else {
      res.json(products);
    }
  });
});

module.exports = server;