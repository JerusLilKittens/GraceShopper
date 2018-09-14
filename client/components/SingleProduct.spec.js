/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { SingleProduct } from './SingleProduct'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('SingleProduct view', () => {
  let singleProduct

  beforeEach(() => {
    singleProduct = shallow(<SingleProduct name="Cat Scratcher" description="A nice cardboard scratcher for your cat to keep her claws sharp." price="4.50" />)
  })

  it('renders a single product with all information', () => {
    expect(singleProduct.find('header').text()).to.be.equal('Cat Scratcher')
    expect(singleProduct.find('h3').text()).to.be.equal('A nice cardboard scratcher for your cat to keep her claws sharp.')
    expect(singleProduct.find('h3').text()).to.be.equal('4.50')
  })
})
