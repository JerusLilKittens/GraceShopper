import axios from 'axios'

// const GET_PRODUCTS = 'GET_PRODUCTS'
const GOT_PRODUCTS = 'GOT_PRODUCTS'

const gotProducts = products => ({type: GOT_PRODUCTS, products})

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

const productReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productReducer
