import React from 'react'
import { Item, Button } from 'semantic-ui-react'

const CartProductCard = props => {
  const {dummy} = props
  return (
    <Item>
      <Item.Image src={dummy.imageUrl} />
      <Item.Content>
        <Item.Header>{dummy.name}</Item.Header>
        <Item.Meta>Price: ${dummy.price}</Item.Meta>
        <Item.Description>Quantity: {dummy.cartItem.quantity}</Item.Description>
        <Item.Extra>
          <Button color='purple' floated='right'>Remove</Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default CartProductCard
