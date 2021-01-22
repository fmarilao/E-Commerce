const server = require('express').Router();
const { Product } = require("../db.js");



server.post('/addProduct', (req, res, next) => {
    console.log(req.body)
     const {name, description, price, stock, img, status} = req.body; 
     Product.create({
         name,
         description,
         price,
         stock,
         img,
         status,
     })
     .then((response) => {res.status(200).send(response + "Producto creado con exito")})
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

module.exports = server;