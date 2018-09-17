import React from 'react'
import {connect} from 'react-redux'
import {Container, Card, Grid} from 'semantic-ui-react'

import {getProducts} from '../store/product'

import ProductCard from './ProductCard'
import CategoryList from './CategoryList'

class ProductList extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products
    console.log('session: ', document.location.href)
    return (
        <Container>
          <Grid>
            <Grid.Column width={3}>
              <CategoryList />
            </Grid.Column>
            <Grid.Column width={13}>
              <Card.Group>
                {products ? (
                  products.map(product => {
                    return <ProductCard key={product.id} product={product} />
                  })
                ) : (
                  <h1>no products</h1>
                )}
              </Card.Group>
            </Grid.Column>
          </Grid>
        </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    selectedCategory: state.selectedCategory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
