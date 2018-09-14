import React from 'react'
import {connect} from 'react-redux'
import {
  Rating,
  Icon,
  Image,
  Item,
  Container,
  Comment,
  Header,
  Form,
  Button
} from 'semantic-ui-react'
import {getProduct} from '../store/product'
import {addReview} from '../store/review'
import EditProductForm from '../components/Admin-EditProductForm'
import {getCategories} from '../store/category'
import {getSingleProductCat} from '../store/product'

class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProduct(Number(productId))
    this.props.getCategories()
  }

  handleClick = event => {
    console.log('review target', event.target)
    addReview(event.target)
  }

  render() {
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
                  <Header as="h3" dividing>
                    Leave a Review
                  </Header>
                  <Form>
                    <Form.TextArea />
                    <Rating icon="star" defaultRating={0} maxRating={5} />
                    <Button
                      color="teal"
                      content="Leave a review"
                      labelPosition="left"
                      icon="edit"
                      onClick={this.handleClick}
                    />
                  </Form>
                </Comment.Group>
              </Item.Extra>
            </Item.Content>
          </Item>
        </Item.Group>
        <div>
          {this.props.selectedProduct.id &&
            this.props.isAdmin && <EditProductForm product={this.props} />}
        </div>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.selectedProduct,
  isAdmin: state.user,
  categories: state.categories
})

const mapDispatchToProps = dispatch => ({
  getProduct: product => dispatch(getProduct(product)),
  addReview: review => dispatch(addReview(review)),
  getCategories: () => dispatch(getCategories()),
  getSingleProductCat: (id) => dispatch(getSingleProductCat(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
