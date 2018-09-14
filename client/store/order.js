import axios from 'axios'

const GOT_ORDERS = 'GOT_ORDERS'

const gotOrders = orders => ({type: GOT_ORDERS, orders})

export const getOrders = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/orders')
      dispatch(gotOrders(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const ordersReducer = (state=[], action) => {
  switch(action.type) {
    case GOT_ORDERS:
      return action.orders
    default:
      return state
  }
}



