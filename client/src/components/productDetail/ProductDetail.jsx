import { Box, Button, CardMedia, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItem } from '../../redux/cartReducer/action.js';
import Review from '../review/Review.jsx';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TotalReviews from '../review/totalReviews.jsx';
import UserReview from '../review/UserReview.jsx'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    boxShadow: "none",
    marginTop: 10,
  },
  media: {
    MaxHeight: 300,
    maxWidth: 300,
  },
  info: {
       padding: theme.spacing(5),
  }
}));

export default function ProductDetail (props) {
  const dispatch = useDispatch();
  // const { product, image } = props.location.state;
  const classes = useStyles();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([])
  const numberFormat = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "ARS",
      currencyDisplay: "symbol",
    }).format(value);

  useEffect(() => {
    axios.get(`/products/${parseInt(id)}`).then(res => {
      setProducts(res.data)
    })
    axios.get(`/dashboard/image/${id}`).then(res => {
      setImages(res.data[0].images[0].url)})
      // eslint-disable-next-line
    }, [])

    return (
    <>
          <Box className={classes.root} >
                {/* Foto del producto */}
                <CardMedia
                    component="img"
                    alt="ProductCard"
                    src={images.length ? images : ""}
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
                        <Typography variant="h6" className={classes.fonts}>{numberFormat(products.price)}</Typography>
                        <Typography className={classes.fonts}>{products.description}</Typography>
                        <Typography className={classes.fonts}>Stock:{products.stock}</Typography>
                        <Button
                            className={classes.info}
                            startIcon={<LocalMallIcon />}
                            color='secondary'
                            onClick={() => dispatch(addItem(products))}
                        >Add to Cart
                        </Button>
                        <Button
                            startIcon={<FavoriteBorderIcon />}
                            color='secondary'
                            // onClick={() => dispatch(addFavorite(products))}
                        >Add to WishList
                        </Button>
                     </Grid>
           </Box>
          {/* Componente Reviews del Producto */}
           <Grid item xs={12}>
               <Review id={id}/>
           </Grid>
           <Grid className={classes.root}>
               <UserReview />           
           </Grid>
    </>
  );
}