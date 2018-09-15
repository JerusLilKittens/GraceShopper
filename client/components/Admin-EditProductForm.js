import React, {Component} from 'react'
import {editProduct} from '../store/product'
import {connect} from 'react-redux'
import {Form, Grid, Dropdown, Segment} from 'semantic-ui-react'

class EditProductForm extends Component {
  state = {
    name: '',
    nameError: '',
    description: '',
    descriptionError: '',
    price: '',
    priceError: '',
    stock: '',
    stockError: '',
    value: '',
    options: []
  }



  componentDidMount = () => {
    const catOptions = []
    
    this.props.product.categories.forEach((ele,index)=>{
      catOptions.push({key: index, text: ele.name, value: ele.id})
    })
    this.setState({
      name: this.props.product.selectedProduct.name,
      nameError: '',
      description: this.props.product.selectedProduct.description,
      descriptionError: '',
      price: this.props.product.selectedProduct.price,
      priceError: '',
      stock: this.props.product.selectedProduct.stock,
      stockError: '',
      options: catOptions
    })
    
  }
  change = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  validate = () => {
    const isInvalid = 'error'
    let isError = false
    if (this.state.name === '') {
      isError = true
      this.setState({nameError: isInvalid})
    }
    if (this.state.price === '') {
      isError = true
      this.setState({priceError: isInvalid})
    }
    if (this.state.stock === '') {
      isError = true
      this.setState({stockError: isInvalid})
    }
    if (this.state.description === '') {
      isError = true
      this.setState({descriptionError: isInvalid})
    }

    return isError
  }

  handleChange = (e, {value}) => this.setState({value})

  handleSubmit = event => {
    console.log(this.state.value)
    event.preventDefault()
    const formData = {
      name: event.target.name.value,
      price: event.target.price.value,
      description: event.target.description.value,
      stock: event.target.stock.value,
      catId: this.state.value
    }
    const err = this.validate()

    if (!err) {
      this.props.editProduct(this.props.product.selectedProduct.id, formData)
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Name"
            placeholder="Product Name"
            className={this.state.nameError}
            name="name"
            value={this.state.name}
            onChange={event => this.change(event)}
          />
          <Form.Input
            fluid
            label="Price"
            placeholder="$0.00 enter price of item"
            className={this.state.priceError}
            name="price"
            value={this.state.price}
            onChange={event => this.change(event)}
          />
          <Form.Input
            fluid
            label="Stock Number"
            placeholder="Stock #"
            className={this.state.stockError}
            name="stock"
            value={this.state.stock}
            onChange={event => this.change(event)}
          />
          </Form.Group>
          <Form.Group widths="equal">
        <Form.TextArea
          label="Description"
          placeholder="Write at least a sentence..."
          className={this.state.descriptionError}
          name="description"
          cols="20"
          rows="4"
          value={this.state.description}
          onChange={event => this.change(event)}
          />
        <Grid columns={1}>
          <Grid.Column>
            <Dropdown
              onChange={this.handleChange}
              options={this.state.options}
              placeholder="Choose an option"
              selection
              value={this.state.value}
              />
          </Grid.Column>
        </Grid>

        <Form.Button type="submit" className="btn btn-primary">
          Submit
        </Form.Button>
        </Form.Group>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  editProduct: (id, formData) => {
    dispatch(editProduct(id, formData))
  }
})

export default connect(null, mapDispatchToProps)(EditProductForm)
