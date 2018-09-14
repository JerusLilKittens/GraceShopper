const router = require('express').Router()
const {Order} = require('../db')

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
