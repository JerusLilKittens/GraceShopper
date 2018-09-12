const {expect} = require('chai')
const {db} = require('../index')
const CartItem = db.model('cartItem')
const Cart = db.model('cart')
const Product = db.model('product')

describe('CartItem model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('create cartItem', () => {
    let cartItem
    beforeEach(async () => {
      let cart = await Cart.create({
        sessionId: 1
      })
      let product = await Product.create({
        name: 'Cat thing',
        description: 'This cat thing does cat things for cats',
        price: 12.45
      })
      cartItem = CartItem.build({
        quantity: 3,
        cartItemProductId: 1,
        cartItemCartId: 1
      })
    })

    it('allows quantity to be saved', async () => {
      const savedQuantity = await cartItem.save()
      expect(savedQuantity.quantity).to.equal(3)
    })
  })
})
