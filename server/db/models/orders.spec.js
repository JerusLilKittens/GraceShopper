const {expect} = require('chai')
const db = require('../index')
const Orders = db.model('orders')
require("babel/polyfill")

describe('Orders model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })



  let order;

  beforeEach(() => {
    order = Orders.build({
      products: [1, 2],
      billingInfo: '1 Hacker Way',
      shippingInfo: '1 Infinite Loop',
      totalAmount: 34.95,
      userId: 1
    });
  });

  describe('order definition', () => {

    it('includes `products` and `billingInfo` fields', async () => {
      const savedOrder = await order.save();
      expect(savedOrder.products).to.equal([1, 2]);
      expect(savedOrder.billingInfo).to.equal('1 Hacker Way');
      expect(savedOrder.shippingInfo).to.equal('1 Infinite Loop');
      expect(savedOrder.totalAmount).to.equal(34.95);
      expect(savedOrder.userId).to.equal(1);
    });

    it('requires `products`, `billingInfo`, `shippingInfo`, `totalAmount` and userId`', async () => {

      order.products = null;
      order.billingInfo = null;
      order.shippingInfo = null;
      order.totalAmount = null;
      order.userId = null;

      let result, error;
      try {
        result = await order.validate();
      } catch (err) {
        error = err;
      }

      if (result) throw Error('validation should fail when order is null');

      expect(error).to.be.an.instanceOf(Error);

    });


    it('requires `products`, `billingInfo`, `shippingInfo`, `totalAmount` and userId`', async () => {

      order.products = "this is a string";
      order.billingInfo = 4.4;
      order.shippingInfo = 3;
      order.totalAmount = [1, "hello world"];
      order.userId = "string asnf";

      let result, error;
      try {
        result = await order.validate();
      } catch (err) {
        error = err;
      }

      if (result) throw Error('validation should fail when data types are not correct');

      expect(error).to.be.an.instanceOf(Error);

    });


  // describe('instanceMethods', () => {
  //   describe('correctPassword', () => {
  //     let cody

  //     beforeEach(async () => {
  //       cody = await User.create({
  //         email: 'cody@puppybook.com',
  //         password: 'bones'
  //       })
  //     })

  //     it('returns true if the password is correct', () => {
  //       expect(cody.correctPassword('bones')).to.be.equal(true)
  //     })

  //     it('returns false if the password is incorrect', () => {
  //       expect(cody.correctPassword('bonez')).to.be.equal(false)
  //     })





    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
   // end describe('User model')
