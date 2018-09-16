import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Icon, Image, Item, Label, Header, Container} from 'semantic-ui-react'
import {getUserCart} from '../store/cart'
import CartProductCard from './CartProductCard'

class Cart extends Component {
  async componentDidMount() {
    console.log('mounted')
    await this.props.getUserCart()
  }

  render() {
    const cart = this.props.cart
    return (
      <Container>
        <Header as="h1">Your Cart</Header>
        <Item.Group divided>
          {cart.items.length ? (
            cart.items.map(item => {
              return <CartProductCard key={item.id} item={item} />
            })) : (
                    <h1>Your cart is empty</h1>
                  )}
        </Item.Group>
        <Item.Group>
          <Item>
            <Item.Content>
              <Header as="h2">Subtotal: ${cart.subtotal}</Header>
              <Item.Extra>
                <Button color="teal" icon labelPosition="left" floated="right"><Icon name="dollar"/>Check Out</Button>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
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
  return {
    getUserCart: userId => dispatch(getUserCart(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
