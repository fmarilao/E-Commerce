import { Avatar, Card, CardActionArea, CardContent, Grid, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import {getReviews} from '../../redux/reviewsReducer/actionsReviews'
import { makeStyles } from '@material-ui/core/styles';
import UserRating from "./UserRating";
import TotalReviews from "./totalReviews";

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
    marginLeft: theme.spacing(10),
  },
  author: {
    marginTop: theme.spacing(1),
  },
  rating: {
    marginleft: theme.spacing(8),
  },
}));

const Review = (props) => {
    // const isLogged = useSelector((state) => state.loginReducer.isLogged);
    const allReviews = useSelector((state) => state.reviewsReducer.reviews)
    const dispatch = useDispatch()
    const classes = useStyles()
    const {id} = props // id de Producto
    let totalReviews = []
    
    useEffect(() => {
      dispatch(getReviews(id));
      //eslint-disable-next-line
    }, [])
           
    // console.log('TOTAL REVIEWS', totalReviews);
    return (
      <Grid>
        <TotalReviews totalReviews={totalReviews} />
        <Grid item container xs={12}>
          {allReviews &&
            allReviews.map((review, index) => {
              totalReviews.push(review.rating);
              return (
                <Grid className={classes.padding} key={index}>
                  <Grid item container xs={12}>
                    <Card>
                      <CardActionArea>
                        <Avatar
                          className={classes.avatar}
                          alt="AvatarIMG"
                          src={review.profileImg}
                        />
                        <Typography
                          className={classes.author}
                          variant="body2"
                          color="textSecondary"
                          component="p"
                          align="center"
                        >
                          {review.author}
                        </Typography>
                        <CardContent>
                          <UserRating
                            rating={review.rating}
                            className={classes.rating}
                          />
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            align="center"
                          >
                            {review.description}
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