const db = require('../db')
const Sequelize = require('sequelize')

const CartItem = db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = CartItem
