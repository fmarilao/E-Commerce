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
//Agrega la categoria al producto
server.post("/:idProduct/category/:idCat", (req, res, next) => {
  let idCategory = req.params.idCat;
  let idProduct = req.params.idProduct;
  //Traer antes el nombre de la categoría?
  Product.findByPk(idProduct).then((product) => {
    product.setCategories(idCategory);
    res.json(product);
  });
});

//Elimina la categoria al producto
server.delete("/:idProduct/category/:idCat", (req, res, next) => {
  let idCategory = req.params.idCat;
  let idProduct = req.params.idProduct;
  //Traer antes el nombre de la categoría?
  Product.findByPk(idProduct).then((product) => {
    product.removeCategories(idCategory);
    res.json(product);
  });
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
