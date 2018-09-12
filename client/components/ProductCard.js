import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Card, Icon, Image, Button} from 'semantic-ui-react'

const ProductCard = props => {
  const {imageUrl, name, description, price, stock, id} = props.product
  return (
    <Card>
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

export default ProductCard
