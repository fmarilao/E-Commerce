import {
  Box,
  Button,
  CardMedia,
  Grid,
  Modal,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItem } from '../../redux/cartReducer/action.js';
import Review from '../review/Review.jsx';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TotalReviews from '../review/totalReviews.jsx';
import UserReview from '../review/UserReview.jsx';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { postWish } from '../../redux/wishReducer/actionsWish.js';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'none',
    marginTop: 10,
  },
  media: {
    MaxHeight: 300,
    maxWidth: 300,
  },
  info: {
    padding: theme.spacing(5),
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function ProductDetail(props) {
  const dispatch = useDispatch();
  // const { product, image } = props.location.state;
  const classes = useStyles();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const userId = localStorage.getItem('userId');
  const data = { productId: id, userId: userId };
  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'ARS',
      currencyDisplay: 'symbol',
    }).format(value);

  useEffect(() => {
    axios.get(`/products/${parseInt(id)}`).then((res) => {
      setProducts(res.data);
    });
    axios.get(`/dashboard/image/${id}`).then((res) => {
      setImages(res.data[0].images[0].url);
    });
    // eslint-disable-next-line
  }, []);

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Give us your feedback</h2>
      <p id="simple-modal-description">Please write a comment</p>
      <UserReview />
      <Button onClick={handleClose} type="button" color="secondary">
        Cancel
      </Button>
    </div>
  );

  return (
    <>
      <Box className={classes.root}>
        {/* Foto del producto */}
        <CardMedia
          component="img"
          alt="ProductCard"
          src={images.length ? images : ''}
          title="ProductCard"
          className={classes.media}
        />
        {/* Info del Producto   */}
        <Grid item className={classes.info}>
          <Typography
            className={classes.fonts}
            gutterBottom
            variant="h5"
            display="block"
          >
            {products.name}
          </Typography>
          {/* Renderizacion Promedio de Reviews */}
          <TotalReviews />
          <Typography variant="h6" className={classes.fonts}>
            {numberFormat(products.price)}
          </Typography>
          <Typography className={classes.fonts}>
            {products.description}
          </Typography>
          <Typography className={classes.fonts}>
            Stock:{products.stock}
          </Typography>
          <Button
            className={classes.info}
            startIcon={<LocalMallIcon />}
            color="secondary"
            onClick={() => dispatch(addItem(products))}
          >
            Add to Cart
          </Button>
          <Button
            startIcon={<FavoriteBorderIcon />}
            color="secondary"
            onClick={() => dispatch(postWish(data))}
          >
            Add to WishList
          </Button>
        </Grid>
      </Box>
      {/* Componente Reviews del Producto */}
      <Grid item xs={12}>
        <Review id={id} />
      </Grid>
      <Grid className={classes.root}></Grid>
      <Box className={classes.root}>
        <Button
          startIcon={<RateReviewIcon />}
          type="button"
          color="secondary"
          onClick={handleOpen}
        >
          Write a review
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </Box>
    </>
  );
}
