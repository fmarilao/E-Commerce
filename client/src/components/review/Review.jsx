import { Avatar, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import {getReviews} from '../../redux/reviewsReducer/actionsReviews'
import { makeStyles } from '@material-ui/core/styles';
import img from "../../assets/img/jose.jpg"
import UserRating from "./UserRating";



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    direction: 'row',
  },
  media: {
    height: 140,
  },
  padding: {
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(3),
  },
  avatar: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(11),
  },
  rating:{
      marginLeft: theme.spacing(11)
  }
}));

const Review = (props) => {
    // const isLogged = useSelector((state) => state.loginReducer.isLogged);
    const allReviews = useSelector((state) => state.reviewsReducer.reviews)
    const dispatch = useDispatch()
    const classes = useStyles();
    const {id} = props
    
    useEffect(() => {
      dispatch(getReviews(id));
      //eslint-disable-next-line
    }, [])
   

            
    return (
    <Grid>
        <Grid item container xs={12}>
            {allReviews &&
            allReviews.map((review, index) => {
                return (
                  <Grid className={classes.padding} key={index}>
                    <Grid item container xs={12}>
                      <Card>
                        <CardActionArea>
                          <Avatar
                            className={classes.avatar}
                            alt="Facu"
                            src={img}
                          />
                          <UserRating className={classes.rating} />
                          <CardContent>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Description: {review.description}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="textSecondary"
                              component="p"
                            >
                              Author: {review.author}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  </Grid>
                );
            })}
        </Grid>
    </Grid>
  );
}


export default Review