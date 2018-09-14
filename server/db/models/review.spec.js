/* global describe beforeEach it */

const {expect} = require('chai')
const {db} = require('../index')
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
      expect(review.rating).to.equal(4)
      expect(review.text).to.equal('This is a great product!')
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
      expect(review.rating).to.equal(4)
      expect(review.text).to.equal(null)
    })
  })

  describe('Text of the review must be at least 10 characters or longer if leaving a review',  () => {

    it('Review must have at least 10 characters', async () => {

    let review = Review.build({
      text: 'not 10'
    })

    try {
      await review.validate()
      throw Error(
        'Validation was successful, should have failed if text was shorter then 10 characters'
      )
    } catch (err) {
      expect(err.message).to.contain('Validation error')
    }
  })
  }) // end describe('create rating no text')
}) // end describe('Review model')
