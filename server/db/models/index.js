const User = require('./user')
const Review = require('./review')
const Category = require('./category')
const Product = require('./product')
const Cart = require('./cart')
const Order = require('./order')
const LineItem = require('./lineItem')

Review.belongsTo(Product)
Product.hasMany(Review)
Review.belongsTo(User)
User.hasMany(Review)
Category.hasMany(Product)
Product.belongsToMany(Category, {through: 'prod_cat'})
Order.belongsTo(User)
User.hasMany(Order)

LineItem.belongsTo(Product)
Product.hasMany(LineItem, {as: 'lineItemProductId'})

LineItem.belongsTo(Order)
Order.hasMany(LineItem, {as: 'lineItemOrderId'})

Product.belongsToMany(Order, {foreignKey: 'lineItemProductId', through: 'lineitem'})
Order.belongsToMany(Product, {foreignKey: 'lineItemOrderId', through: 'lineitem'})

module.exports = {
  User,
  Cart,
  Category,
  Product,
  Review,
  Order,
  LineItem
}
