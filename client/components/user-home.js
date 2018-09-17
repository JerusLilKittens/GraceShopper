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
    return (
      <div>
        {this.state.editView ? (
          <div>
            <UserForm handleClick={this.handleClick} />
          </div>
        ) : (
          <div>
            <UserInfo />
            <button onClick={this.handleClick}>Edit</button>
            <br />
            <br />
            <br />
            <Button
              as={Link}
              to={`/user-orders/${this.props.user.id}`}
              size="massive"
              content="Order History"
            />
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
