import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { Input, Icon, Menu, Segment, Dropdown } from 'semantic-ui-react'
import {logout} from '../store'

const items = [
  { key: 'home', active: true, name: 'Home' },
  { key: 'shop', name: 'Shop' },
  { key: 'events', name: 'Upcoming Events' },
]

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Jeru's Lil Kittens</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
        <Menu>
          <Menu.Item position='left' name='home' />
          <Menu.Item position='left'>
            <Dropdown item text='Shop' icon='cart' simple>
              <Dropdown.Menu>
                <Dropdown.Item>
                  <span className='text'>New</span>
                </Dropdown.Item>
                <Dropdown.Item>Open</Dropdown.Item>
                {/* map over categories to map dropdown items */}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          <Menu.Item position='right'>
            <div className='ui right aligned category search item'>
              <div className='ui transparent icon input'>
                <input className='prompt' type='text' placeholder='Search products...' />
                <i className='search link icon' />
              </div>
              <div className='results' />
            </div>
          </Menu.Item>
        </Menu>
    </nav>
    <hr />
  </div>
)




/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
