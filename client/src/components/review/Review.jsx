// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getReviews, setReview } from '../../redux/reviewsReducer/';
// import axios from 'axios';

// const Review = (props) => {
//     const dispatch = useDispatch()
//     const review = useSelector(state => state.reviewsReducer.review)
//     const reviews = useSelector(state => state.reviewsReducer.reviews)
//     const product = useSelector(state => state.productsReducer.product)

//     useEffect(() => {
//         dispatch(getReviews(product.idProduct))
//         return dispatch(setReview(reviews[getRandom(reviews.length)]))
//     }, [])

//     return (
//         <div>
//             <h5>Review Component</h5>
//         </div>
//     )
// }

// export default Review