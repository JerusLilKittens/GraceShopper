import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Step, Container, Icon, Header } from 'semantic-ui-react'
import CheckoutForm from './CheckoutForm'
import {Elements} from 'react-stripe-elements'

class Billing extends React.Component {

  render() {
    return(
      <Container>
      <Step.Group>
          <Step completed>
            <Icon name='truck' />
            <Step.Content>
              <Step.Title>Shipping</Step.Title>
              <Step.Description>Choose your shipping options</Step.Description>
            </Step.Content>
          </Step>

          <Step active>
            <Icon name='payment' />
            <Step.Content>
              <Step.Title>Billing</Step.Title>
              <Step.Description>Enter billing information</Step.Description>
            </Step.Content>
          </Step>

          <Step disabled>
            <Icon name='gift' />
            <Step.Content>
              <Step.Title>Thank You!</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>

        <Header>Billing with Stripe here</Header>

        <Elements>
          <CheckoutForm history={this.props.history}/>
        </Elements>

      </Container>
    )
  }
}

export default Billing
