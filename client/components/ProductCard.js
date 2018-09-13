import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Icon, Image, Button} from 'semantic-ui-react'
import {getProduct} from '../store/product'

const ProductCard = props => {
  const {imageUrl, name, description, price, id} = props.product
  return (
    <Card as={Link} to={`/products/${id}`} onClick={() => props.getProduct(props.product)}>
      <Image src={imageUrl} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className="date">${price}</span>
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button color='teal' icon labelPosition='left'>
        <Icon name='cart' />
        Add to cart
        </Button>
      </Card.Content>
    </Card>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getProduct: product => dispatch(getProduct(product))
  }
}

export default connect(null, mapDispatchToProps)(ProductCard)
