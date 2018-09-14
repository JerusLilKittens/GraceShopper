const router = require('express').Router()
const {ProdCat, Category} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

// router.get('/:categoryId', async (req, res, next) => {
//   const categoryId = req.params.categoryId
//   try {
//     const categories = await ProdCat.findAll({
//       where: {categoryId}
//     })
//     res.json(categories)
//   } catch (err) {
//     next(err)
//   }
// })

router.get('')

module.exports = router
