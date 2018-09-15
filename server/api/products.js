const router = require('express').Router()
const {Product, Review, Category,ProdCat} = require('../db')

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
    const product = await Product.findById(req.params.productId, {
      include: [Review,Category]
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const id = req.body.id
    const {name, description, stock, price, catId} = req.body.formData
    const productCat = await ProdCat.update({categoryId: catId},{where: {productId: id}})
    const product = await Product.update(
      {name, description, stock, price },
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
