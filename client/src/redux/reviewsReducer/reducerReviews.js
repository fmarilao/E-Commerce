import {
POST_REVIEW, SET_REVIEW, EDIT_REVIEW, GET_REVIEWS, DELETE_REVIEW,} from './actionsReviews.js'

const initialState = {
    review: {},
    reviews: []
}

const reducerReviews = (state = initialState, action) => {

    switch (action.type) {
      case POST_REVIEW:
        return {};
      case SET_REVIEW:
        return {};
      case EDIT_REVIEW:
        return {};
      case GET_REVIEWS:
        return {};
      case DELETE_REVIEW:
        return {};

      default:
        return state;
    }
}

export default reducerReviews;