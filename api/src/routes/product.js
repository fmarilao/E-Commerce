const server = require('express').Router();
const { Product } = require('../db.js');

//Esta ruta ya venia en el repo // VER
server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});
server.get('/products', (req, res) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
});

module.exports = server;
