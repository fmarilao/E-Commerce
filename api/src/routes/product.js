const server = require('express').Router();
const { Product, Category } = require("../db.js");

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

//S22
//Crear Ruta que devuelva los productos de X categoria
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
