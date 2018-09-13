import React from 'react'
import {connect} from 'react-redux'
import {Card, Icon, Image, Button} from 'semantic-ui-react'
import {selectProduct} from '../store/product'

const ProductCard = props => {
  const {imageUrl, name, description, price, id} = props.product
  return (
    <Card href={`products/${id}`} onClick={() => props.selectProduct(props.product)}>
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
    selectProduct: product => dispatch(selectProduct(product))
  }
}

export default connect(null, mapDispatchToProps)(ProductCard)
