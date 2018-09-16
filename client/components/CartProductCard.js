import React from 'react'
import { Item, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { removeFromCart } from '../store/cart'

const CartProductCard = props => {
  const {item} = props
  const handleClick = async item => {
    await props.removeFromCart(item)
  }

  return (
    <Item>
      <Item.Image src={item.imageUrl} />
      <Item.Content>
        <Item.Header>{item.name}</Item.Header>
        <Item.Meta>Price: ${item.price}</Item.Meta>
        <Item.Description>Quantity: {item.cartItem ? item.cartItem.quantity : 1}</Item.Description>
        <Item.Extra>
          <Button color='purple' floated='right' onClick={() => handleClick(item)}>Remove</Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: item => dispatch(removeFromCart(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartProductCard)
