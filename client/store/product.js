import axios from 'axios'

// const GET_PRODUCTS = 'GET_PRODUCTS'
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_PRODUCT = 'GOT_PRODUCT'

const gotProducts = products => ({type: GOT_PRODUCTS, products})
const gotProduct = product => ({type: GOT_PRODUCT, product})

export const getProducts = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/products')
      dispatch(gotProducts(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getProduct = product => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${product.id}`)
      dispatch(gotProduct(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_PRODUCT:
      return action.product
    default:
      return state
  }
}
