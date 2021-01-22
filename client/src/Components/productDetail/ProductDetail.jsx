import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box, Container, Card, CardContent, Typography, Toolbar, Button, Divider, AppBar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

// import { Link } from 'react-router-dom';
// import Products from '../products/Products'

const useStyles = makeStyles({
    media: {
        height: 500,
        weight: 500
    },
    cards: {
        border: "none",
        boxShadow: "none"
    },
    fonts: {
        fontFamily: "unset",
        marginLeft: "50px"
    },

})

export default function ProductDetail () {

    const {id} = useParams();
    const dispatch = useDispatch();
    const {product} = useSelector(state => state.ProductsReducer)
    console.log(product)
    
    useEffect(() => {
        dispatch({type: 'PRODUCT', id})
    }, [id])




    const classes = useStyles();
    return (
      <>
        <Grid container direction="column">
          <Grid>
            {" "}

            {/* Header temporal */}
            <AppBar position="static">
              <Toolbar>
                <Typography className={classes.fonts} variant="h6"></Typography>

                <Button color="inherit" href="http://localhost:3000/products">
                  Products
                </Button>
              </Toolbar>
            </AppBar>
            {/* Header temporal */}

          </Grid>

          <Grid item container>
              {/* Separador */}
            <Grid item container xs={0} sm={2} />
              {/* Separador */}
        
            <Grid
              xs={12}
              sm={8}
              container
              direction="row"
              justify="space-evenly"
              alignItems="center"
            >
                <Card className={classes.cards}>
                    <img src={product.img} className={classes.media}></img>
                </Card>

              <Divider orientation="vertical" flexItem />

              <Grid item xs={12} sm={6}>
                <Card className={classes.cards} variant="outlined">

                    {/* Titulo precio y rank */}
                      <Typography
                        className={classes.fonts}
                        gutterBottom
                        variant="h3"
                        display="block"
                      >
                        {product.tittle}
                      </Typography>
                      <Typography variant="h2" className={classes.fonts}>
                        ${product.price}
                      </Typography>
                     {/* Titulo precio y rank */}

                    {/* Box Button */}
                    <Grid xs={12}>
                     <Box m={1} mt={10}>
                      <Button
                        fullWidth
                        startIcon={<AddShoppingCartIcon />}
                        variant="contained"

                      >
                        ADD TO CART
                      </Button>
                      </Box>
                    </Grid>
                    {/* Box Button */}

                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Divider variant="middle"  />
            <Typography>Description</Typography>
            <Card className={classes.cards}>{product.description}</Card>
          </Grid>
          <Grid />
        </Grid>
      </>
    );
}


