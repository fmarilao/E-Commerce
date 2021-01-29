const server = require('express').Router();
const { Order } = require("../db.js");

// Create Order
server.post('/:userId', async (req, res, next) => {
    try {
        const { state, purchaseAmount, shippingCost, shippingAddress, shippingZip, shippingCity } = req.body
        let obj = { state, purchaseAmount, shippingCost, shippingAddress, shippingZip, shippingCity }
        const order = await Order.create(obj)
        order.userId = req.params.userId;
        order.save()
        res.json(order);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// Update Order
server.put('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { state, purchaseAmount, shippingCost, shippingAddress, shippingZip, shippingCity } = req.body;
        let obj = { state, purchaseAmount, shippingCost, shippingAddress, shippingZip, shippingCity };
        const order = await Order.update( obj, { where: { userId } });
        res.json(order)
    } catch (e) {
        res.status(500).json({
            message: 'There has been an error'
        });
        next(e);
    }
})

// Delete Order
server.delete('/:orderId', async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findByPk(orderId);
        order.destroy()
        res.json(order)
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// List all orders
server.get('/', async (req, res, next) => {
    try {
        const orders = await Order.findAll()
        res.json(orders);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// List active order
server.get('/active/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params
        const orders = await Order.findAll({
            where: {state: 'cart' || 'created', userId}
        })
        res.json(orders);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

// List one order
server.get('/:id', async (req, res, next) => {
    try {
      const {id} = req.params
      const order = await Order.findByPk(id)
      res.json(order)
    } catch (e) {
      res.status(500).send({
        message: 'There has been an error'
      });
      next(e);
    }
  })

// List user's orders
server.get('/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params
        let response = [];
        const orders = await Order.findAll( { where: {userId } });
        orders.forEach(order => order.userId === userId && response.push(order));
        res.json(response);
    } catch (e) {
        res.status(500).send({
            message: 'There has been an error'
        });
        next(e);
    }
})

//*S38 agregar Item al Carrito

server.post('/users/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        state: 'cart',
      },
    });
    const product = await Product.findByPk(req.body.id);
    await order.addProducts(product, {through: { price: product.price, quantity: req.body.quantity },
    })
    //await order.addProducts(product);
    res.json(product)

  } catch (e) {
    res.status(500).send({
      message: 'There has been an error',
    });
    next(e);
  }
});

//*S39
server.get('/users/:userId/cart', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'cart',
      },
    });
    const items = await OrderLine.findAll({
      where: {
        orderId: order.id,
      },
    });
    res.json(items);
  } catch (e) {
    res.status(500).send({
      message: 'There has been an error',
    });
    next(e);
  }
});





module.exports = server;
