const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const dashBoard = require('./dashBoard.js');
const orderRouter = require('./order')


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/dashboard', dashBoard);
router.use('/orders', orderRouter);

module.exports = router;
