const router = require('express').Router()
const {Product, Review, Category, ProdCat} = require('../db')
const {isAdmin} = require('./auth')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/search/:que', async (req, res, next) => {
  try {
    const que = req.params.que
    const results = await Product.findAll({
      limit: 2,
      where: {name: {$iLike: `%${que}%`}}
    })
    res.send(results)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId, {
      include: [Review, Category]
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/', isAdmin, async (req, res, next) => {
  try {
    const id = req.body.id
    const {name, description, stock, price, cats} = req.body.formData
    cats.forEach(async cat => {
      const findOrCreateCat = await Category.findOrCreate({where: {name: cat}})
      const productCat = await ProdCat.findOrCreate({
        where: {
          categoryId: findOrCreateCat[0].id,
          productId: id
        }
      })
    })
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

router.delete('/', isAdmin, async (req, res, next) => {
  try {
    const id = await Category.findOne({where: {name: req.body.catName}})
    await ProdCat.destroy({
      where: {
        productId: req.body.productId,
        categoryId: id.id
      }
    })
    res.status(200).end()
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
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
