/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getProducts, getProduct} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {products: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getProducts', () => {
    it('eventually dispatches the GET_PRODUCTS action', async () => {
      const fakeProduct = {
        name: 'Laser Pointer',
        description:
          "Every cat's favorite toy! This laser pointer will entertain your cat for hours.",
        price: 8.75
      }
      mockAxios.onGet('/products').replyOnce(200, fakeProduct)
      await store.dispatch(getProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })

  describe('getProduct', () => {
    it('logout: eventually dispatches the GET_PRODUCT action', async productId => {
      mockAxios.onGet(`/product/${productId}`).replyOnce(204)
      await store.dispatch(getProduct(productId))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCT')
      expect(history.location.pathname).to.be.equal(`/products/${productId}`)
    })
  })
})
