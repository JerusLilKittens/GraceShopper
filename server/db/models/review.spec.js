/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Review = db.model('review')

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Create a review', () => {
    let review

    beforeEach(async () => {
      review = await Review.create({
        rating: 4,
        text: 'This is a great product!'
      })
    })

    it('Creates a review with rating and text', () => {
      expect(review.rating(4)).to.be.equal(true)
      expect(review.text('This is a great product!')).to.be.equal(true)
    })
  }) // end describe('create rating')

  describe('Create a review with no text', () => {
    let review

    beforeEach(async () => {
      review = await Review.create({
        rating: 4
      })
    })

    it('Creates a review with rating and no text', () => {
      expect(review.rating(4)).to.be.equal(true)
      expect(review.text(null)).to.be.equal(true)
    })
  }) // end describe('create rating no text')
}) // end describe('Review model')
