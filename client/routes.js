import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  SignupForm,
  UserHome,
  Cart,
  Checkout,
  SingleProduct,
  AdminDashboard,
  SingleOrder,
  UserOrder,
  NotAllowed,
  WrongPage
} from './components'
import {me} from './store'
import ProductList from './components/ProductList'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        <Route exact path="/" component={ProductList} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route exact path="/products" component={ProductList} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignupForm} />
        {isAdmin ? (
          <Route path="/admin-dashboard" component={AdminDashboard} />
        ) : (
          <Route path="/admin-dashboard" component={NotAllowed} />
        )}

        <Route path="/admin-orders/orders/:orderId" component={SingleOrder} />
        <Route path="/user-orders/:userId" component={UserOrder} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
        <Route path="*" component={WrongPage} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
