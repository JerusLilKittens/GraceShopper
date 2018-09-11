const User = require('./user')
<<<<<<< HEAD
const Orders = require('./orders')

=======
const Cart = require('./cart')
>>>>>>> ab94f8b93f7119252e31e3783f2530e294f80a23

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
<<<<<<< HEAD
  User, Orders
=======
  User, Cart
>>>>>>> ab94f8b93f7119252e31e3783f2530e294f80a23
}
