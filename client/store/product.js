import axios from 'axios'

// const GET_PRODUCTS = 'GET_PRODUCTS'
const GOT_PRODUCTS = 'GOT_PROUCTS'

const initialState = {
  products: [],
  selectedProduct: {}
}

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

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PRODUCTS:
      return {...state, products: action.products}
    default:
      return state
  }
}

export default productReducer
