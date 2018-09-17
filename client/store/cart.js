import axios from 'axios'
import {mergeCarts} from '../utilities/cartMerge'

const GOT_USER_CART = 'GOT_USER_CART'
const ADDED_TO_CART = 'ADDED_TO_CART'
const REMOVED_FROM_CART = 'REMOVED_FROM_CART'

const gotUserCart = cart => ({
  type: GOT_USER_CART,
  items: cart.items,
  subtotal: cart.subtotal
})
const addedToCart = (item, data) => ({type: ADDED_TO_CART, item, data})
const removedFromCart = (item, data) => ({type: REMOVED_FROM_CART, item, data})

export const getUserCart = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/carts')
      console.log(data, "+++++++++ back from api data")
      const cart = data.cart ? data.cart : []
      const cart2 = data.cart2 ? data.cart2 : []
      
      const mergedCart = mergeCarts(cart.products, cart2.products)
      

      const items = mergedCart// data ? data.products : []
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
// not working
// export const getUserCart = () => {
//   return async dispatch => {
//     try {
//       const {data} = await axios.get('/api/carts')
//       let subtotal = 0
//       console.log(data ,"back from api data")

//       const mergedCart = mergeCarts(data.cart.products, data.cart2.products = [])

//       console.log(mergedCart)

//       const items = data ? mergedCart : []
//       items.forEach(item => {
//         subtotal += item.cartItem.quantity * item.price
//       })
//       const userCart = {
//         items,
//         subtotal
//       }

//       dispatch(gotUserCart(userCart))
//     } catch (err) {
//       console.error(err)
//     }
//   }
// }

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

export const removeFromCart = item => {
  return async dispatch => {
    try {
      const {cartId, productId} = item.cartItem
      const {data} = await axios.delete('/api/cartItems', {
        data: {cartId, productId}
      })
      dispatch(removedFromCart(item, data))
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
    default:
      return state
  }
}
