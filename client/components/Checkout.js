import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  Button,
  Icon,
  Image,
  Item,
  Label,
  Header,
  Container,
  Step,
  Form,
  Card
} from 'semantic-ui-react'
import {Link, Switch, Route} from 'react-router-dom'
import ShippingForm from './ShippingForm'
import Billing from './BillingInfo'
import CompletedOrder from './CompletedOrder'
import {addOrder} from '../store/order'

class Checkout extends Component {
  render() {
    const cart = this.props.cart
    const subtotal = cart.subtotal
    const tax = Math.floor(subtotal * 0.06)
    const total = subtotal + tax + 399
    return (
      <Container>
        <Header>Complete Your Order</Header>
        <Card>
          <Card.Content header="Order Summary" />
          <Card.Content description={`Subtotal: $${subtotal / 100}`} />
          <Card.Content description="Shipping: $3.99" />
          <Card.Content description={`Tax: $${tax / 100} `} />
          <Card.Content description={`Total: $${total / 100}`} />
          <Card.Content extra>
            <Icon name="user" />
            4 Friends
          </Card.Content>
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

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
