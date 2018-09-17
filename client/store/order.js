import axios from 'axios'

const GOT_ORDERS = 'GOT_ORDERS'
const GOT_ORDER = 'GOT_ORDER'
const UPDATED_ORDER = 'UPDATED_ORDER'

const gotOrders = orders => ({type: GOT_ORDERS, orders})
const gotOrder = order => ({type: GOT_ORDER, order})
const updatedOrderStatus = order =>({type: UPDATED_ORDER, order})


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

export const getOrdersByUser = (userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/users/${userId}`)
      console.log("got data", data)
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
      dispatch(gotOrder(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateOrderStatus = (orderId, newStatus) => {
  console.log('got here')
  console.log(orderId, newStatus)
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/${orderId}`, {newStatus})
      dispatch(updatedOrderStatus(data))
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
    case UPDATED_ORDER:
      return action.order
    default:
      return state
  }
}



