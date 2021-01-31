/* eslint-disable */

import Avatar from "@material-ui/core/Avatar";
import IconButton from '@material-ui/core/IconButton';
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeItem, increaseProduct, decreaseProduct } from '../../redux/cartReducer/action.js';
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
    input: {
      height: 40,
      width: 40,
      textAlign: "center"
    },
    margin: {
        margin: theme.spacing(1),
      },
  }));

const CartDetail = (props) => {
    //const classes = useStyles();
    const dispatch = useDispatch();
    const {product, setCart, counter} = props
    const [image, setImage] = useState("")
    const [storageCounter, setStorageCounter] = useState(counter || 1)
    //const [productCart, setProductCart] = useState(product)
    const numberFormat = (value) => new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'ARS',
        currencyDisplay: 'symbol'
    }).format(value);
    useEffect(() => {
      axios.get(`/dashboard/image/${product.id}`).then(res => {
        res.data.length && res.data[0].images.length && setImage(res.data[0].images[0].url)
      })
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
          <ListItem>
          <ListItemAvatar>
            <Avatar src={image}>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={product.name}
            secondary={numberFormat(product.price)}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={() => {
              dispatch(removeItem(product))
              setCart && setCart(JSON.parse(localStorage.getItem("cart")))
              }}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <button onClick={handleRemove}>-</button>
            <span>{storageCounter}</span>
        <button onClick={handleAdd}>+</button>
        <Divider></Divider>
      </>
    )
}

export default CartDetail


