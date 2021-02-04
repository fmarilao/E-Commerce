import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, Divider, Grid, Input } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { postReview } from '../../redux/reviewsReducer/actionsReviews';
import { useParams } from 'react-router-dom';

const UserReviews = () => {
  const [description, setDescription] = useState('');
  const [stars, setStars] = useState(3);
  const dispatch = useDispatch();
  const { id } = useParams();
  const userID = localStorage.getItem('userId');

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(postReview());
      //productId, userId, rating, description
  };

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Send us your Review</Typography>
        <Rating
          name="simple-controlled"
          onChange={(event, newValue) => {
            setStars(newValue);
          }}
        />
        <Grid>
                     <form onSubmit={handleSubmit}>
                     <Input onChange={(e) => setDescription(e.target.value)} />
                     <Divider />
                     <Button variant="contained" color="primary" href="#contained-buttons">
                        Send
                      </Button>
                     </form>
 
            </Grid>
      </Box>
    </div>
  );
}
export default UserReviews