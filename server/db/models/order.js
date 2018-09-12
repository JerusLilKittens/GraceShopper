const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  billingInfo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  shippingInfo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  totalAmount: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    validate: {
      isDecimal: true
    }
  }
})

module.exports = Order