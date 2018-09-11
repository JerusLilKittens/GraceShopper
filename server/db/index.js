const db = require('./db')
const {User, Product, Review, Order, Category} = require('./models')

// register models
require('./models')

module.exports = {db, User, Product, Review, Order, Category}
