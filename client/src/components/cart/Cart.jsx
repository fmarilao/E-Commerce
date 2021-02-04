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

const Cart = () => {
    const classes = useStyles();
    const [cart, setCart] = useState([])
    const reduxCart = useSelector((state) => state.cartReducer.cart);
    const user = useSelector((state) => state.loginReducer.isLogged);

    useEffect(() => {
        let localCart = JSON.parse(localStorage.getItem('cart'))
        if(user){
            //setTimeout(() => setCart(reduxCart), 200)
            setCart(reduxCart)
        }
        else{
            localCart && setCart(localCart)
        }
      // eslint-disable-next-line
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
                            reduxCart.length ? <CartDetail product={element} key={i}/> : <CartDetail product={element} key={i} counter={element.localCounter} setCart={setCart}/>
                          )})}
                      </List>
                      </Grid>
                  </Grid>
              </Paper>
              <Paper elevation={5} className={classes.paper}>

        <Grid item container xs={12} direction="column">
                  <Typography className={classes.title} variant="h5" noWrap>
                      Summary
                  </Typography>
                   <Divider></Divider>
                  <Typography className={classes.title} variant="h6">
                      Total Order $:
                  </Typography>
        </Grid>
              </Paper>
          </Grid>
          <Grid item xs={false} sm={2}></Grid>
        </Grid>
      </Grid>
    )
}

export default Cart;