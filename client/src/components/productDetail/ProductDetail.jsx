import { Box, Button, Card, CardMedia, Grid, Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addItem } from '../../redux/cartReducer/action.js';

const useStyles = makeStyles((theme) => ({
    media: {
        height: 400,
    },
    cards: {
        border: "none",
        boxShadow: "none",
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(20),
        marginRight: theme.spacing(10)
    },
    fonts: {
        fontFamily: "unset",
        //marginLeft: "10px"
        marginBottom: theme.spacing(4)
    },
    desc: {
      marginTop: theme.spacing(5)
    }
  
}))

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
        <Grid item container direction="row" justify="space-evenly" alignItems="center">
           <Grid item container spacing={5} xs={12} sm={12}>
                      <Grid item sm={5}>
                          <Card className={classes.cards}>
                              <CardActionArea>
                                  <CardMedia className={classes.media} image={images} />
                              </CardActionArea>
                          </Card>
                      </Grid>
                       <Grid item xs={12} sm={5}>
                          <Card className={classes.cards} variant="outlined">
                                {/* Titulo & precio */}
                                <Typography
                                  className={classes.fonts}
                                  gutterBottom
                                  variant="h5"
                                  display="block"
                                >
                                {products.name}
                                </Typography>
                                <Typography variant="h6" className={classes.fonts}>
                                {numberFormat(products.price)}
                                </Typography>
                                {/* Box Button */}
                            <Typography
                                  className={classes.fonts}
                                  variant="p"
                                >
                            {products.description}
                                </Typography>
                                <Box m={1} mt={10}>
                                        <Button
                                          startIcon={<AddShoppingCartIcon />}
                                          variant="contained"
                                          color='primary'
                                          onClick={() => dispatch(addItem(products))}
                                        >
                                          Add to Cart
                                        </Button>
                                </Box>
              </Card>
            </Grid>
          </Grid>
          </Grid>



    </>
  );
}