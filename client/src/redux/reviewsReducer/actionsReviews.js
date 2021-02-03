import axios from "axios";
export const POST_REVIEW = 'POST_REVIEW'
// export const EDIT_REVIEW = 'EDIT_REVIEW'
// export const GET_REVIEWS = 'GET_REVIEWS'
// export const DELETE_REVIEW = 'DELETE_REVIEW'

export const postReview = (productId, userId, rating, description) => (
  dispatch
) => {
  axios
    .post(`http://localhost:3001/reviews/${productId}/${userId}/`, {
      rating,
      description,
    })
    .then((review) => {
      dispatch({
        type: POST_REVIEW,
        payload: review,
      });
    //   dispatch(getReviewsById(userId));
    })
    .catch((err) => console.log(err));
};

// export const editReview = (reviewData) => {
//     return (dispatch) => {

//         }
// }

// export const getReviews = (idProduct) => {
//     return (dispatch) => {
        
//     }
// }

// export const deleteReview = (data) => {
//     return (dispatch) => {

//         }
// }