import React from 'react'
import {connect} from 'react-redux'
import {Menu} from 'semantic-ui-react'

import {getCategories, selectCategory} from '../store/category'
import {getProductsByCategory, getProducts} from '../store/product'

class CategoryList extends React.Component {
  componentDidMount() {
    this.props.getCategories()
  }

  handleItemClick = (event, {name, category}) => {
    if (name === 'all') {
      this.setState({activeItem: name})
      this.props.getProducts()
    } else {
      this.setState({activeItem: name})
      this.props.selectCategory(category)
      this.props.getProductsByCategory(category.id)
    }
  }

  state = {activeItem: 'all'}

  render() {
    const {activeItem} = this.state
    const categories = this.props.categories
    return (
      <div>
        <h2>Categories</h2>
        <span>
          <Menu secondary vertical>
            <Menu.Item
              key="0"
              name="all"
              active={activeItem === 'all'}
              onClick={this.handleItemClick}
            />
            {categories ? (
              categories.map(category => {
                return (
                  <Menu.Item
                    key={category.id}
                    name={category.name}
                    category={category}
                    active={activeItem === category.name}
                    onClick={this.handleItemClick}
                  />
                )
              })
            ) : (
              <p>loading</p>
            )}
          </Menu>
        </span>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCategories: () => dispatch(getCategories()),
    selectCategory: category => dispatch(selectCategory(category)),
    getProductsByCategory: id => dispatch(getProductsByCategory(id)),
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
