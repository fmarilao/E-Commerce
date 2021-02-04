import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import {getReviews} from '../../redux/reviewsReducer/actionsReviews'

const Review = (props) => {
    const allReviews = useSelector((state) => state.reviewsReducer.reviews)
    const dispatch = useDispatch()
    const {id} = props
    
    useEffect(() => {
        dispatch(getReviews(id))
    }, [])
    
    return (
        <div>
        <div>
            <h5>Review Component</h5>
        </div>
           {allReviews && allReviews.map(((review, index) => {
               return (<div key={index}>
                       <div>Rating: {review.rating}</div>
                       <div>Comentario: "{review.description}"</div>
                      </div>)
                        }))
                        }
        </div>
    )
}

export default Review