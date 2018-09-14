import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {productsReducer, productReducer} from './product'
import { reviewReducer } from './review';
import { ordersReducer, orderReducer } from './order'


const reducer = combineReducers({
  user,
  products: productsReducer,
  selectedProduct: productReducer,
  review: reviewReducer,
  orders: ordersReducer,
  order: orderReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
