import React, { useState, useRef } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, Divider, FormControlLabel, Input, TextField } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { postReview } from '../../redux/reviewsReducer/actionsReviews';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    justifyContent: 'center',
    boxShadow: "none",
    padding: theme.spacing(5),
  },
}));

const UserReviews = ({props}) => {
  const classes = useStyles();
  const inputEl = useRef(null)
  const {id} = props;
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const userId = localStorage.getItem('userId');
     
  //Renderiza solo cuando completo la orden
  const handleSubmit = (e) => {
    console.log("entre al handle")
    let data = {id, userId, rating, description}
    e.preventDefault();
    dispatch(postReview(data));
  };

  const handleRating = (value) =>{
    console.log(inputEl.current.value)
    setRating(value)
  }

  const handleDescription = (value) => {
    setDescription(value)
  }
  
  

  console.log(rating)
  
  ///////////////////////////////////////////////////////////////////////////////////
  //buscar las ordenes de ese uruario que esten en completadas 
  //filtrar las orderLine dentro de esas ordenes con review false
  //renderizar el componente para dejar review (UserReview) solo en caso que sea false
  //sino renderizar que no tiene reviews para dejar
  ///////////////////////////////////////////////////////////////////////////////////

  return (
    <Box className={classes.root}> 
        <form onSubmit={handleSubmit} noValidate name="simple-controlled">
          <Typography component="legend">Send us your review</Typography>
          <FormControlLabel
            control={
              <>
                <input
                  ref={inputEl}
                  name="rating"
                  type="number"
                  value={rating}
                  hidden
                  readOnly
                />
                <Rating
                  name="simple-controlled"
                  ref={inputEl.current}
                  value={rating}
                  onChange={(event, newValue) => handleRating(newValue)}
                />  
              </>
            }
          >
          </FormControlLabel>
          <TextField 
              id="standard-basic" 
              label="Review" 
              value={description} 
              onChange={(e) => handleDescription(e.target.value)}
            />
            <Divider />
            <Button variant="contained" color="primary" type='submit' >
                Send
            </Button>
          </form>      
    </Box>
  );
}
export default UserReviews