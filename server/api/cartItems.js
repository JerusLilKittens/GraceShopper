const router = require('express').Router()
const { CartItem } = require('../db')

router.get('/', async (req, res, next) => {
  // const cartId = req.params.cartId
  try {
    const cartItems = await CartItem.findAll()
    res.json(cartItems)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  // const cartId = req.params.cartId
  try {
    const cartItem = await CartItem.create(req.body)
    res.status(201).json(cartItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/', async (req, res, next) => {
  // const cartId = req.params.cartId
  try {
    const cartItem = await CartItem.destroy()
    res.status(201).json(cartItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
