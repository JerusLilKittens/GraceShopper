import React from 'react'
import {Form} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {searchProducts} from '../store/product'
import ProductCard from './ProductCard'

class Search extends React.Component {
  state = {
    query: '',
    results: []
  }
  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length >= 1) {
          this.props.searchProducts(this.state.query)
          this.setState(prevState => {
            return {...prevState, results: this.props.results}
          })
        }
        if (this.state.query.length === 0) {
          this.setState(prevState => {
            return {...prevState, results: []}
          })
        }
      }
    )
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Group>
            <input
              placeholder="Search for..."
              ref={input => {
                this.search = input
              }}
              onChange={this.handleInputChange}
            />
          </Form.Group>
        </Form>
        <ul style={{ marginRight:300, position: 'absolute', width:200, height:20,backgoundColor: 'white'}}>
          {this.state.results.map(r => (
            <li key={r.id}>
              <ProductCard key={r.id} product={r} />
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    results: state.results
  }
}

const mapDispatch = dispatch => {
  return {
    searchProducts: query => dispatch(searchProducts(query))
  }
}

export default connect(mapState, mapDispatch)(Search)
