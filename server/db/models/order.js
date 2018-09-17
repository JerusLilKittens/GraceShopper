const db = require('../db')
const Sequelize = require('sequelize')

const Order = db.define('order', {
  billingInfo: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  shippingInfo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  totalAmount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isDecimal: false
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
