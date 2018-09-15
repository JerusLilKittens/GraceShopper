import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Icon, Image, Item, Label, Header} from 'semantic-ui-react'

import {getUserCart} from '../store/cart'
import CartProductCard from './CartProductCard'

class Cart extends Component {
  componentDidMount() {
    if (this.props.user.id) {
      this.props.getUserCart(this.props.user.id)
    }
  }

  render() {
    const cart = this.props.cart
    return (
      <div>
        <Header as="h1">Your Cart</Header>
        <Item.Group divided>
          {cart ? (
            cart.map(item => {
              return <CartProductCard key={item.id} item={item} />
            })
          ) : (
            <h1>no items in cart</h1>
          )}
        </Item.Group>
        <Header as="h2">Subtotal: $X.XX</Header>
        <Button>Check Out</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserCart: userId => dispatch(getUserCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
