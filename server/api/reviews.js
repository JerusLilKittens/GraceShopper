const router = require('express').Router()
const {Review} = require('../db')
const {isUser} = require('./auth')

router.post('/', isUser, async (req, res, next) => {
  try {
    // isLoggedIn()
    const review = await Review.create(req.body)
    res.status(201).json(review)
  } catch (err) {
    next(err)
  }
})

module.exports = router
