const router = require('express').Router()
const {Order, LineItem, User, Product} = require('../db')

// const isAdmin = (req, res, next) => {
//   console.log(req)
//   if (!req.user || !req.user.isAdmin) {
//     const err = Error('Admin not logged in')
//     err.status = 403
//     return next(err)
//   }
//   next()
// }

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll()
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const order = await Order.create(req.body)
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId, {
      include: User
    })
    const items = await LineItem.findAll({where: {
      lineItemOrderId: req.params.orderId
    }})
    const products = await Product.findAll()
    res.json({order: order, items: items, products: products})
  } catch (err) {
    next(err)
  }
})

router.get('/users/:userId', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(orders)
  } catch (err) {
    next(err)
  }
})

router.put('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const newStatus = req.body.newStatus
    const order = await Order.update(
      {status: newStatus},
      {where: {
        id: orderId
      }}
    )
    res.send(order)

  } catch (err)
  {
    next(err)
  }


})



module.exports = router
