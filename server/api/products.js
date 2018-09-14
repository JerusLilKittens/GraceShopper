const router = require('express').Router()
const {Product, Review} = require('../db')

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


router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId, { include: Review })
    res.json(product)
  } catch (err) {
    next(err)
  }
})


// need to test and make a test
// waiting for single product  route to test
router.put('/', async (req, res, next) => {
  try {
    const {id, productBody} = req.body
    const {name, description, stock, price} = productBody
    const product = await Product.update(
      {name, description, stock, price},
      {
        where: {id: id},
        returning: true,
        plain: true
      }
    )
    const updatedProduct = await Product.findById(product[1].id)
    res.send(updatedProduct)
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
