const db = require('../db')
const Sequelize = require('sequelize')

const ProdCat = db.define('prod_cat', {
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = ProdCat
