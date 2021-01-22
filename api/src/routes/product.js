const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.get('/products/:id', (req, res) => {
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

module.exports = server;
