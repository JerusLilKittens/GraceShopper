import axios from 'axios'

const GOT_USER_CART = 'GOT_USER_CART'

const gotUserCart = cart => ({
  type: GOT_USER_CART,
  cart
})

export const getUserCart = userId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/carts/${userId}`)
      const userCart = data[0].products
      dispatch(gotUserCart(userCart))
    } catch (err) {
      console.error(err)
    }
  }
}

export const cartReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_USER_CART:
      return action.cart
    default:
      return state
  }
}
