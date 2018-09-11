const {expect} = require('chai')
const db = require('../index')
const Cart = db.model('cart')

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cart, emptyCart

      beforeEach(async () => {
        cart = await Cart.create({
          product: {1: 2}
        })
        emptyCart = await Cart.create({
          product: {}
        })
      })

      it('returns true if returns object', () => {
        expect(cart.product).to.deep.equal({'1': 2})
      })

      it('can be empty', () => {
        expect(emptyCart.product).to.deep.equal({})
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User mod
