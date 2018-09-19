import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {updateOrderStatus} from '../store/order'

class CheckoutForm extends Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}
    this.submit = this.submit.bind(this)
  }

  async submit(evt) {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await fetch('/charge', {
      method: 'POST',
      headers: {'Content-Type': 'text/plain'},
      body: token.id
    })

    if (response.ok) this.setState({complete: true})
    this.props.updateOrderStatus(this.props.order.id, 'processing')
    this.props.history.push('/checkout/thankyou')
  }

  render() {
    return (
      <div className="checkout">
        <CardElement className='example' />
        <button onClick={this.submit}>Send</button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    order: state.orders[0]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateOrderStatus: () => dispatch(updateOrderStatus)
  }
}

export default injectStripe(connect(mapStateToProps, mapDispatchToProps)(CheckoutForm))
