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

    beforeEach(() => {
      category = Category.build({
        name: 'Cat Toys'
      })
    })

    it('creates a category with name', async () => {
      const savedCategory = await category.save()
      expect(savedCategory.name).to.equal('Cat Toys')
    })

    it('doesnt create a category without a name', async () => {
      category.name = ''
      let result, error;
      try {
        result = await category.validate();
      } catch (err) {
        error = err;
      }

      if (result) throw Error('validation should fail when name is empty');

      expect(error).to.be.an.instanceOf(Error);
      expect(error.message).to.contain('Validation error');    })
  }) // end describe('create category')
}) // end describe('Category model')
