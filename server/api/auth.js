const isAdmin = (req, res, next) => {
  console.log(req)
  if (!req.user || !req.user.isAdmin) {
    const err = Error('Admin not logged in')
    err.status = 403
    return next(err)
  }
  next()
}

module.exports = isAdmin
