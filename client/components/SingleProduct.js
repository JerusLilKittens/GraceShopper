import React from 'react'
import { connect } from 'react-redux'
import { Rating, Icon, Item, Container, Comment, Header, Button } from 'semantic-ui-react'
import { getProduct } from '../store/product'
import { addReview } from '../store/review'
import ReviewForm from './ReviewForm'


class SingleProduct extends React.Component {

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProduct(Number(productId))
  }

  handleSubmit = async (props) => {
    const productId = Number(this.props.match.params.productId)
    const review = {rating: props.reviewRating, text: props.reviewName, productId: productId}
    await this.props.addReview(review)
  }

  render() {
    const product = this.props.selectedProduct
    const reviews = product.reviews
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
                    <Button color='teal' icon labelPosition='left'>
                      <Icon name='cart' />Add to cart
                    </Button>
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
                {this.props.isLoggedIn ?
                  <ReviewForm onSubmit={this.handleSubmit} />
                : <h4>Please log in to leave a review</h4>}
                </Comment.Group>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
      </Container>
    )
  }
}



const mapStateToProps = state => {
  return {
  selectedProduct: state.selectedProduct,
  isLoggedIn: !!state.user.id
}}

const mapDispatchToProps = dispatch => ({
  getProduct: product => dispatch(getProduct(product)),
  addReview: review => dispatch(addReview(review))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
