const router = require('express').Router()
// const isAdmin = (req,res,next) => {
//   if(!req.user || !req.user.isAdmin){
//     const err = Error('Admin not logged in')
//     err.status = 403
//     return next(err)
//   }
//   next()
// }

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/categories', require('./categories'))
router.use('/orders', require('./orders'))
router.use('/reviews', require('./reviews'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

module.exports = router
