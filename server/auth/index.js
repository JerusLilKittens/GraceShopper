const router = require('express').Router()
const User = require('../db/models/user')
const Cart = require('../db/models/cart')
const Product = require('../db/models/product')

const mergeCarts= (oldCart = [], savedCart = [])=> {
  let mergedCart = []
  let savedCartIds = []
  let oldCartIds = []
  let savedCartQuantity = {}
  for (let j = 0; j < savedCart.length; j++) {
    savedCartIds.push(savedCart[j].id)
    savedCartQuantity[savedCart[j].id] = savedCart[j].cartItem.quantity
  }
  for (let m = 0; m < oldCart.length; m++) {
    oldCartIds.push(oldCart[m].id)
  }
  for (let i = 0; i < oldCart.length; i++) {
    if (savedCartIds.indexOf(oldCart[i].id) === -1) {
      mergedCart.push(oldCart[i])
    } else {
      let oldQuantity = oldCart[i].cartItem.quantity
      let savedQuantity = savedCartQuantity[oldCart[i].id]
      let newQuantity =
        savedQuantity > oldQuantity ? savedQuantity : oldQuantity
      oldCart[i].cartItem.quantity = newQuantity
      mergedCart.push(oldCart[i])
    }
  }
  for (let l = 0; l < savedCart.length; l++) {
    if (oldCartIds.indexOf(savedCart[l].id) === -1) {
      mergedCart.push(savedCart[l])
    }
  }
  return mergedCart
}


module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const sessionId = req.sessionID
    
    
    console.log(sessionId, 'sessionId')
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      // going to input cart here after finding it with sessionID then linking it

      const cart2 = await Cart.findOne({
        include: [{model: Product}],
        where: {sessionId: req.sessionID}
      })
      const cart1 = await Cart.findOne({
        include: [{model: Product}],
        where: user.id
      })
      
      if(cart2){
        const merged = mergeCarts(cart1.products,cart2.products)
        console.log(merged, '++++++++++++++++++++')
      }

      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))
