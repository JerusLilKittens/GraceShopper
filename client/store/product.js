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

export const getProduct = productId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(gotProduct(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateProduct = (id, formData) => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/products/', {id, formData})
    } catch (err) {
      console.error(err)
    }
    //set to return update on product
    // dispatch(gotProduct(data))
  }
}

export const createProduct = formData => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', formData)
      // sending back the single product created to be displayed
      //TODO: need to create a gotProduct actions
      //dispatch(gotProduct(data))
      console.log(data)
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
