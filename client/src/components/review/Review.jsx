import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import {getReviews} from '../../redux/reviewsReducer/actionsReviews'
import ReviewCard from "./ReviewCard";
import { makeStyles } from '@material-ui/core/styles';
import UserReviews from "./UserReview";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    direction:"row"
  },
  media: {
    height: 140,
  },
    padding: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3)
    },
}))

const Review = (props) => {
    const isLogged = useSelector((state) => state.loginReducer.isLogged);
    const allReviews = useSelector((state) => state.reviewsReducer.reviews)
    const dispatch = useDispatch()
    const classes = useStyles();
    const {id} = props
    
    useEffect(() => {
        dispatch(getReviews(id))
        // eslint-disable-next-line
    }, [])
   

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
        <Grid>
            <UserReviews />
            <Grid item container xs={12}>
           {allReviews && allReviews.map(((review, index) =>{
                 return (
                     <Grid className={classes.padding} key={index}>
                        <Grid item container xs={12} >
                                <Card>
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
                                    <Button variant="contained" color="primary">
                                    Delete
                                    </Button>
                                    </CardContent>
                                </CardActionArea>
                                </Card>
                        </Grid>
                        </Grid>
                    );
            }))
          }
          </Grid>
        </Grid>
    )
}


export default Review