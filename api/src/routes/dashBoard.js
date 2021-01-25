const server = require('express').Router();
const { Product, Image, Category } = require("../db.js");



server.post('/addProduct', (req, res, next) => {
    const {name, description, price, stock, status} = req.body;
      Product.create({
         name,
         description,
         price,
         stock,
         status,
     })
     .then((response) => {res.status(200).send(response)})
});

server.post('/updateProduct', (req, res, next) => {
    console.log(req.body)
    const {id, name, price, description, stock, status} = req.body; 
    Product.update({
        name: name,
        description: description,
        price: price,
        stock: stock,
        status: status,
      }, {
        where: {
          id: id
        }
      }).then((response) => res.status(200).send("Producto Actualizado"))
      .catch((err) => res.status(400).send("Hubo un error al intentar actualizar"))
      
})
                
server.delete('/products/delete/:productId',(req, res, next) => {
    const {productId} = req.params;
    Product.destroy({
        where: {
          id: productId,
        },
      })
        .then((product) => {
          if (product) {
            res.status(200).send("Se borro el producto" + product);
          } else {
            res.status(400).send("No se encontro producto con la id" + productId);
          }
        })
        .catch((err) => {
          console.log("Error" + err);
        });
});

server.post('/addPhotos', async (req, res, next) => {
  try {
    const photo = await Image.create({url: req.body.url});
    res.status(201).json(photo)
  } catch (e) {
    res.status(500).send({
        message: 'There has been an error'
    });
    next(e);
  }
})

server.get('/listPhotos', async (req, res, next) => {
  try {
    const photos = await Image.findAll();
    res.json(photos)
  } catch (e) {
    res.status(500).send({
        message: 'There has been an error'
    });
    next(e);
  }
})

server.delete('/deletePhoto/:id', async (req, res, next) => {
  try {
      const photo = await Image.findOne({where: {id: req.params.id}});
      photo.destroy()
      res.json({message: "Photo was deleted"})
  } catch (e) {
      res.status(500).send({
          message: 'There has been an error'
      });
      next(e);
  }
})

// Associates a photo to a product
server.post("/:idProduct/image/:idImage", (req, res, next) => {
  let idImage = req.params.idImage;
  let idProduct = req.params.idProduct;
  //Traer antes el nombre de la categoría?
  Image.findByPk(idImage).then((image) => {
    image.productId = idProduct;
    image.save()
    res.json(image);
  });
});

// Delete photo from product
server.delete("/image/:idImage", (req, res, next) => {
  let idImage = req.params.idImage;
  //Traer antes el nombre de la categoría?
  Image.findByPk(idImage).then((image) => {
    image.productId = null;
    image.save()
    res.json(image);
  });
});

// List all images that belong to products
server.get("/image/:idProduct", (req, res, next) => {
  let idProduct = req.params.idProduct;
  Image.findAll({
    where: { productId: idProduct },
  }).then((images) => {
    if (!images) {
      res.status(404).send({message: "Image not found"});
    } else {
      res.json(images);
    }
  });
});

server.post('/category', async (req, res, next) => {
  try {
      const { name, description } = req.body
      const category = await Category.create({name, description})
      res.status(201).json(category)
  } catch (e) {
      res.status(500).send({
          message: 'There has been an error'
      });
  }
});

server.put('/category/:categoryId', async (req, res, next) => {
  try {
      const { name, description } = req.body;
      const { categoryId } = req.params
      const category = await Category.update( {name, description }, { where: {id: categoryId} } )
      res.json(category)
  } catch (e) {
      res.status(500).send({
          message: 'There has been an error'
      });
      next(e);
  }
})

server.delete('/category/:categoryId', async (req, res, next) => {
  try {
      const category = await Category.findByPk(req.params.categoryId);
      category.destroy()
      res.json({message: "Category was deleted"})
  } catch (e) {
      res.status(500).send({
          message: 'There has been an error'
      });
      next(e);
  }
})

// Associates category to product
server.post('/products/:idProducto/category/:categoryId', (req, res, next) => {

	const { idProducto, categoryId } = req.params;

	// if (typeof categoryId !== "number") {
	// 	return res.status(401).send('Categoria debe ser un valor numerico');
	// }

	Product.findOne({
		where: {
			id: idProducto
		},
		include: [{ model: Category }]
	}).then(response => {
		if (!response) {
			return res.status(404).end()
		}
		let prod = response;
		prod.addCategories([categoryId])
		res.status(200)
	}).catch(err => {
		console.log(err)
		return res.status(404).end()
	})
	res.end()
})

// Delete category from product
server.delete("/products/:idProduct/category/:idCat", (req, res, next) => {
  let idCategory = req.params.idCat;
  let idProduct = req.params.idProduct;
  //Traer antes el nombre de la categoría?
  Product.findByPk(idProduct).then((product) => {
    product.removeCategories(idCategory);
    res.json(product);
  });
});


// Bring categories that product has
server.get("/categories/:idProd", (req, res, next) => {
  let idProduct = req.params.idProd;
  Product.findAll({
    where: { id: idProduct },
    include: [{ model: Category }],
  }).then((categories) => {
    if (!categories) {
      res.status(404).send("Error");
    } else {
      res.json(categories);
    }
  });
});


module.exports = server;