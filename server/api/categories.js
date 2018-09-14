const router = require('express').Router()
const {Category, Product} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

// router.get('/0')

router.get('/:categoryId', async (req, res, next) => {
  const categoryId = req.params.categoryId
  try {
    const categories = await Category.findAll({
      include: [{model: Product}],
      where: {id: categoryId}
    })
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.get('')

module.exports = router
