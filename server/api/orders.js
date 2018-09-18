const router = require('express').Router()
const {Order, LineItem, User, Product} = require('../db')
const {isAdmin} = require('./auth')

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

router.post('/order-items/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const cartItems = cartToOrder(req.body.items, orderId)
    const lineItems = await LineItem.bulkCreate(cartItems)

    let productRow
    for (let i = 0; i < cartItems.length; i++) {
      console.log('pr', productRow)
      productRow = await Product.findById(cartItems[i].lineItemProductId)
      productRow.stock -= cartItems[i].quantity
      productRow.save().then(() => {})
      console.log('updated:', productRow)
    }
    res.send(lineItems)
  } catch (err) {
    next(err)
  }
})

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.orderId, {
      include: User
    })
    const items = await LineItem.findAll({
      where: {
        lineItemOrderId: req.params.orderId
      }
    })
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

router.put('/:orderId', isAdmin, async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const newStatus = req.body.newStatus
    const order = await Order.update(
      {status: newStatus},
      {
        where: {
          id: orderId
        }
      }
    )
    res.send(order)
  } catch (err) {
    next(err)
  }
})

function cartToOrder(cart, orderId) {
  const result = []
  for (let i = 0; i < cart.length; i++) {
    let row = {}
    row.quantity = cart[i].cartItem.quantity
    row.price = cart[i].price
    row.lineItemProductId = cart[i].id
    row.lineItemOrderId = orderId
    result.push(row)
  }
  return result
}

module.exports = router
