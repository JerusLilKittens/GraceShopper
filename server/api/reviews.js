const router = require('express').Router()
const {Review} = require('../db')

const isLoggedIn = (req, res, next) => {
  console.log(req)
  if (!req.user) {
    const err = Error('User is not logged in')
    err.status = 403
    return next(err)
  }
  next()
}

router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.status(201).json(review)
  } catch (err) {
    next(err)
  }
})

module.exports = router
