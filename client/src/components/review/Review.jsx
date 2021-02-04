import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import {getReviews} from '../../redux/reviewsReducer/actionsReviews'
import ReviewCard from "./ReviewCard";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const Review = (props) => {
    const isLogged = useSelector((state) => state.loginReducer.isLogged);
    const allReviews = useSelector((state) => state.reviewsReducer.reviews)
    const dispatch = useDispatch()
      const classes = useStyles();
    const {id} = props
    
    useEffect(() => {
        dispatch(getReviews(id))
    }, [])
    
    setTimeout(() => {
        
        console.log(allReviews);
    }, 2000);
    

    // const reviewsMenu = () => {
    //     if (isLogged) {
    //         return (
    //             <Grid>
    //             <div>IS LOGGED
    //                 <form>
    //                 <input></input>
    //                 <button>Postear Review</button>
    //                 </form>
    //             </div>
    //             </Grid>
    //             );
    //         } else {
    //             return (
    //                 <div>NOT LOGGED</div>
    //                 );
    //             }
    //         };
            
            return (
        //         <div>
        // <div>
        // <h1>
        //     {reviewsMenu()}
        //     </h1>
        // </div>
                <div>
           {allReviews && allReviews.map(((review, index) =>{
                 return (
                        <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="User Avatar"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                componente stars
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Author: {review.author}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {review.description}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                    );
            }))
          }
         </div>
    )
}


export default Review