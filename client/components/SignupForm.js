import React from 'react'
import {connect} from 'react-redux'
import {Form, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

import {createUser} from '../store/user'

class SignupForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      email: '',
      password: '',
      submit: false
    }
  }

  handleClick = e => {
    this.setState({
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      email: '',
      password: '',
      
    })
  }
  handleChange = (e, {name, value}) => {
    e.preventDefault()
    this.setState({[name]: value})
  }
  handleSubmit = e => {
    e.preventDefault()
    this.setState((prevState)=>({...prevState, submit: true}))
    this.props.createUser({...this.state})
    this.handleClick()
  }
  render() {
    const {firstName, lastName, address, city, state, email, password, submit} = this.state
    return (
      
      <div>

        {submit ? 
        <Form style={{margin: 10}}>
          <Form.Group width="equal">
        <Link to="/home" ><Form.Button width={20} color="teal" content="Got to Account"/> </Link>
        <Link to="/products"><Form.Button width={20} color="purple" content="Go Shopping"/></Link>
      </Form.Group>
        </Form> :
        
         <div>
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
          <Form.Group>
            <Form.Input
              width={10}
              type='password'
              name="password"
              label="Password"
              value={password}
              onChange={this.handleChange}
            />
          </Form.Group>
            <Form.Button color="teal" content="Submit" />
        </Form>

        <Form>
          <Button color="red" onClick={this.handleClick}>
            Cancel
          </Button>
    </Form>
    </div>
    
  }
      </div>
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
    createUser: user => dispatch(createUser(user))
  }
}

export default connect(mapState, mapDispatch)(SignupForm)
