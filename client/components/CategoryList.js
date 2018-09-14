import React from 'react'
import {connect} from 'react-redux'
import {List, Checkbox} from 'semantic-ui-react'

import {getCategories, toggleCategory} from '../store/category'

class CategoryList extends React.Component {
  componentDidMount() {
    this.props.getCategories()
  }

  render() {
    const categories = this.props.categories
    return (
      <div>
        <h2>Categories</h2>
        <span>
          <List>
            {categories ? (
              categories.map(category => {
                return (
                  <List.Item key={category.id}>
                    <Checkbox label={category.name} />
                  </List.Item>
                )
              })
            ) : (
              <p>nothing</p>
            )}
          </List>
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
    toggleCategory: categoryId => dispatch(toggleCategory(categoryId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList)
