import axios from 'axios'

const GOT_ORDERS = 'GOT_ORDERS'
const GOT_ORDER = 'GOT_ORDER'

const gotOrders = orders => ({type: GOT_ORDERS, orders})
const gotOrder = order => ({type: GOT_ORDER, order})

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

export const getOrder = orderId => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${orderId}`)
      console.log('data gotten', data)
      dispatch(gotOrder(data))
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

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case GOT_ORDER:
      return action.order
    default:
      return state
  }
}



