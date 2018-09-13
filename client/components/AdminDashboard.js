import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Card, Dropdown, Header, Segment, Divider} from 'semantic-ui-react'


const optionsProduct = [
  { value: 'add-product', text: 'Add Product' },
  { value: 'edit-product', text: 'Edit Product' },
  { value: 'create-category', text: 'Create New Category' },
  { value: 'remove-category', text: 'Remove Category' },
  { value: 'add-category-for-product', text: 'Add Category for Product'},
  { value: 'remove-category-for-product', text: 'Remove Category for Product'},
  { value: 'manage-availability', text: 'Manage Product Availability'}
]

const optionsOrder = [
  { value: 'view-all-orders', text: 'View All Orders' },
  { value: 'view-created', text: 'View Created Orders' },
  { value: 'view-processing', text: 'View Processing Orders' },
  { value: 'view-cancelled', text: 'View Cancelled Orders' },
  { value: 'view-completed', text: 'View Completed Orders' },
]

const optionsUser = [
  { value: 'add-admin', text: 'Add Admin Status to User' },
  { value: 'remove-admin', text: 'Remove Admin Status to User' },
  { value: 'trigger-password-reset', text: 'Trigger Password Reset' },
]



class AdminDashBoard extends React.Component {

  constructor() {
    super()
    this.state = {
      display: 'add-product'
    };
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, data) {
    console.log('e')
    console.log(data.value)
    this.setState({
      display: data.value
    })
  }




  render() {
    return (
      <div>
    <Container widths='equal'>
      <Card.Group>
     <Divider hidden />
     <Header as='h1'>Product   ></Header>
     <Dropdown
      placeholder='Select'
      selection
      options={optionsProduct}
      onChange={this.handleChange.bind(this)}
      />

     <Divider hidden />
     <Header as='h1'>>    Orders ></Header>
     <Dropdown
      placeholder='Select'
      selection
      options={optionsOrder}
      onChange={this.handleChange.bind(this)}
      />

     <Divider hidden />
     <Header as='h1'> >   Users   ></Header>
     <Dropdown
      placeholder='Select'
      selection
      options={optionsUser}
      onChange={this.handleChange.bind(this)}
      />
      </Card.Group>
    </Container>


    <Container>
    {this.state.display}
    </Container>





    </div>
    )
  }
}


export default AdminDashBoard
