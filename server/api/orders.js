const router = require('express').Router()
const {Order, LineItem, User} = require('../db')

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
    const products = await Order.findAll()
    res.json(products)
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
    res.json({order: order, items: items})
  } catch (err) {
    next(err)
  }
})



module.exports = router
