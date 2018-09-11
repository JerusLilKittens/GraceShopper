const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 5,
      min: 1
    }
  },
  text: {
    type: Sequelize.TEXT,
    allowNull: true,
    validate: {checkLength(val){
        if(val.length < 10 ){
          throw new Error('Please write a discription')
        }
    }}
  }
})

module.exports = Review
