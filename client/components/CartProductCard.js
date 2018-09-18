import React from 'react'
import {Item, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeFromCart, incrementItem} from '../store/cart'

const CartProductCard = props => {
  const {item} = props
  const handleClick = async item => {
    await props.removeFromCart(item)
  }

  return (
    <Item>
      <Item.Image as={Link} to={`/products/${item.id}`} src={item.imageUrl} />
      <Item.Content>
        <Item.Header>{item.name}</Item.Header>
        <Item.Meta>Price: ${item.price / 100}</Item.Meta>
        <Item.Description>
          Quantity: {item.cartItem ? item.cartItem.quantity : 1}
        </Item.Description>
        <Button onClick={() => props.incrementItem(item, false)}>-</Button>
        <Button onClick={() => props.incrementItem(item, true)}>+</Button>
        <Item.Extra>
          <Button
            color="purple"
            floated="right"
            onClick={() => handleClick(item)}>
            Remove
          </Button>
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
    removeFromCart: item => dispatch(removeFromCart(item)),
    incrementItem: (item, inc) => dispatch(incrementItem(item, inc))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartProductCard)
