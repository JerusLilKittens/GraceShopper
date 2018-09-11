const User = require('./user')
const Category = require('./category')
const Product = require('./product')
const Cart = require('./cart')

Category.hasMany(Product)
Product.hasMany(Category)

module.exports = {
  User,
  Cart,
  Category,
  Product
}
