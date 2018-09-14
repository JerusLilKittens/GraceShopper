import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container, Card} from 'semantic-ui-react'

import {getProducts} from '../store/product'
import ProductCard from './ProductCard'

import CategoryList from './CategoryList'

class ProductList extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <CategoryList />
        <Container>
          <Card.Group>
            {products ? (
              products.map(product => {
                return <ProductCard key={product.id} product={product} />
              })
            ) : (
              <h1>nothing</h1>
            )}
          </Card.Group>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
    category: state.category
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
