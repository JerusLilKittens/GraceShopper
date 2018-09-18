const router = require('express').Router()
const {Cart, CartItem} = require('../db')

router.get('/', async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll()
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})

router.get('/:cartId', async (req, res, next) => {
  const {cartId} = req.params
  try {
    const cartItems = await CartItem.findAll({
      where: {cartId}
    })
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})

router.put('/:cartId/:productId', async (req, res, next) => {
  try {
    const {productId, cartId} = req.params
    const prevQuant = req.body.item.cartItem.quantity
    const quantity = req.body.inc ? prevQuant + 1 : prevQuant - 1
    const [numberOfAffectedRows, affectedRows] = await CartItem.update(
      {
        quantity
      },
      {
        where: {cartId, productId},
        returning: true,
        plain: true
      }
    )
    console.log(affectedRows.dataValues)
    res.status(201).json(affectedRows)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {productId} = req.body
    const findId = req.user ? {userId: req.user.id} : {sessionId: req.sessionID}
    const [cart] = await Cart.findOrCreate({where: findId})
    const [cartItem, wasCreated] = await CartItem.findOrCreate({
      where: {cartId: cart.id, productId},
      defaults: {quantity: 1}
    })
    if (wasCreated === true) {
      res.status(201).json(cartItem)
    } else {
      cartItem.dataValues.quantity = cartItem.dataValues.quantity + 1
      console.log('cartitem found', cartItem)
      res.status(201).json(cartItem)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  try {
    const {cartId, productId} = req.body
    const cartItem = await CartItem.destroy({where: {cartId, productId}})
    res.status(201).json(cartItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
