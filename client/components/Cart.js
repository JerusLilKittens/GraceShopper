import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Icon, Image, Item, Label, Header, Container} from 'semantic-ui-react'
import { getCartItems } from '../store/cart'
import CartProductCard from './CartProductCard'

const dummy = {
  id: 1,
  name: 'Laser Pointer',
  description: `Every cat's favorite toy! This laser pointer will entertain your cat for hours.`,
  imageUrl: '/default_product.png',
  price: 8.75,
  stock: 5,
  cartItem: {
    quantity: 2
  }
}

class Cart extends Component {
  componentDidMount() {
    const cartId = Number(this.props.match.params.cartId)
    this.props.getCartItems(cartId)
  }

  render() {
    const items = this.props.items
    return (
      <Container>
        <Header as="h1">Your Cart</Header>
        <Item.Group divided>
          <CartProductCard dummy={dummy} />
          <CartProductCard dummy={dummy} />
          {items ? (
                    items.map(item => (
                      <CartProductCard item={item} key={item.id} />
                    ))
                  ) : (
                    <h1>Your cart is empty</h1>
                  )}
        </Item.Group>
        <Item.Group>
          <Item>
            <Item.Content>
              <Header as="h2">
                Subtotal: ${dummy.cartItem.quantity * dummy.price}
              </Header>
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
    items: state.cartItems
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartItems: cartId => dispatch(getCartItems(cartId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
