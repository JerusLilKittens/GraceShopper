/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const {db} = require('../db')
const app = require('../index')
const Review = db.model('review')

describe('Review routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  // describe('/api/reviews/', () => {
  //   const codysEmail = 'cody@puppybook.com'

  //   beforeEach(() => {
  //     return Review.create({
  //       email: codysEmail
  //     })
  //   })

  //   it('GET /api/reviews', async () => {
  //     const res = await request(app)
  //       .get('/api/reviews')
  //       .expect(200)

  //     expect(res.body).to.be.an('array')
  //     expect(res.body[0].email).to.be.equal(codysEmail)
  //   })
  // }) // end describe('/api/reviews')
}) // end describe('Review routes')
