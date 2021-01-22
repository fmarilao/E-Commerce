const { Router } = require('express');
// import all routers;
const productRouter = require("./product.js");
const adminProdRouter = require("./adminProduct");

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/products", productRouter);
router.use("/dashboard/products", adminProdRouter);

module.exports = router;
