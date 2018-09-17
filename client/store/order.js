import axios from 'axios'

const GOT_ORDERS = 'GOT_ORDERS'
const GOT_ORDER = 'GOT_ORDER'
const UPDATED_ORDER = 'UPDATED_ORDER'
const ADDED_ORDER = 'ADDED_ORDER'

const gotOrders = orders => ({type: GOT_ORDERS, orders})
const gotOrder = order => ({type: GOT_ORDER, order})
const updatedOrderStatus = order =>({type: UPDATED_ORDER, order})
const addedOrder = order => ({ type: ADDED_ORDER, order})


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
      dispatch(gotOrder(data))
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateOrderStatus = (orderId, newStatus) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/orders/`, {orderId, newStatus})
      dispatch(updatedOrderStatus(data))
    } catch (err) {
      console.error(err)
    }
    }
  }

  export const addOrder = order => {
    return async dispatch => {
      try {
        const {data} = await axios.post('/api/orders/', order)
        dispatch(addedOrder(data))
      } catch (err) {
        console.error(err)
      }
    }
  }

export const ordersReducer = (state=[], action) => {
  switch(action.type) {
    case GOT_ORDERS:
      return action.orders
    case ADDED_ORDER:
      return [...state, action.order]
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



