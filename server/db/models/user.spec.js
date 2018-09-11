/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

xdescribe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          firstName: 'Cody',
          lastName: 'Strings',
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })
      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
      describe('Validations', () => {
        it('requires first and last name', async () => {
          const stan = User.build()

          try {
            await stan.validate()
            throw Error(
              'validation was successful but should have failed without `name`'
            )
          } catch (err) {
            expect(err.message).to.contain(
              'notNull Violation: user.firstName cannot be null,\nnotNull Violation: user.lastName cannot be null,\nnotNull Violation: user.email cannot be null'
            )
          }
        })

        it('requires first name to not be an empty string', async () => {
          const stan = User.build({
            firstName: ''
          })

          try {
            await stan.validate()
            throw Error(
              'validation was successful but should have failed if name is an empty string'
            )
          } catch (err) {
            expect(err.message).to.contain('Validation error')
            /* handle error */
          }
        })
        it('requires last name to not be an empty string', async () => {
          const stan = User.build({
            lastName: ''
          })

          try {
            await stan.validate()
            throw Error(
              'validation was successful but should have failed if name is an empty string'
            )
          } catch (err) {
            expect(err.message).to.contain('Validation error')
            /* handle error */
          }
        })
        it('requires last email to not be an empty string', async () => {
          const stan = User.build({
            email: ''
          })

          try {
            await stan.validate()
            throw Error(
              'validation was successful but should have failed if name is an empty string'
            )
          } catch (err) {
            expect(err.message).to.contain('Validation error')
            /* handle error */
          }
        })
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
