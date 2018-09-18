import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button, Step, Container, Icon} from 'semantic-ui-react'
import {addOrder} from '../store/order'

const options = [
  {key: 'AL', text: 'AL', value: 'Alabama'},
  {key: 'AK', text: 'AK', value: 'Alaska'},
  {key: 'AZ', text: 'AZ', value: 'Arizona'},
  {key: 'AR', text: 'AR', value: 'Arkansas'},
  {key: 'CA', text: 'CA', value: 'California'},
  {key: 'CO', text: 'CO', value: 'Colorado'},
  {key: 'CT', text: 'CT', value: 'Connecticut'},
  {key: 'DE', text: 'DE', value: 'Delaware'},
  {key: 'DC', text: 'DC', value: 'District Of Columbia'},
  {key: 'FL', text: 'FL', value: 'Florida'},
  {key: 'GA', text: 'GA', value: 'Georgia'},
  {key: 'HI', text: 'HI', value: 'Hawaii'}
  // {key: ' ', text: ' ', value: "Idaho"}, {key: ' ', text: ' ', value: "Illinois"}, {key: ' ', text: ' ', value: "Indiana"},
  //   {key: ' ', text: ' ', value: "Iowa"},
  //   {key: ' ', text: ' ', value: "Kansas"},
  //   {key: ' ', text: ' ', value: "Kentucky"},
  //   {key: ' ', text: ' ', value: "Louisiana"},{key: ' ', text: ' ', value: "Maine"},{key: ' ', text: ' ', value: "Marshall Islands"},{key: ' ', text: ' ', value: "Maryland"},{key: ' ', text: ' ', value: "Massachusetts"},{key: ' ', text: ' ', value: "Michigan"},{key: ' ', text: ' ', value: "Minnesota"},{key: ' ', text: ' ', value: "Mississippi"},{key: ' ', text: ' ', value: "Missouri"},{key: ' ', text: ' ', value: "Montana"},{key: ' ', text: ' ', value: "Nebraska"},{key: ' ', text: ' ', value: "Nevada"},{key: ' ', text: ' ', value: "New Hampshire"},{key: ' ', text: ' ', value: "New Jersey"},{key: ' ', text: ' ', value: "New Mexico"},{key: ' ', text: ' ', value: "New York"},{key: ' ', text: ' ', value: "North Carolina"},{key: ' ', text: ' ', value: "North Dakota"},{key: ' ', text: ' ', value: "Northern Mariana Islands"},{key: ' ', text: ' ', value: "Ohio"},{key: ' ', text: ' ', value: "Oklahoma"},{key: ' ', text: ' ', value: "Oregon"},{key: ' ', text: ' ', value: "Palau"},{key: ' ', text: ' ', value: "Pennsylvania"},{key: ' ', text: ' ', value: "Puerto Rico"},{key: ' ', text: ' ', value: "Rhode Island"},{key: ' ', text: ' ', value: "South Carolina"},{key: ' ', text: ' ', value: "South Dakota"},{key: ' ', text: ' ', value: "Tennessee"},{key: ' ', text: ' ', value: "Texas"},{key: ' ', text: ' ', value: "Utah"},{key: ' ', text: ' ', value: "Vermont"},{key: ' ', text: ' ', value: "Virgin Islands"},{key: ' ', text: ' ', value: "Virginia"},{key: ' ', text: ' ', value: "Washington"},{key: ' ', text: ' ', value: "West Virginia"},{key: ' ', text: ' ', value: "Wisconsin"},{key: ' ', text: ' ', value: "Wyoming"}
]

class ShippingForm extends Component {
  state = {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    state: ''
  }
  handleChange = (evt, {name, value}) => this.setState({[name]: value})

  handleSubmit = async () => {
    const {firstName, lastName, address, city, zip, state} = this.state

    const subtotal = this.props.cart.subtotal

    const order = {
      shippingInfo: `${firstName} ${lastName}, ${address}, ${city}, ${state} ${zip}`,
      totalAmount: subtotal + 399 + Math.floor(subtotal * 0.06),
      status: 'created',
      userId: this.props.user.id
    }
    await this.props.addOrder(order)
    this.props.history.push('/checkout/billing')
  }

  render() {
    const {firstName, lastName, address, city, zip, state} = this.state
    return (
      <Container>
        <Step.Group>
          <Step active>
            <Icon name="truck" />
            <Step.Content>
              <Step.Title>Shipping</Step.Title>
              <Step.Description>Choose your shipping options</Step.Description>
            </Step.Content>
          </Step>

          <Step disabled>
            <Icon name="payment" />
            <Step.Content>
              <Step.Title>Billing</Step.Title>
              <Step.Description>Enter billing information</Step.Description>
            </Step.Content>
          </Step>

          <Step disabled>
            <Icon name="gift" />
            <Step.Content>
              <Step.Title>Thank You!</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="First name"
              placeholder="First name"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Last name"
              placeholder="Last name"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              label="Street Address"
              placeholder="First name"
              name="address"
              value={address}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="City"
              placeholder="City"
              name="city"
              value={city}
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              label="Zip Code"
              placeholder="Zip Code"
              name="zip"
              value={zip}
              onChange={this.handleChange}
            />
            {/* <Form.Select fluid label='State' options={options} placeholder='State' name='state' value={state} onChange={this.handleChange}/> */}
            <Form.Input
              fluid
              label="State"
              placeholder="State"
              name="state"
              value={state}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit" color="teal" float="right">
            Next
          </Button>
        </Form>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart: state.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOrder: order => dispatch(addOrder(order))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingForm)
