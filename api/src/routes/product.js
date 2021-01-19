const server = require('express').Router();
const { Product, Category } = require("../db.js");

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

//S17
server.post("/:idProduct/category/:idCat", (req, res, next) => {
  let IdCategory = req.params.idCat;
  let idProduct = req.params.idProduct;
});

server.delete("/:idProduct/category/:idCat", (req, res, next) => {
  let IdCategory = req.params.idCat;
  let idProduct = req.params.idProduct;
});

//S22
server.get("/category/:cat", (req, res, next) => {
  let category = req.params.cat;
  Category.findAll({
    include: [{model: Product,
    where: {name: category}}],
  }).then((category) => {
    if (!category) {
      res.status(404).send("Error");
    } else {
      res.send(category);
    }
  });
});

module.exports = server;
