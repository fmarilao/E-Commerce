import Button from '@material-ui/core/Button';
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartState, totalPrice } from '../../redux/cartReducer/action.js';
import CartDetail from './CartDetail';

const useStyles = makeStyles((theme) => ({
  container:{
    position: "relative",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(5),
  },
  paper: {
    borderRadius: "0px",
    width: "100%",
    minHeight: "200px",
    padding: theme.spacing(1),
  },
  title: {
    letterSpacing: "1px",
    fontFamily: "Barlow",
    display: 'block',
  },
  list:{
    flexGrow: 1,
    width: "100%"
  }
}));

const Cart = (props) => {
    const classes = useStyles();
    const [cart, setCart] = useState([])
    const dispatch = useDispatch();
    const reduxCart = useSelector((state) => state.cartReducer.cart);
    const totalPriceState = useSelector((state) => state.cartReducer.totalPrice)
    const user = useSelector((state) => state.loginReducer.isLogged);
    const [price, setPrice] = useState(0) // localstorage

    const getTotalPrice = (cart) => {
      if(cart && cart.length){
        let price = 0
        cart.forEach(item => {
          price += (item.price * item.localCounter)
        })
        setPrice(price);
      }
    }

    useEffect(() => {
        let localCart = JSON.parse(localStorage.getItem('cart'))
        if(user){
          // zaba sobame la quena
          // gato refugiado
          // una pija passport
            dispatch(totalPrice())
            setCart(reduxCart)
        }
        else{
            localCart && setCart(localCart)
            getTotalPrice(localCart)
        }
      // eslint-disable-next-line
    }, [reduxCart])
  
    const numberFormat = (value) => new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'ARS',
      currencyDisplay: 'symbol'
    }).format(value);


    const handleCheckout = (cart,state, totalPriceState) => {
      if(user){
        dispatch(setCartState(cart, state, totalPriceState))
      }
      else{alert("Primero tienes que logearte")}
    }
  return (
      <Grid className={classes.container} container direction="column">
        <Grid item container>
          <Grid item xs={false} sm={2}></Grid>
          <Grid item container xs={12} sm={8}>
            <Paper elevation={5} className={classes.paper}>
                <Grid item container xs={12}>
                  <Typography className={classes.title} variant="h5" noWrap>
                      Cart
                  </Typography>
                </Grid>
                <Grid item>
                  <Divider></Divider>
                </Grid>
                <Grid item container xs={12}>
                    <Grid item container xs={12}>
                      <List className={classes.list}>
                        {cart && cart.map((element, i) => {
                          return (                                        
                            reduxCart.length ? <CartDetail product={element} key={i}/> : <CartDetail setPrice={setPrice} price={price} product={element} key={i} counter={element.localCounter} setCart={setCart}/>
                          )})}
                      </List>
                    </Grid>
                </Grid>
                <Grid container item  xs={12} direction="row" spacing={5} justify={"flex-end"}>
                  <Grid item>
                    <Typography variant="h5">
                      {user ? numberFormat(totalPriceState) :  numberFormat(price)}
                    </Typography>
                  </Grid>
                  <Grid item >
                      <Button variant="outlined" color="secondary" onClick={() => handleCheckout(reduxCart,'created', totalPriceState)}>
                        Check Out
                      </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          <Grid item xs={false} sm={2}></Grid>
        </Grid>
        <Grid item xs={false} sm={2}></Grid>
      </Grid>
  );
}

export default Cart;