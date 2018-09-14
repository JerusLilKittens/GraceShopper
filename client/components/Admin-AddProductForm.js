import React, {Component} from 'react'
import {createProduct} from '../store/product'
import {connect} from 'react-redux'
import {Form} from 'semantic-ui-react'

class AddProductForm extends Component {
  state = {
    name: '',
    nameError: '',
    description: '',
    descriptionError: '',
    price: '',
    priceError: '',
    stock: '',
    stockError: ''
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

  handleSubmit = event => {
    event.preventDefault()
    const formData = {
      name: event.target.name.value,
      price: event.target.price.value,
      description: event.target.description.value,
      stock: event.target.stock.value
    }
    const err = this.validate()

    if (!err) {
      this.setState({
        name: '',
        nameError: '',
        price: '',
        priceError: '',
        description: '',
        descriptionError: '',
        stock: '',
        stockError: ''
      })
      this.props.createProduct(formData)
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

        <Form.Button type="submit" className="btn btn-primary">
          Submit
        </Form.Button>
      </Form>
    )
  }
}

const mapStateDispatchToProps = dispatch => ({
  createProduct: formData => {
    dispatch(createProduct(formData))
  }
})

export default connect(null, mapStateDispatchToProps)(AddProductForm)
