const {expect} = require('chai')
const {db} = require('../index')
const LineItem = db.model('lineItem')
const Order = db.model('order')
const Product = db.model('product')

describe('LineItem model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('create lineItem', () => {
    let lineItem
    beforeEach(async () => {
      let order = await Order.create({
        billingInfo: "Billing Info",
        shippingInfo: "Shipping info",
        totalAmount: 10.10
      })
      let product = await Product.create({
        name: 'Cat thing',
        description: 'This cat thing does cat things for cats',
        price: 12.45
      })
      lineItem = LineItem.build({
        quantity: 3,
        price: 12.30,
        lineItemProductId: 1,
        lineItemOrderId: 1
      })
    })

    it('allows quantity to be saved', async () => {
      const savedQuantity = await lineItem.save()
      expect(savedQuantity.quantity).to.equal(3)
    })
  })
})
