const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./category.js');
const adminProdRouter = require("./adminProduct");
const dashBoard = require('./dashBoard.js');


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);

router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use("/dashboard/products", adminProdRouter);

router.use('/dashboard', dashBoard);

module.exports = router;
