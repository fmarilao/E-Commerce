import React, {useState, useEffect} from "react";
import { Grid, Box,  Card,  Typography, Button, Divider, CardContent, CardActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {CardMedia } from "@material-ui/core";
import CardActionArea from '@material-ui/core/CardActionArea';
import axios from 'axios';
import {useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/cartReducer/action.js'

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
      <Grid container direction="column">
        <Grid
          item
          container
          direction="row"
          justify="space-evenly"
          alignItems="center"
        >
          <Grid item container spacing={5} xs={12} sm={12}>
            <Grid item sm={5}>
              <Card className={classes.cards}>
                <CardActionArea>
                  <CardMedia className={classes.media} image={images} />
                </CardActionArea>
              </Card>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={12} sm={5}>
              <Card className={classes.cards} variant="outlined">
                {/* Titulo precio y rank */}
                <Typography
                  className={classes.fonts}
                  gutterBottom
                  variant="h3"
                  display="block"
                >
                  {products.name}
                </Typography>
                <Typography variant="h2" className={classes.fonts}>
                  {numberFormat(products.price)}
                </Typography>
                {/* Titulo precio y rank */}
                {/* Box Button */}
                <Box m={1} mt={10}>
                  <Button
                    fullWidth
                    startIcon={<AddShoppingCartIcon />}
                    variant="contained"
                    onClick={() => dispatch(addItem(products))}
                  >
                    ADD TO CART
                  </Button>
                </Box>
                {/* Box Button */}
                <Divider variant="middle" />
                <Typography>Description</Typography>
                <Card className={classes.cards}>{products.description}</Card>
              </Card>
            </Grid>
          </Grid>
          {/* /////////////////////////////////////// */}
          <Grid item xs={12} sm={10} className={classes.desc}>
            {" "}
            {/* <Typography>Descripcion</Typography>
              {products.description} */}
            <Card variant="outlined">
              <CardContent>
                <CardActions>
                  <Button>Descripcion</Button>
                  <Button disabled>Reviews</Button>
                </CardActions>
                <Typography variant="h5" component="h2">
                  {products.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          {/* /////////////////////////////////////// */}
        </Grid>
        <Grid />
      </Grid>
    </>
  );
}