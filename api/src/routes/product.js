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
      childKey: IdCategory,
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
      childKey: IdCategory,
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
server.get("/category/:idCat", (req, res, next) => {
  let idCategory = req.params.idCat;
  //Find a la category
  //Buscar en la categoría si tiene fatherKey sino es father
  //Category.findByPk(category).then(category=>{})
  Product.findAll({
    where: { childKey: idCategory },
  }).then((products) => {
    if (!products) {
      res.status(404).send("Error");
    } else {
      res.json(products);
    }
  });
});

module.exports = server;
