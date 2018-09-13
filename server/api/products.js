const {router, isAdmin} = require('express').Router()
const {Product} = require('../db')



router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin ,async (req, res, next) => {
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
