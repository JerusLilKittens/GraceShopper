import React from 'react'
import { connect } from 'react-redux'
import { Rating, Icon, Image, Item, Container, Comment, Header, Form, Button } from 'semantic-ui-react'
import {getProduct} from '../store/product'

class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProduct(Number(productId))
  }

  render() {
    const product = this.props.selectedProduct
    const reviews = product.reviews
    console.log('reviews', reviews)
    return (
      <Container>
        <Item.Group>
          <Item>
            <Item.Image size='medium' src={product.imageUrl} />

            <Item.Content>
              <Item.Header as='a'>{product.name}</Item.Header>
              <Rating icon='star' rating={0} maxRating={5} />
              <Item.Meta>${product.price}</Item.Meta>
              <Item.Description>{product.description}</Item.Description>
              <Item.Extra>
                <Comment.Group>
                <Header as='h3' dividing>Reviews</Header>
                {reviews ? reviews.map(review => {
                  return (
                  <Item key={review.id}>
                    <Item.Content>
                      <Item.Header>Username</Item.Header>
                      <Rating icon='star' rating={review.rating} maxRating={5} />
                      <Item.Description>{review.text}</Item.Description>
                    </Item.Content>
                  </Item>
                )}) : <h1>no reviews yet</h1>}
                  <Header as='h3' dividing>Leave a Review</Header>
                    <Form>
                      <Form.TextArea />
                        <Button color='teal' content='Leave a review' labelPosition='left' icon='edit' primary />
                    </Form>
                </Comment.Group>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Container>
    )
  }
}


const mapStateToProps = ({selectedProduct}) => ({selectedProduct})

const mapDispatchToProps = dispatch => ({
  getProduct: product => dispatch(getProduct(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
