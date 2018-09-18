import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button, Container, Item} from 'semantic-ui-react'
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
      <Container>
        {this.state.editView ? (
          <div>
            <UserForm handleClick={this.handleClick} />
          </div>
        ) : (
          <Container>
            <Item>
              <Item.Image src='/default_product.png' size='small'/>
              <Item.Content>
                <UserInfo />
                <Item.Extra>
                  <Button color="teal" floated="right" onClick={this.handleClick}>Edit</Button>
                </Item.Extra>
              </Item.Content>
            </Item>
            <br />
            <br />
            <br />
            <br />
            <Button
              as={Link}
              to={`/user-orders/${user.id}`}
              size="medium"
              color="teal"
              content="View Order History"
            />
            {user.isAdmin ? (
              <div>
                <br />
                <br />
                <br />
                <Button
                  as={Link}
                  to="/admin-dashboard"
                  size="medium"
                  color="teal"
                  content="Admin Dash"
                />
              </div>
            ) : (
              <br />
            )}
          </Container>
        )}
      </Container>
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
