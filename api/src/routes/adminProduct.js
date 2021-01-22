const server = require("express").Router();
const { Product, Category } = require("../db.js");

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

module.exports = server;
