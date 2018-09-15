import axios from 'axios'

const GOT_USER_CART = 'GOT_USER_CART'

const gotUserCart = cart => ({
  type: GOT_USER_CART,
  items: cart.items,
  subtotal: cart.subtotal
})

export const getUserCart = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/carts/${userId}`)
      const items = data[0].products
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

export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_USER_CART:
      return {items: [...action.items], subtotal: action.subtotal}
    default:
      return state
  }
}
