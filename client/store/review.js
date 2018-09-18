import axios from 'axios'

export const ADDED_REVIEW = 'ADDED_REVIEW'

const addedReview = review => ({type: ADDED_REVIEW, review})

export const addReview = review => {
  return async dispatch => {
    try {
      await axios.post('/api/reviews', review)
      dispatch(addedReview(review))
    } catch (err) {
      console.error(err)
    }
  }
}

// export const reviewReducer = (state = {}, action) => {
//   switch (action.type) {
//     case ADDED_REVIEW:
//       return action.review
//     default:
//       return state
//   }
// }
