import React, {Component} from 'react'
import {editProduct, deleteCategoryFromProduct} from '../store/product'
import {connect} from 'react-redux'
import {Form, Dropdown} from 'semantic-ui-react'

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
    value: [],
    options: []
  }

  componentDidMount = () => {
    const catOptions = []

    if (this.props.product.selectedProduct.categories) {
      this.props.product.selectedProduct.categories.forEach(ele => {
        this.setState(prevState => {
          return {value: [...prevState.value, ele.name]}
        })
      })
    }
    this.props.product.categories.forEach((ele, index) => {
      catOptions.push({key: index, text: ele.name, value: ele.name})
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

  handleAddition = (e, {value}) => {
    this.setState({
      options: [{text: value, value}, ...this.state.options]
    })
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

  handleChange = (e, {value}) => {
    this.state.options.forEach(option => {
      const testValue = value.findIndex(ele => {
        return ele === option.value
      })
      if (testValue === -1) {
        this.props.deleteCategoryFromProduct(
          option.value,
          this.props.product.selectedProduct.id
        )
      }
    })
    this.setState({value})
  }

  handleSubmit = event => {
    event.preventDefault()
    const formData = {
      name: event.target.name.value,
      price: event.target.price.value,
      description: event.target.description.value,
      stock: event.target.stock.value,
      cats: this.state.value
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
          <Form.Field>
            <label>Category</label>
            <Dropdown
              onChange={this.handleChange}
              options={this.state.options}
              multiple
              value={this.state.value}
              fluid
              search
              selection
              allowAdditions
              onAddItem={this.handleAddition}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <Form.Button
            style={{marginBottom: 20}}
            size="big"
            color="purple"
            type="submit"
            className="btn btn-primary"
          >
            Submit Edited Product
          </Form.Button>
        </Form.Field>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  editProduct: (id, formData) => {
    dispatch(editProduct(id, formData))
  },
  deleteCategoryFromProduct: (catName, prodId) => {
    dispatch(deleteCategoryFromProduct(catName, prodId))
  }
})

export default connect(null, mapDispatchToProps)(EditProductForm)
