const router = require('express').Router()
const {Product} = require('../db')

const isAdmin = (req, res, next) => {
  console.log(req)
  if (!req.user || !req.user.isAdmin) {
    const err = Error('Admin not logged in')
    err.status = 403
    return next(err)
  }
  next()
}

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {name, description, price, stock} = req.body
  try {
    const product = await Product.create({
      name,
      description,
      price,
      stock
    })

    res.status(201).json(product)
  } catch (err) {
    next(err)
  }
})

module.exports = router
