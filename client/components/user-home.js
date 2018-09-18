import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import UserForm from './UserForm'
import UserInfo from './UserInfo'

export class UserHome extends React.Component {
  constructor() {
    super()
    this.state = {
      editView: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState({editView: !this.state.editView})
  }

  render() {
    const {user} = this.props
    return (
      <div>
        {this.state.editView ? (
          <div>
            <UserForm handleClick={this.handleClick} />
          </div>
        ) : (
          <div>
            <UserInfo />
            <br />
            <Button onClick={this.handleClick}>Edit</Button>
            <br />
            <br />
            <br />
            <Button
              as={Link}
              to={`/user-orders/${user.id}`}
              size="massive"
              content="Order History"
            />
            {user.isAdmin ? (
              <div>
                <br />
                <br />
                <br />
                <Button
                  as={Link}
                  to="/admin-dashboard"
                  size="massive"
                  content="Admin Dash"
                />
              </div>
            ) : (
              <br />
            )}
          </div>
        )}
      </div>
    )
  }
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
