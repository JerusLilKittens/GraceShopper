const User = require('./user')
const Review = require('./review')
const Category = require('./category')
const Product = require('./product')
const Cart = require('./cart')
const Order = require('./order')
const ProdCat = require('./product-category')
const LineItem = require('./lineItem')
const CartItem = require('./cartItem')

Review.belongsTo(Product)
Product.hasMany(Review)

Review.belongsTo(User)
User.hasMany(Review)

Category.hasMany(Product)
Product.belongsToMany(Category, {through: ProdCat})
Order.belongsTo(User)
User.hasMany(Order)

Product.belongsToMany(Order, {
  foreignKey: 'lineItemProductId',
  through: 'lineItem'
})
Order.belongsToMany(Product, {
  foreignKey: 'lineItemOrderId',
  through: 'lineItem'
})

Product.belongsToMany(Cart, {
  foreignKey: 'cartItemProductId',
  through: 'cartItem'
})
Cart.belongsToMany(Product, {foreignKey: 'cartItemCartId', through: 'cartItem'})

Cart.belongsTo(User)
User.hasOne(Cart)

module.exports = {
  User,
  Cart,
  Category,
  Product,
  Review,
  Order,
  ProdCat,
  LineItem,
  CartItem
}
