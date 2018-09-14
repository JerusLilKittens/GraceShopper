import axios from 'axios'

const ADDED_REVIEW = 'ADDED-REVIEW'

const addedReview = review => ({ type: ADDED_REVIEW, review })

export const addReview = review => {
  return async dispatch => {
    try {
      await axios.post('/api/reviews')
      dispatch(addedReview(review))
    } catch (err) {
      console.error(err)
    }
  }
}

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case ADDED_REVIEW:
      return action.review
    default:
      return state
  }
}
