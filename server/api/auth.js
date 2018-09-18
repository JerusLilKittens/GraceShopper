const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const err = new Error('Admin not logged in')
    err.status = 403
    return next(err)
  }
  next()
}

const isUser = (req, res, next) => {
  if (!req.user) {
    const err = new Error('User is not logged in')
    err.status = 403
    return next(err)
  }
  next()
}

const isSelf = (req, res, next) => {
  if (req.user === req.requestedUser) {
    next()
  }
  const err = new Error('User is not logged in')
  err.status = 403
  return next(err)
}

module.exports = {isAdmin, isUser, isSelf}
