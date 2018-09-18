const router = require('express').Router()
const {Product, Review, Category, ProdCat} = require('../db')
const Sequilize = require('sequelize')
const Op = Sequilize.Op

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


// doesn't allow to search with varibles only can hard search
router.get('/search/:que', async (req, res, next) => {
  try {
    const que = req.params.que
    const results = await Product.findAll({limit: 2, 
       where: {name: {$iLike: `%${que}%` }}
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

router.put('/', async (req, res, next) => {
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

router.delete('/', async (req, res, next) => {
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
