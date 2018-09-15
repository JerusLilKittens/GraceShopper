import axios from 'axios'

const GOT_ITEMS = 'GOT_TEMS'
const ADDED_TO_CART = 'ADDED_TO_CART'
const REMOVED_FROM_CART = 'REMOVED_FROM_CART'

const gotCartItems = items => ({ type: GOT_ITEMS, items })
const addedToCart = item => ({ type: ADDED_TO_CART, item })
const removedFromCart = item => ({ type: REMOVED_FROM_CART, item})

export const getCartItems = cartId => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/cartItems/${cartId}`)
      dispatch(gotCartItems(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addToCart = item => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/cartItems', item)
      dispatch(addedToCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeFromCart = item => {
  return async dispatch => {
    try {
      const { data } = await axios.delete(`/api/cartItems/`, item)
      dispatch(removedFromCart(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_ITEMS:
      return action.items
    case ADDED_TO_CART:
      return
    case REMOVED_FROM_CART:
      return
    default:
      return state
  }
}
