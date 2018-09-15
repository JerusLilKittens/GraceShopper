import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
// import {Container, Card} from 'semantic-ui-react'

import {getOrders} from '../store/order'

class ViewOrders extends React.Component {

  componentDidMount() {
    this.props.getOrders()
  }

  render() {
    const orders = this.props.orders
    console.log(orders)
    console.log(orders.length)

    return (
      <div>
        <br />
        <br />
        <br />
        <table className="ordersTable">
          <tbody>
            <tr>
              <th>Order Id</th>
              <th>Amount   ($)</th>
              <th>Date   </th>
              <th>Status </th>
              <th>Shipping Info   </th>
            </tr>
            {orders.map(order => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.totalAmount}</td>
                  <td>{order.createdAt}</td>
                  <td>{order.status}</td>
                  <td>{order.shippingInfo}</td>
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
    orders: state.orders
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrders: () => dispatch(getOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrders)

