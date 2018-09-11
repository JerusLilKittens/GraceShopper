/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Category = db.model('category')

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('create Category', () => {
    let category
    let badCategory

    beforeEach(async () => {
      category = await Category.create({
        name: 'Cat Toys'
      })
      badCategory = await Category.create({
        name: ''
      })
    })

    it('creates a category with name', () => {
      expect(category.name('Cat Toys')).to.be.equal(true)
    })

    it('doesnt create a category without a name', () => {
      expect(badCategory.to.not.exist)
    })
  }) // end describe('create category')
}) // end describe('Category model')
