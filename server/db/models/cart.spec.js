const {expect} = require('chai')
const {db} = require('../index')
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
          sessionId: 1
        })
      
      })

      it('returns true if returns captures session id', () => {
        expect(cart.sessionId).to.deep.equal(1)
      })

      
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User mod
