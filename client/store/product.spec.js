// Assertions
const chai = require('chai')
const expect = chai.expect
const chaiThings = require('chai-things')
chai.use(chaiThings)

// Campus Model
const db = require('../server/models')
const Campus = db.model('campus')

// Campus Routes
const app = require('../server/app')
const agent = require('supertest')(app)

// CampusList component
import {shallow} from 'enzyme'
import React from 'react'
import CampusList from '../client/components/CampusList'

// Redux
import {SET_CAMPUSES} from '../client/redux/constants'
import {setCampuses} from '../client/redux/actions'
import reducer from '../client/redux/reducer'

describe('`setCampuses` action creator', () => {
  const setCampusesAction = setCampuses(campuses)

  it('returns a Plain Old JavaScript Object', () => {
    expect(typeof setCampusesAction).to.equal('object')
    expect(Object.getPrototypeOf(setCampusesAction)).to.equal(Object.prototype)
  })

  it('creates an object with `type` and `campuses`', () => {
    expect(setCampusesAction.type).to.equal(SET_CAMPUSES)
    expect(Array.isArray(setCampusesAction.campuses)).to.be.true
    expect(setCampusesAction.campuses[2].name).to.equal('Pluto')
  })
})

// defined in ../client/redux/reducer.js
describe('reducer', () => {
  const initialState = {
    campuses: [],
    selectedCampus: {},
    students: []
  }

  const newState = reducer(initialState, {
    type: SET_CAMPUSES,
    campuses: campuses
  })

  it('returns a new state with the updated campuses', () => {
    // this should have changed:
    expect(newState.campuses).to.deep.equal(campuses)
    // this should not have changed:
    expect(newState.selectedCampus).to.equal(initialState.selectedCampus)
    expect(newState.students).to.equal(initialState.students)
  })

  it('does not modify the previous state', () => {
    expect(initialState).to.deep.equal({
      campuses: [],
      selectedCampus: {},
      students: []
    })
  })
})
