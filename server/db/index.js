const db = require('./db')
const {User, Product, Review, Order, Category, LineItem, CartItem, Cart} = require('./models')

// register models
require('./models')

module.exports = {db, User, Product, Review, Order, Category, LineItem, CartItem, Cart}
