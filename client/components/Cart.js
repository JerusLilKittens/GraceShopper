import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Button, Icon, Image, Item, Label, Header} from 'semantic-ui-react'

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
  componentDidMount() {}

  render() {
    return (
      <div>
        <Header as="h1">Your Cart</Header>
        <Item.Group divided>
          <CartProductCard dummy={dummy} />
          <CartProductCard dummy={dummy} />
          <CartProductCard dummy={dummy} />
        </Item.Group>
        <Header as="h2">
          Subtotal: ${dummy.cartItem.quantity * dummy.price}
        </Header>
        <Button>Check Out</Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
