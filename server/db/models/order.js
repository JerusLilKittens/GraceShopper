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
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['created', 'processing', 'cancelled', 'completed']]
    }
  }
})

module.exports = Order
