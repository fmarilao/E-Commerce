import { Button, Card, CardMedia, Grid, Paper, Typography } from '@material-ui/core';
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // media: {
  //   paddingTop: '56.25%', // 16:9
  // },
  paper: {
    padding: theme.spacing(5),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: "none",
  },
    paperPicture: {
    padding: theme.spacing(2),
    MaxHeight: 200,
    maxWidth: 200,
    boxShadow: "none",
  },
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
      <Grid container spacing={0}>
            <Grid item container xs={12} >
                    <Grid item xs={3}>
                        <Paper className={classes.paperPicture}>
                            <CardMedia
                                component="img"
                                alt="ProductCard"
                                src={images.length ? images : ""}
                                title="ProductCard"        
                              />
                        </Paper>
                    </Grid>
                    <Grid item xs={9}>
                      <Paper className={classes.paper}>
                        <Typography
                            className={classes.fonts}
                            gutterBottom
                            variant="h5"
                            display="block"
                            >
                            {products.name}
                            </Typography>
                            <TotalReviews />
                            <Typography variant="h6" className={classes.fonts}>{numberFormat(products.price)}</Typography>
                            <Typography className={classes.fonts}>{products.description}</Typography>
                            <Typography className={classes.fonts}>Stock:{products.stock}</Typography>
                            <Button
                                startIcon={<LocalMallIcon />}
                                color='secondary'
                                onClick={() => dispatch(addItem(products))}
                            >
                                Add to Cart
                            </Button>
                            <Button
                                startIcon={<FavoriteBorderIcon />}
                                color='secondary'
                                // onClick={() => dispatch(addFavorite(products))}
                            >
                                Add to WishList
                            </Button>
                      </Paper>
                    </Grid>
              </Grid>


        <Grid item xs={12}>
          <Paper className={classes.paper}>
             <Review id={id}/>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}