const db = require('./database')
const Sequelize = require('sequelize')

const Orders = db.define('orders', {
  Products: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },
  BillingInfo: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  ShippingInfo: {
    type: Sequelize.Text,
    allownull: false
  },
  TotalAmount: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  UserID: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Orders
