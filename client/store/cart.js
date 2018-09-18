import axios from 'axios'
import {mergeCarts} from '../utilities/cartMerge'

const GOT_USER_CART = 'GOT_USER_CART'
const ADDED_TO_CART = 'ADDED_TO_CART'
const REMOVED_FROM_CART = 'REMOVED_FROM_CART'
const INCREMENTED_ITEM = 'INCREMENT_ITEM'

const gotUserCart = cart => ({
  type: GOT_USER_CART,
  items: cart.items,
  subtotal: cart.subtotal
})
const addedToCart = (item, data) => ({type: ADDED_TO_CART, item, data})
const removedFromCart = (item, data) => ({type: REMOVED_FROM_CART, item, data})
const incrementedItem = (item, data) => ({type: INCREMENTED_ITEM, item, data})

export const getUserCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/carts')
      const items = data ? data.products : []
      let subtotal = 0
      items.forEach(item => {
        subtotal += item.cartItem.quantity * item.price
      })
      const userCart = {
        items,
        subtotal
      }
      dispatch(gotUserCart(userCart))
    } catch (err) {
      console.error(err)
    }
  }
}

export const addToCart = item => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/cartItems', item)
      dispatch(addedToCart(item, data))
      dispatch(getUserCart())
    } catch (err) {
      console.error(err)
    }
  }
}

export const incrementItem = (item, inc) => {
  return async dispatch => {
    try {
      if (item.cartItem.quantity === 1 && !inc) {
        const {cartId, productId} = item.cartItem
        const {data} = await axios.delete('/api/cartItems', {
          data: {cartId, productId}
        })
        dispatch(removedFromCart(item, data))
        dispatch(getUserCart())
      } else {
        const {cartId, productId} = item.cartItem
        const {data} = await axios.put(
          `/api/cartItems/${cartId}/${productId}`,
          {
            item,
            inc
          }
        )
        dispatch(incrementedItem(item, data))
        dispatch(getUserCart())
      }
    } catch (err) {
      console.error(err)
    }
  }
}

export const removeFromCart = item => {
  return async dispatch => {
    try {
      const {cartId, productId} = item.cartItem
      const {data} = await axios.delete('/api/cartItems', {
        data: {cartId, productId}
      })
      dispatch(removedFromCart(item, data))
      dispatch(getUserCart())
    } catch (err) {
      console.error(err)
    }
  }
}

export const cartReducer = (state = {items: []}, action) => {
  switch (action.type) {
    case GOT_USER_CART:
      return {items: [...action.items], subtotal: action.subtotal}
    case ADDED_TO_CART:
      return {...state, items: [...state.items, action.item]}
    case REMOVED_FROM_CART:
      return {
        ...state,
        items: [...state.items.filter(item => item.id !== action.item.id)]
      }
    case INCREMENTED_ITEM:
      return {
        ...state,
        items: [
          ...state.items.map(item => {
            if (item.id === action.item.id) {
              return {...item, quantity: action.data.quantity}
            } else return {...item}
          })
        ]
      }
    default:
      return state
  }
}
