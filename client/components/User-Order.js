import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Header, Table, Rating} from 'semantic-ui-react'
// import {Container, Card} from 'semantic-ui-react'

import {getOrdersByUser} from '../store/order'
import {getUser} from '../store/user'

class UserOrder extends React.Component {
  componentDidMount() {
    const userId = this.props.user.id
    this.props.getOrdersByUser(userId)
  }

  render() {
    const {orders, user} = this.props
    return (
      <div>
        <h2>Your Orders:</h2>
        <Table celled padded>
          <Table.Row>
            <Table.HeaderCell>Order</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
          </Table.Row>
          {orders.map(order => {
            return (
              <Table.Row key={order.id}>
                <Table.Cell>
                  <Link to={`/admin-orders/orders/${order.id}`}>
                    {order.id}
                  </Link>
                </Table.Cell>
                <Table.Cell>{order.totalAmount}</Table.Cell>
                <Table.Cell>{order.createdAt}</Table.Cell>
                <Table.Cell>{order.status}</Table.Cell>
                <Table.Cell>{order.shippingInfo}</Table.Cell>
              </Table.Row>
            )
          })}
        </Table>
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
    getOrdersByUser: userId => dispatch(getOrdersByUser(userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOrder)
