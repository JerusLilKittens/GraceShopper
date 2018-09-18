const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router
const {isSelf, isAdmin} = require('./auth')

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {firstName, lastName, address, city, state, email, password} = req.body
  try {
    const newUser = await User.create({
      firstName,
      lastName,
      address,
      city,
      state,
      email,
      password
    })
    res.send(newUser)
  } catch (err) {
    next(err)
  }
})

router.put('/:userId', async (req, res, next) => {
  const {firstName, lastName, address, city, state, email, id} = req.body
  try {
    await User.update(
      {
        firstName,
        lastName,
        address,
        city,
        state,
        email
      },
      {
        where: {id},
        returning: true,
        plain: true
      }
    )
    res.status(201).end()
  } catch (err) {
    next(err)
  }
})
