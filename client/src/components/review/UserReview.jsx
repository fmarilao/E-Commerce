import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, Divider, Grid, Input } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { postReview } from '../../redux/reviewsReducer/actionsReviews';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const UserReviews = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(3);
  const userId = localStorage.getItem('userId');
  
  let data = {id, userId, rating, description}
  console.log('DATA', data);
  
  //Renderiza solo cuando completo la orden
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postReview(data));
    //productId, userId, rating, description
    return history.push(`/products/${id}`);
  };
  
  const useStyles = makeStyles((theme) => ({
    root: {
      justifyContent: 'center',
      boxShadow: "none",
      padding: theme.spacing(5),
    },
  }));
  
  const classes = useStyles();
  
  return (
    <div>
      <Box className={classes.root}>      
        <Typography component="legend">Send us your review</Typography>
        <Rating
          name="simple-controlled"
          onChangeText={(event, newValue) => {
            setRating(newValue);
          }}
        />        
              <form onSubmit={handleSubmit}>
              <Input onChangeText={(e) => setDescription(e.target.value)} />
              <Divider />
              <Button variant="contained" color="primary">
                Send
              </Button>
              </form>      
      </Box>
    </div>
  );
}
export default UserReviews