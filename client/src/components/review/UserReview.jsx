import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, Divider, Input } from '@material-ui/core';
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
     
  //Renderiza solo cuando completo la orden
  const handleSubmit = (e) => {
    let data = {id, userId, rating, description}
    e.preventDefault();
    dispatch(postReview(data));
    window.location.reload() 
    return history.push(`/product/${id}`);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      justifyContent: 'center',
      boxShadow: "none",
      padding: theme.spacing(5),
    },
  }));
  
  const classes = useStyles();
  
  ///////////////////////////////////////////////////////////////////////////////////
  //buscar las ordenes de ese uruario que esten en completadas 
  //filtrar las orderLine dentro de esas ordenes con review false
  //renderizar el componente para dejar review (UserReview) solo en caso que sea false
  //sino renderizar que no tiene reviews para dejar
  ///////////////////////////////////////////////////////////////////////////////////

  return (
    <div>
      <Box className={classes.root}>      
        <Typography component="legend">Send us your review</Typography>
        <Rating
          name="simple-controlled"
          onChange={(event, newValue) => {
            setRating(newValue);
          }}
        />        
              <form onSubmit={handleSubmit}>
              <Input onChange={(e) => setDescription(e.target.value)} />
              <Divider />
              <Button variant="contained" color="primary" type='submit' >
                Send
              </Button>
              </form>      
      </Box>
    </div>
  );
}
export default UserReviews