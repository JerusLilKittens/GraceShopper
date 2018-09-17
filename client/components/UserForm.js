import React from 'react'
import {connect} from 'react-redux'
import {Field, reduxForm} from 'redux-form'
import {Form, Button} from 'semantic-ui-react'

import {updateUser} from '../store/user'

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: props.user.firstName,
      lastName: props.user.lastName,
      address: props.user.address,
      city: props.user.city,
      state: props.user.state,
      email: props.user.email
    }
  }
  handleChange = (e, {name, value}) => {
    e.preventDefault()
    this.setState({[name]: value})
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.updateUser({...this.state, id: this.props.user.id})
    this.props.handleClick()
  }
  render() {
    const {firstName, lastName, address, city, state, email} = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            width={5}
            name="firstName"
            label="First name"
            value={firstName}
            onChange={this.handleChange}
          />
          <Form.Input
            width={5}
            name="lastName"
            label="Last name"
            value={lastName}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            width={5}
            name="address"
            label="Address"
            value={address}
            onChange={this.handleChange}
          />
          <Form.Input
            width={3}
            name="city"
            label="City"
            value={city}
            onChange={this.handleChange}
          />
          <Form.Input
            width={2}
            name="state"
            label="State"
            value={state}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Input
            width={10}
            name="email"
            label="Email"
            value={email}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Button content="Update" />
      </Form>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user))
  }
}

export default connect(mapState, mapDispatch)(UserForm)
