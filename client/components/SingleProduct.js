import React from 'react'
import {connect} from 'react-redux'
import { Rating, Icon, Image, Item, Container, Comment, Header, Form, Button } from 'semantic-ui-react'
import {getProduct} from '../store/product'
import {addReview} from '../store/review'
import EditProductForm from '../components/Admin-EditProductForm'
import {getCategories} from '../store/category'
import ReviewForm from './ReviewForm'

class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProduct(Number(productId))
    this.props.getCategories()
  }

  handleSubmit = async props => {
    const productId = Number(this.props.match.params.productId)
    const review = {
      rating: props.reviewRating,
      text: props.reviewName,
      productId: productId
    }
    console.log('review', review)
    await this.props.addReview(review)
  }

  render() {
    console.log(this.props.isAdmin, '++++++++ isAdmin!!!!')
    const product = this.props.selectedProduct
    const reviews = product.reviews
    return (
      <Container>
        <Item.Group>
          <Item>
            <Item.Image size="medium" src={product.imageUrl} />

            <Item.Content>
              <Item.Header as="a">{product.name}</Item.Header>
              <Rating icon="star" rating={0} maxRating={5} />
              <Item.Meta>${product.price}</Item.Meta>
              {product.categories && (
                <Item.Meta>Category: {product.categories[0].name}</Item.Meta>
              )}
              <Item.Description>{product.description}</Item.Description>
              <Item.Extra>
                <Button color="teal" icon labelPosition="left">
                  <Icon name="cart" />Add to cart
                </Button>
                <Comment.Group>
                  <Header as="h3" dividing>
                    Reviews
                  </Header>
                  {reviews ? (
                    reviews.map(review => {
                      return (
                        <Item key={review.id}>
                          <Item.Content>
                            <Item.Header>Username</Item.Header>
                            <Rating
                              icon="star"
                              rating={review.rating}
                              maxRating={5}
                            />
                            <Item.Description>{review.text}</Item.Description>
                          </Item.Content>
                        </Item>
                      )
                    })
                  ) : (
                    <h1>no reviews yet</h1>
                  )}
                  <Header as="h3" dividing>Leave a Review</Header>
                  {this.props.isLoggedIn ? <ReviewForm onSubmit={this.handleSubmit}/>
                  : <h3>Please log in to leave a review</h3>}
                </Comment.Group>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        <div>
          {this.props.selectedProduct.id &&
            this.props.isAdmin.isAdmin && (
              <EditProductForm product={this.props} />
            )}
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.selectedProduct,
  isAdmin: state.user,
  categories: state.categories,
  isLoggedIn: !!state.user.id
})

const mapDispatchToProps = dispatch => ({
  getProduct: product => dispatch(getProduct(product)),
  addReview: review => dispatch(addReview(review)),
  getCategories: () => dispatch(getCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
