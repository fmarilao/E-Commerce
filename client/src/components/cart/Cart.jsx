import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CartDetail from './CartDetail';

const useStyles = makeStyles((theme) => ({
  container:{
    position: "relative",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(5),
  },
  paper: {
    borderRadius: "20px",
    width: "100%",
    minHeight: "200px",
    padding: theme.spacing(1),
  },
  title: {
    letterSpacing: "3px",
    fontFamily: "Barlow",
    display: 'block',
    fontWeight: "bold",
  },
  list:{
    flexGrow: 1,
    width: "100%"
  }
}));

const Cart = () => {
    const classes = useStyles();
    const [cart, setCart] = useState([])
    const reduxCart = useSelector((state) => state.cartReducer.cart);
    const user = useSelector((state) => state.loginReducer.user);

    useEffect(() => {
        let localCart = JSON.parse(localStorage.getItem('cart'))
        if(user.hasOwnProperty("email")){
            setCart(reduxCart)
        }
        else{
            localCart && setCart(localCart)
        }
    }, [reduxCart])
  
/*     {cart && cart.map((element, i) => {
      return (<CartDetail product={element} count={count} setCount={setCount} key={i}/>)
})}  */

  return (
      <Grid className={classes.container} container direction="column">
        <Grid item container>
          <Grid item xs={false} sm={2}></Grid>
          <Grid item container xs={12} sm={8}>
              <Paper elevation={5} className={classes.paper}>
                <Grid item container xs={12}>
                  <Typography className={classes.title} variant="h4" noWrap>
                      CARRITO
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
                            reduxCart.length ? <CartDetail product={element} key={i}/> : <CartDetail product={element} key={i} counter={element.localCounter} setCart={setCart}/>
                          )})}
                      </List>
                      </Grid>
                  </Grid>
              </Paper>
          </Grid>
          <Grid item xs={false} sm={2}></Grid>
        </Grid>
      </Grid>
    )
}

export default Cart;