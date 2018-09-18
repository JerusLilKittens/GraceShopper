const router = require('express').Router()
const {Cart, Product} = require('../db')

router.get('/', async (req, res, next) => {
  const findId = req.user ? {userId: req.user.id} : {sessionId: req.sessionID}
  try {
    const cart = await Cart.findOne({
      include: [{model: Product}],
      where: findId
    })

    res.json(cart)
  } catch (err) {
    next(err)
  }
})

module.exports = router
