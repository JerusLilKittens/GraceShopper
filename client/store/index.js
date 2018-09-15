import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {productsReducer, productReducer} from './product'
// import { reviewReducer } from './review'
import { reducer as formReducer } from 'redux-form'

const reducer = combineReducers({
  user,
  products: productsReducer,
  selectedProduct: productReducer,
  // review: reviewReducer,
  form: formReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
