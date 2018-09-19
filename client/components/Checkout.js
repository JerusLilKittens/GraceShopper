import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Header,
  Container,
  Card,
  Message
} from 'semantic-ui-react'
import {Switch, Route} from 'react-router-dom'
import ShippingForm from './ShippingForm'
import Billing from './BillingInfo'
import CompletedOrder from './CompletedOrder'

class Checkout extends Component {
  render() {
    const cart = this.props.cart
    const subtotal = cart.subtotal
    const tax = Math.floor(subtotal * 0.06)
    const total = subtotal + tax + 399
    return (
      <Container>
        <Message info>
        <Header >Complete Your Order</Header>

        </Message>
        <Card float='right'>
          <Card.Content header="Order Summary" />
          <Card.Content description={`Subtotal: $${subtotal / 100}`} />
          <Card.Content description="Shipping: $3.99" />
          <Card.Content description={`Tax: $${tax / 100} `} />
          <Card.Content description={`Total: $${total / 100}`} />
        </Card>

        <Switch>
          <Route path="/checkout/billing" component={Billing} />
          <Route path="/checkout/thankyou" component={CompletedOrder} />
          <Route exact path="/checkout" component={ShippingForm} />
        </Switch>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    isLoggedIn: !!state.user.id,
    cart: state.cart
  }
}

export default connect(mapStateToProps)(Checkout)
