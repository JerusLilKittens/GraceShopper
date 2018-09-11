const User = require('./user')
const Review = require('./review')
const Category = require('./category')
const Product = require('./product')
const Cart = require('./cart')


// Review.belongsTo(Product)
// Product.hasMany(Review)
// Review.belongsTo(User)
// User.hasMany(Review)

Category.hasMany(Product)
Product.hasMany(Category)

module.exports = {
  User,
  Cart,
  Category,
  Product,
  Review
}
