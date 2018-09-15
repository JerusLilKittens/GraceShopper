import React from 'react'
import {Item} from 'semantic-ui-react'

const CartProductCard = props => {
  const {item} = props
  return (
    <Item>
      <Item.Image src={item.imageUrl} />
      <Item.Content>
        <Item.Header>{item.name}</Item.Header>
        <Item.Meta>Item Price: {item.price}</Item.Meta>
        <Item.Description>Quantity: {item.cartItem.quantity}</Item.Description>
      </Item.Content>
    </Item>
  )
}

export default CartProductCard
