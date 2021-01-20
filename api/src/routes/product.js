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
  let IdCategory = req.params.idCat;
  let idProduct = req.params.idProduct;
  //Traer antes el nombre de la categoría?
  Product.update(
    {
      //category o childkey??
      category: Category.name,
    },
    {
      where: {
        id: idProduct,
      },
    }
  ).then((product) => {
    res.json(product);
  });
});

//Elimina la categoria al producto
server.delete("/:idProduct/category/:idCat", (req, res, next) => {
  let IdCategory = req.params.idCat;
  let idProduct = req.params.idProduct;
  //Traer antes el nombre de la categoría?
  Product.destroy(
    {
      //category o childkey??
      category: Category.name,
    },
    {
      where: {
        id: idProduct,
      },
    }
  ).then((product) => {
    res.json(product);
  });
});

//S22
//Crear Ruta que devuelva los productos de X categoria
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
