const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  product: {
    type: Sequelize.JSON
  }
})


module.exports = Cart
