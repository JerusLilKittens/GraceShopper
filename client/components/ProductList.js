import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Container, Card} from 'semantic-ui-react'

import {getProducts} from '../store/product'
import ProductCard from './ProductCard'

class ProductList extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    console.log(this.props.match.params.category)
    const products = this.props.products
    return (
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
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
