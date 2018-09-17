import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {Container, Card} from 'semantic-ui-react'

import {getOrdersByUser} from '../store/order'
import {getUser} from '../store/user'

class UserOrder extends React.Component {

  componentDidMount() {
    console.log('hello')
    const userId = this.props.match.params.userId
    this.props.getOrdersByUser(Number(userId))
  }

  render() {
    const orders = this.props.orders

    return (
      <div>
        <br />
        <br />
        <hr />
        <h2> Orders Made By UserId: {this.props.match.params.userId} </h2>
        <table className="ordersTable">
          <tbody>
            <tr>
              <th>View Order</th>
              <th>Amount   ($)</th>
              <th>Date   </th>
              <th>Status </th>
              <th>Shipping Info   </th>
            </tr>
            {orders.map(order => {
              return (
                <tr key={order.id}>
                  <td><Link to={`/admin-orders/orders/${order.id}`}>View (Order Id: {order.id})</Link></td>
                  <td>{order.totalAmount/100}</td>
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
    orders: state.orders,
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getOrdersByUser: (userId) => dispatch(getOrdersByUser(userId)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrder)
