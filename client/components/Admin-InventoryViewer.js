import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Label} from 'semantic-ui-react'

import {getProducts} from '../store/product'

class InventoryViewer extends React.Component {

  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const products = this.props.products

    return (
      <div>
        <br />
        <br />
        <hr />
        <table className="ordersTable">
          <tbody>
            <tr>
              <th>Product Id</th>
              <th>Product Name</th>
              <th>Price    </th>
              <th>Qty in Stock </th>
              <th>Note</th>
            </tr>
            {products.map(product => {
              return (
                <tr key={product.id}>
                  <td><Link to={`/products/${product.id}`}>Edit (Id:{product.id})</Link></td>
                  <td>{product.name}</td>
                  <td>${(product.price/100).toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td> {(product.stock <5 ) ? (
                    (product.stock< 1) ? (
                      <Label color='red'>Out of Stock/Backordered</Label>
                    ) : (<Label color='yellow'>Low Quantity</Label>)) :
                    (<Label color='green'>In stock</Label>)
                  } </td>
                </tr>
              )
            })}
        </tbody>
        </table>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(InventoryViewer)

