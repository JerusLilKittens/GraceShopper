/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const {db} = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    const fullText =
    'The South African cliff swallow (Petrochelidon spilodera), also known as the South African swallow, is a species of bird in the Hirundinidae family.'

    beforeEach(() => {
      return Product.create({
        name: 'Catnip',
        description: fullText,
        price: 42.13,
        stock: 3
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('Catnip')
    })
  }) // end describe('/api/products')
}) // end describe('Product routes')
