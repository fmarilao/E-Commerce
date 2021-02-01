/* eslint-disable */
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, increaseProduct, decreaseProduct } from '../../redux/cartReducer/action.js';
import { Grid } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
    input: {
      height: 40,
      width: 40,
      textAlign: "center"
    },
    margin: {
        margin: theme.spacing(1),
      },
      media: {
        height: 100,
        width: 100

      },
  }));

const CartDetail = (props) => {
    //const classes = useStyles();
    const dispatch = useDispatch();
    const reduxProducts = useSelector(state => state.cartReducer.cart)
    const {product, setCart, counter} = props
    const [image, setImage] = useState("")
    const [storageCounter, setStorageCounter] = useState(counter || 1)
    const [reduxProd, setReduxProd] = useState({})
    //const [productCart, setProductCart] = useState(product)
    const classes = useStyles();

    const numberFormat = (value) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'ARS',
        currencyDisplay: 'symbol'
    }).format(value);
   
    useEffect(() => {
      axios.get(`/dashboard/image/${product.id}`).then(res => {
        res.data.length && res.data[0].images.length && setImage(res.data[0].images[0].url)
      })

      for(let item of reduxProducts){
        if(item.id === product.id){
          setReduxProd(item)
        }
      }
    }, [])

    const handleAdd = () => {
      dispatch(increaseProduct(product))
      let i = storageCounter
      i++
      setStorageCounter(i)
    }

    const handleRemove = () => {
      dispatch(decreaseProduct(product))
      if(storageCounter > 1) {
        let i = storageCounter
        i--
        setStorageCounter(i)
      }
    }
  
return (
  <>
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <CardMedia
              component="img"
              alt="ProductCard"
              className={classes.media}
              src={image}
              title="ProductCard"
            />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <ListItemText
                  primary={product.name}
                  secondary={numberFormat(product.price)}
                />
                <button onClick={handleRemove}>-</button>

                <button onClick={handleAdd}>+</button>
                <p></p>
                <span>
                  {' '}
                  {counter ? storageCounter : reduxProd.localCounter}
                </span>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                onClick={() => {
                  dispatch(removeItem(product));
                  setCart && setCart(JSON.parse(localStorage.getItem('cart')));
                }}
                variant="body2"
                style={{ cursor: 'pointer' }}
              >
                <DeleteForeverIcon />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  </>
);
}

export default CartDetail