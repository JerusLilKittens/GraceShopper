const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validation: {
      isEmpty: false
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validation: {
      isEmpty: false
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Cat-512.png',
    allowNull: false,
    validation: {
      isEmpty: false
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
})

module.exports = Product
