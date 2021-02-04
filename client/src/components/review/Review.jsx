import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import {getReviews} from '../../redux/reviewsReducer/actionsReviews'

const Review = (props) => {
    const isLogged = useSelector((state) => state.loginReducer.isLogged);
    const allReviews = useSelector((state) => state.reviewsReducer.reviews)
    const dispatch = useDispatch()
    const {id} = props
    
    useEffect(() => {
        dispatch(getReviews(id))
    }, [])
    
    
    const reviewsMenu = () => {
        if (isLogged) {
            return (
                <div>IS LOGGED
                    <form>
                    <input></input>
                    <button>Postear Review</button>
                    </form>
                </div>
                );
            } else {
                return (
                    <div>NOT LOGGED</div>
                    );
                }
            };
            
            return (
                <div>
        <div>
            <h5>Review Component</h5>
        <h1>
            {reviewsMenu()}
            </h1>
            
        </div>
           {allReviews && allReviews.map(((review, index) => {
               return (<div key={index}>
                       <div>Rating: {review.rating}</div>
                       <div>Comentario: "{review.description}"</div>
                      </div>)
                        }))
                    }
                        
        <div>
            
             </div>
        </div>
    )
}

export default Review