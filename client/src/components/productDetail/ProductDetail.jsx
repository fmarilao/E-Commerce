import { Box, Button, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton } from "react-share";
import { addItem } from '../../redux/cartReducer/action.js';
import { postWish } from '../../redux/wishReducer/actionsWish.js';
import TotalReviews from '../review/totalReviews.jsx';

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
  button: {
    padding: theme.spacing(1),
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

  const shareUrl = 'https://www.soyhenry.com/';
  const title = 'Proyecto E-Commerce | Clotheny Shop ';

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
            className={classes.button}
            startIcon={<FavoriteIcon />}
            color="secondary"
            onClick={() => dispatch(postWish(data))}
          >
            Add to WishList
          </Button>
          <Button
            className={classes.button}
            startIcon={<LocalMallIcon />}
            color="secondary"
            onClick={() => dispatch(addItem(products))}
          >
            Add to Cart
          </Button>
          <br></br>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl} className="Demo__some-network__share-button">
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </Grid>
      </Box>
    </>
  );
}
