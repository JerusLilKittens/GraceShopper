import React from 'react'
import { connect } from 'react-redux'
import {getOrder} from '../store/order'


class SingleOrder extends React.Component {

  componentDidMount() {
    const orderId = this.props.match.params.orderId
    console.log(orderId)
    this.props.getOrder(Number(orderId))
  }

  render() {

    const order = this.props.order.order
    const items = this.props.order.items
    console.log('order' , order)

    console.log("props" , this.props)
    return(
      <div>

      {order && (
        <div>
          Order Id: {order.id}
          <br />
          Billing Info: {order.billingInfo}
          <br />
          CreatedAt: {order.createdAt}
          <br />
          Shipping Info: {order.shippingInfo}
          <br />
          <h3> Total: {order.totalAmount} </h3>
          <br />
          <br />
          <table>
          {items.map(item => {
            return (
              <p key={item.id}>
              Item Quantity: {item.quantity} for {item.price} each (Item Number {item.lineItemProductId})
              </p>
            )
          })}
          </table>


          </div>


      )}
       </div>
    )

  }
}

const mapStateToProps = ({order}) => (
  {order}
)

const mapDispatchToProps = dispatch => ({
  getOrder: (order) => dispatch(getOrder(order))

})

export default connect(mapStateToProps, mapDispatchToProps)(SingleOrder)
