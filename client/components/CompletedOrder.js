import React from 'react'
import { Form, Button, Step, Container, Icon, Header } from 'semantic-ui-react'

class CompletedOrder extends React.Component {

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

          <Step completed>
            <Icon name='payment' />
            <Step.Content>
              <Step.Title>Billing</Step.Title>
              <Step.Description>Enter billing information</Step.Description>
            </Step.Content>
          </Step>

          <Step active>
            <Icon name='gift' />
            <Step.Content>
              <Step.Title>Thank You!</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>

        <Header>Thank you!</Header>

        </Container>
    )
  }
}

export default CompletedOrder
