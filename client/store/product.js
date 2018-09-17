import axios from 'axios'
import { ADDED_REVIEW } from './review'

const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_PRODUCT = 'GOT_PRODUCT'
const GOT_PRODUCTS_BY_CATEGORY = 'GOT_PRODUCTS_BY_CATEGORY'

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

export const getProductsByCategory = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/categories/${id}`)
      dispatch(gotProducts(data[0].products))
    } catch (err) {
      console.error(err)
    }
  }
}

export const getProduct = productId => {
  return async dispatch => {
    try {
      console.log(productId, "++++++ productId from store *******")
      const {data} = await axios.get(`/api/products/${productId}`)
      dispatch(gotProduct(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const deleteCategoryFromProduct = (catName, productId) =>{
  const optionInfo = {data:{catName,productId}}
  return async dispatch =>{
    try{
     const {data} = await axios.delete('/api/products', optionInfo )
     dispatch(getProduct(productId))
    } catch(err){
      console.error(err)
    }
  }
}

export const editProduct = (id, formData) => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/products/', {id, formData})
      dispatch(gotProduct(data))
    } catch (err) {
      console.error(err)
    }

  }
}

export const createProduct = formData => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/products', formData)
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
    case GOT_PRODUCTS_BY_CATEGORY:
      return action.products
    default:
      return state
  }
}

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_PRODUCT:
      return action.product
    case ADDED_REVIEW:
      return {...state, reviews: [...state.reviews, action.review]}
    default:
      return state
  }
}
