import React, {Component} from 'react'
import {CardElement, injectStripe} from 'react-stripe-elements'
import {Button} from 'semantic-ui-react'
import Redirect from 'react-router-dom'

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
    this.props.history.push('/checkout/thankyou')
  }

  render() {
    return (
      <div className="checkout">
        <CardElement />
        <Button color="teal" onClick={this.submit}>
          Finish
        </Button>
      </div>
    )
  }
}

export default injectStripe(CheckoutForm)
