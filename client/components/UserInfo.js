import React from 'react'
import {connect} from 'react-redux'

const UserInfo = props => {
  const {user} = props
  return (
    <div>
      <h2>
        Welcome, {user.firstName} {user.lastName}
      </h2>
      <h3>Your Information:</h3>
      <h4>Email: {user.email}</h4>
      <h3>Address:</h3>
      <h4>{user.address}</h4>
      <h4>
        {user.city}, {user.state}
      </h4>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserInfo)
