import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export const UserHome = props => {
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

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
// UserHome.propTypes = {
//   email: PropTypes.string
// }
