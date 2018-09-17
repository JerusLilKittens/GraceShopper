const router = require('express').Router()
const {Cart, Product} = require('../db')

router.get('/', async (req, res, next) => {
  const findId = req.user ? {userId: req.user.id} : {sessionId: req.sessionID}
  try {
    const cart2 = await Cart.findOne({
      include: [{model: Product}],
      where: {sessionId: req.sessionID}
    })
    const cart = await Cart.findOne({
      include: [{model: Product}],
      where: findId
    })

    res.send({cart, cart2})
  } catch (err) {
    next(err)
  }
})

module.exports = router
