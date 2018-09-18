import React from 'react'
import { connect } from 'react-redux'
import {getOrder, updateOrderStatus} from '../store/order'
import {table} from 'semantic-ui-react'
import getOrderTable from '../utilities/order'
import {Link} from 'react-router-dom'


class SingleOrder extends React.Component {

  componentDidMount() {
    const orderId = this.props.match.params.orderId
    this.props.getOrder(Number(orderId))
  }

  handleClick = async (orderId, newStatus) => {
    await this.props.updateOrderStatus(orderId, newStatus)
    this.props.getOrder(Number(orderId))
  }

  render() {
    const order = this.props.order.order
    const items = this.props.order.items
    const products = this.props.order.products
    const itemTable = getOrderTable(products, items)

    return(
      <div>
      {order && items && products && (
        <div>
          <h2> Order Summary </h2>
          <table class="ui collapsing single line table">
          <tr>
            <th>Order Attribute</th>
            <th>Order Detail</th>
          </tr>
          <tr>
            <td>Order Id </td>
            <td>{order.id}</td>
          </tr>
          <tr>
            <td>Total Amount </td>
            <td>${order.totalAmount/100}</td>
          </tr>
          <tr>
            <td>Order Status </td>
            <td>{order.status}</td>
          </tr>
          <tr>
            <td>Order Placed </td>
            <td>{order.createdAt}</td>
          </tr>
          <tr>
            <td>Order Shipping Address </td>
            <td>{order.shippingInfo}</td>
          </tr>
          <tr>
            <td>Order Billing Address </td>
            <td>{order.billingInfo}</td>
          </tr>
          <tr>
            <td>Order User Id </td>
            <td><Link to={`/user-orders/${order.userId}`}>{order.userId}</Link></td>
          </tr>
          </table>
          <br />

          <h2> Items Ordered </h2>
          <table class="ui collapsing single line table">
          <tr>
            <th>Id</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Product Price</th>
          </tr>
          {itemTable.map(line => {
            return (
              <tr key={line.id}>
                <td>{line.id}</td>
                <td><Link to={`/products/${line.id}`}>{line.productName}</Link></td>
                <td>{line.quantity}</td>
                <td>{line.price/100}</td>
              </tr>
            )
          })}
          </table>
          <br />

          <h3>Adjust Status (The current status is {order.status})</h3>

          <div class="ui buttons">
          {order.status !== 'created' &&  <button type='button' class='ui button' onClick={()=>{this.handleClick(order.id, 'created').bind(this)}}>Mark Created</button>}
          {order.status !== 'processing' &&  <button type='button' class='ui button' onClick={()=>{this.handleClick(order.id, 'processing').bind(this)}}>Mark Processing</button>}
          {order.status !== 'cancelled' &&  <button type='button' class='ui button' onClick={()=>{this.handleClick(order.id, 'cancelled').bind(this)}}>Mark Cancelled</button>}
          {order.status !== 'completed' &&  <button type='button' class='ui button' onClick={()=>{this.handleClick(order.id, 'completed').bind(this)}}>Mark Completed</button>}
          </div>
          <br />
          <br />
          <br />
          <Link to="/admin-dashboard">Admin Dashboard</Link>
        </div>
      )}
       </div>
    )
  }
}

const mapStateToProps = (state) => ({
  order: state.order
})

const mapDispatchToProps = dispatch => ({
  getOrder: (order) => dispatch(getOrder(order)),
  updateOrderStatus: (orderId, newStatus) => dispatch(updateOrderStatus(orderId, newStatus))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
