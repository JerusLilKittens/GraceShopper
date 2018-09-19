import React from 'react'
import {Link} from 'react-router-dom'
import {
  Container,
  Card,
  Dropdown,
  Header,
  Segment,
  Divider
} from 'semantic-ui-react'
import AddProductForm from './Admin-AddProductForm'
import EditProductForm from './Admin-EditProductForm'
import ViewOrders from './Admin-ViewOrders'
import InventoryViewer from './Admin-InventoryViewer'
import AdminCharts from './Admin-Charts'

const optionsProduct = [
  {value: 'add-product', text: 'Add Product'},
  {value: 'edit-product', text: 'Edit Product'},
  {value: 'create-category', text: 'Create New Category'},
  {value: 'remove-category', text: 'Remove Category'},
  {value: 'add-category-for-product', text: 'Add Category for Product'},
  {value: 'remove-category-for-product', text: 'Remove Category for Product'},
  {value: 'manage-availability', text: 'Manage Product Availability'},
  {value: 'inventory-viewer', text: 'View Inventory'}
]

const optionsOrder = [
  {value: 'view-all-orders', text: 'View All Orders'},
  {value: 'view-created', text: 'View Created Orders'},
  {value: 'view-processing', text: 'View Processing Orders'},
  {value: 'view-cancelled', text: 'View Cancelled Orders'},
  {value: 'view-completed', text: 'View Completed Orders'},
  {value: 'analytics-orders', text: 'Orders Analytics'}
]

const optionsUser = [
  {value: 'add-admin', text: 'Add Admin Status to User'},
  {value: 'remove-admin', text: 'Remove Admin Status to User'},
  {value: 'trigger-password-reset', text: 'Trigger Password Reset'}
]

class AdminDashBoard extends React.Component {
  constructor() {
    super()
    this.state = {
      display: 'none'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event, data) {
    this.setState({
      display: data.value
    })
  }

  render() {
    return (
      <div>
        <Container widths="equal">
          <Card.Group>
            <Divider hidden />
            <Header as="h1">Product ></Header>
            <Dropdown
              placeholder="Select"
              selection
              options={optionsProduct}
              onChange={this.handleChange.bind(this)}
            />

            <Divider hidden />
            <Header as="h1">> Orders ></Header>
            <Dropdown
              placeholder="Select"
              selection
              options={optionsOrder}
              onChange={this.handleChange.bind(this)}
            />

            <Divider hidden />
            <Header as="h1"> > Users ></Header>
            <Dropdown
              placeholder="Select"
              selection
              options={optionsUser}
              onChange={this.handleChange.bind(this)}
            />
          </Card.Group>
        </Container>

        <Container>
          {/* <AddProductForm /> */}
          {this.state.display === 'add-product' && <AddProductForm />}
          {this.state.display === 'edit-product' && <EditProductForm />}
          {this.state.display === 'inventory-viewer' && <InventoryViewer />}



          {/* <Orders Routing /> */}
          {this.state.display === 'view-all-orders' && (
            <ViewOrders display="all" />
          )}
          {this.state.display === 'view-created' && (
            <ViewOrders display="created" />
          )}
          {this.state.display === 'view-processing' && (
            <ViewOrders display="processing" />
          )}
          {this.state.display === 'view-completed' && (
            <ViewOrders display="completed" />
          )}
          {this.state.display === 'view-cancelled' && (
            <ViewOrders display="cancelled" />
          )}
          {this.state.display === 'analytics-orders' && (
            <AdminCharts />
          )}


        </Container>
      </div>
    )
  }
}

export default AdminDashBoard
