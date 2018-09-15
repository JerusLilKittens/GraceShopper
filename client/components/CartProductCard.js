import React from 'react'
import { Item, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { removeFromCart } from '../store/cart'

const CartProductCard = props => {
  const {dummy} = props
  const handleClick = async item => {
    // item.cartId = 1
    item.productId = item.id
    console.log('item', item)
    await props.removeFromCart(item)
  }
  return (
    <Item>
      <Item.Image src={dummy.imageUrl} />
      <Item.Content>
        <Item.Header>{dummy.name}</Item.Header>
        <Item.Meta>Price: ${dummy.price}</Item.Meta>
        <Item.Description>Quantity: {dummy.cartItem.quantity}</Item.Description>
        <Item.Extra>
          <Button color='purple' floated='right' onClick={() => handleClick(dummy)}>Remove</Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    removeFromCart: item => dispatch(removeFromCart(item))
  }
}

export default connect(null, mapDispatchToProps)(CartProductCard)
