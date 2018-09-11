const db = require('./database')
const Sequelize = require('sequelize')

const Orders = db.define('orders', {
  products: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  billingInfo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  shippingInfo: {
    type: Sequelize.TEXT,
    allownull: false
  },
  totalAmount: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Orders
