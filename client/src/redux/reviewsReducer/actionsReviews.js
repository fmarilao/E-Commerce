import axios from "axios";
export const POST_REVIEW = 'POST_REVIEW'
export const EDIT_REVIEW = 'EDIT_REVIEW'
// export const GET_REVIEWS = 'GET_REVIEWS'
// export const DELETE_REVIEW = 'DELETE_REVIEW'

const isLogged = localStorage.getItem('token') ? true : false;

export const postReview = (productId, userId, rating, description) => (
  dispatch
) => {
  if(isLogged){
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
  }
  // else{ DISPACHEAR QUE NO ESTA LOGUEADO
  // }
};

export const editReview = (productId, idReview, rating, description) => (
  dispatch
) => {
  if(isLogged){
    axios
      .put(`http://localhost:3001/reviews/${productId}/${idReview}/`, {
        rating,
        description,
      })
      .then((review) => {
        dispatch({
          type: EDIT_REVIEW,
          payload: review,
        })
      })
      .catch((err) => console.log(err))
  }
    // else{ DISPACHEAR QUE NO ESTA LOGUEADO
  // }
  //VER TAMBIEN QUE HACE EL REDUCER EN ESTE CASO
}

