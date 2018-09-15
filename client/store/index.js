import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import {productsReducer, productReducer} from './product'
<<<<<<< HEAD
// import { reviewReducer } from './review'
import { reducer as formReducer } from 'redux-form'
=======
import { ordersReducer, orderReducer } from './order'
import {categoriesReducer, selectedCategory} from './category'
import {reviewReducer} from './review'


>>>>>>> 3921d4b9524724e6cb5b51db33fbba1b6a9a755f

const reducer = combineReducers({
  user,
  products: productsReducer,
  selectedProduct: productReducer,
<<<<<<< HEAD
  // review: reviewReducer,
  form: formReducer
=======
  categories: categoriesReducer,
  selectedCategory,
  review: reviewReducer,
  orders: ordersReducer,
  order: orderReducer
>>>>>>> 3921d4b9524724e6cb5b51db33fbba1b6a9a755f
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
