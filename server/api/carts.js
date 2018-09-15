const router = require('express').Router()
const {Cart, Product} = require('../db')

router.get('/:cartId', async (req, res, next) => {
  const cartId = req.params.cartId
  try {
    const carts = await Cart.findAll({
      include: [{model: Product}],
      where: {id: cartId}
    })
    res.json(carts)
  } catch (err) {
    next(err)
  }
})

module.exports = router
