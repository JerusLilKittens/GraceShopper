import React from 'react'
import {connect} from 'react-redux'

const UserInfo = props => {
  const {user} = props
  return (
    <div>
      <h1>
        Welcome, {user.firstName} {user.lastName}
      </h1>
      <h3>Email: {user.email}</h3>
      <h3>Address: {user.address}</h3>
      <h3>
        {user.city}, {user.state}
      </h3>
    </div>
  )
}

const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserInfo)
