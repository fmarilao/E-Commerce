import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getWishes } from '../../redux/wishReducer/actionsWish';
import axios from 'axios';
import WishCard from './WishCard';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(5),   
  },
  paper: {
    borderRadius: '0px',
    width: '100%',
    minHeight: '200px',
    padding: theme.spacing(2),
    paddingBottom: theme.spacing(4)
  },
  title: {
    letterSpacing: '1px',
    fontFamily: 'Barlow',
    display: 'block',
  },
  list: {
    flexGrow: 1,
    width: '100%',
  },
}));

const WishList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const wishList = useSelector((state) => state.wishListReducer.wishes);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    dispatch(getWishes(userId));
  }, [wishList]);

  return (
    <Grid className={classes.container} container direction="column">
      <Grid item container>
        <Grid item xs={false} sm={2}></Grid>
        <Grid item container xs={12} sm={8}>
          <Paper elevation={5} className={classes.paper}>
            <Grid item container xs={12}>
              <Typography className={classes.title} variant="h5" noWrap>
                Wishlist
              </Typography>
            </Grid>
            <Grid item>
              <Divider></Divider>
            </Grid>
            <Grid item container xs={12}>
              <Grid item container xs={12}>
                <List className={classes.list}>
                  {wishList &&
                    wishList.map((element, index) => {
                      return (
                        <Box>
                          <WishCard data={element} key={element.id} />
                        </Box>
                      );
                    })}
                </List>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              direction="row"
              spacing={5}
              justify={'flex-end'}
            >
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={false} sm={2}></Grid>
      </Grid>
      <Grid item xs={false} sm={2}></Grid>
    </Grid>
  );
};

export default WishList;
