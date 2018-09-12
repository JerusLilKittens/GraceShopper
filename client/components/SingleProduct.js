import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Rating, Icon, Image, Item } from 'semantic-ui-react'

const SingleProduct = (props) => {
  const product = props.product
  const reviews = product.reviews

  return (
    <div id="single-product">
      <Item>
        <Item.Image size='small' src={product.imageUrl} />

        <Item.Content>
          <Item.Header as='a'>{product.name}</Item.Header>
          <Rating icon='star' defaultRating={0} maxRating={5} />
          <Item.Description>{product.description}</Item.Description>
          <Item.Extra>
            <Icon color='yellow' name='dollar sign' /> {product.price}
          </Item.Extra>
        </Item.Content>
      </Item>

      <div id="product-reviews">
      <Item.Group>
      {reviews.map(review => {
        return (
        <Item key={review.id}>
          <Item.Content>
            <Item.Header>Header</Item.Header>
            <Rating icon='star' rating={review.rating} maxRating={5} />
            <Item.Description>{review.text}</Item.Description>
          </Item.Content>
        </Item>
      )})}
      </Item.Group>
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    product: state.selectedProduct
  }
}

const mapDispatchToProps = dispatch => {

}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
