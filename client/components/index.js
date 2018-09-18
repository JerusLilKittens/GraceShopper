/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as Checkout} from './Checkout'
export {default as Cart} from './Cart'
export {default as SingleProduct} from './SingleProduct'
export {default as ProductList} from './SingleProduct'
export {default as AdminDashboard} from './AdminDashboard'
export {default as SingleOrder} from './Admin-SingleOrder'
export {default as UserOrder} from './User-Order'
export {default as NotAllowed} from './NotAllowed'
export {default as SignupForm} from './SignupForm'
export {default as WrongPage} from './WrongPage'
export {default as Search} from './Search'
