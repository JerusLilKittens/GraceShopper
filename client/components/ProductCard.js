import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Icon, Image, Button} from 'semantic-ui-react'
import {getProduct} from '../store/product'
import {addToCart} from '../store/cart'

const ProductCard = props => {
  const {imageUrl, name, description, price, id} = props.product
  const handleClick = item => {
    item.productId = item.id
    return async event => {
      event.stopPropagation()
      await props.addToCart(item)

    }
  }
  return (
    <Card as={Link} to={`/products/${id}`} >
      <Image src={imageUrl} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className="date">${price/100}</span>
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as={Link} to="/cart" color='teal' icon labelPosition='left' onClick={handleClick(props.product)}>
        <Icon name='cart' />
        Add to cart
        </Button>
      </Card.Content>
    </Card>
  )
}

const mapStateToProps = state => {
  return {
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: product => dispatch(getProduct(product)),
    addToCart: item => dispatch(addToCart(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
