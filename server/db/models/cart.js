const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  sessionId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Cart
