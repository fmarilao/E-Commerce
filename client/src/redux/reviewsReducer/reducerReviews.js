import {
POST_REVIEW, EDIT_REVIEW, GET_REVIEWS, DELETE_REVIEW,} from './actionsReviews.js'

const initialState = {
    reviews: []
}

const reducerReviews = (state = initialState, action) => {
  if (action.type === POST_REVIEW) {
    return {
      ...state,
      reviews: action.payload
    }
  }
  if (action.type === EDIT_REVIEW) {
    return {
      ...state,
      reviews: action.payload
    }
  }
  return state;
};

export default reducerReviews;