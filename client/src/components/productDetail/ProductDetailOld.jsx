import React from 'react';
import { Grid, Box,  Card,  Typography, Button, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {CardMedia } from "@material-ui/core";
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles({
    media: {
        height: 400,
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

export default function ProductDetail (props) {

    const {product, image} = props.location.state
    const classes = useStyles();
    return (
      <>
        <Grid container direction="column">
          <Grid item container direction="row" justify="space-evenly" alignItems="center">
            <Grid item container spacing={5} xs={12} sm={12} >
              <Grid item sm={5}>
                <Card className={classes.cards}>
                  <CardActionArea>
                    <CardMedia className={classes.media} image={image[0].url} />
                  </CardActionArea>
                </Card>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item  xs={12} sm={6}>
                <Card className={classes.cards} variant="outlined">
                    {/* Titulo precio y rank */}
                      <Typography
                        className={classes.fonts}
                        gutterBottom
                        variant="h3"
                        display="block"
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="h2" className={classes.fonts}>
                        ${product.price}
                      </Typography>
                     {/* Titulo precio y rank */}

                    {/* Box Button */}
                     <Box m={1} mt={10}>
                      <Button
                        fullWidth
                        startIcon={<AddShoppingCartIcon />}
                        variant="contained"
                      >
                        ADD TO CART
                      </Button>
                      </Box>
                    {/* Box Button */}
                    <Divider variant="middle"  />
                    <Typography>Description</Typography>
                    <Card className={classes.cards}>{product.description}</Card>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid />
        </Grid>
      </>
    );
}