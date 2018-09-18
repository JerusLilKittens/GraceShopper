import React from 'react'
import {connect} from 'react-redux'
import {Header, Item} from 'semantic-ui-react'

const UserInfo = props => {
  const {user} = props
  return (
    <Item.Content>
      <Header>Welcome, {user.firstName} {user.lastName}</Header>
      <Item.Description>Email: {user.email}</Item.Description>
      <Item.Description>Address: {user.address}, {user.city}, {user.state}</Item.Description>
    </Item.Content>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserInfo)
