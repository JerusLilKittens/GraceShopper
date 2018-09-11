const {expect} = require('chai')
const db = require('../index')
const Orders = db.model('orders')

describe('Orders model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let order
  let productObject = {
    1: {
      name: 'Laser Pointer',
      description:
        "Every cat's favorite toy! This laser pointer will entertain your cat for hours.",
      price: 8.75
    },
    2: {
      name: 'Flower Drinking Fountain',
      description:
        'A drinking fountain in the shape of a flower so your cat can drink fresh water in style.',
      price: 28.9
    }
  }

  beforeEach(() => {
    order = Orders.build({
      products: productObject,
      billingInfo: '1 Hacker Way',
      shippingInfo: '1 Infinite Loop',
      totalAmount: 34.95,
      userId: 1
    })
   })

  describe('order definition', () => {
    it('includes `products` and `billingInfo` fields', async () => {
      const savedOrder = await order.save()

      expect(savedOrder.billingInfo).to.equal('1 Hacker Way')
      expect(savedOrder.shippingInfo).to.equal('1 Infinite Loop')
      expect(savedOrder.totalAmount).to.equal('34.95')
      expect(savedOrder.userId).to.equal(1)
    })

    it('requires `products`, `billingInfo`, `shippingInfo`, `totalAmount` and userId`', async () => {
      order.products = null
      order.billingInfo = null
      order.shippingInfo = null
      order.totalAmount = null
      order.userId = null

      let result, error
      try {
        result = await order.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when order is null')

      expect(error).to.be.an.instanceOf(Error)
    })

    // it('requires `products`, `billingInfo`, `shippingInfo`, `totalAmount` and userId` to be right data types', async () => {
    //   const order2 = Orders.build()

    //   order2.products = 'this is a string'
    //   order2.billingInfo = 4.4
    //   order2.shippingInfo = 333
    //   order2.totalAmount = [1, 'hello world']
    //   order2.userId = 'string asnf'

    //   let result, error
      // try {
      //   result = await order2.validate()
      //   throw Error('validation was successful when should not have been')
      // } catch (err) {}

     // let isUndefined = result === undefined

     // expect(isUndefined).to.equal.false
    })
  }) // end describe('correctPassword')
//}) // end describe('instanceMethods')
// end describe('User model')
