import axios from 'axios'

const GOT_CATEGORIES = 'GOT_CATEGORIES'
const SELECT_CATEGORY = 'SELECT_CATEGORY'

const gotCategories = categories => ({
  type: GOT_CATEGORIES,
  categories
})
export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  category
})

export const getCategories = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/categories')
      dispatch(gotCategories(data))
    } catch (err) {
      console.error(err)
    }
  }
}


export const categoriesReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

export const selectedCategory = (state = {}, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}
