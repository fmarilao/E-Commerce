import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import axios from 'axios';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 100,
    width: 100,
  },
});

const WishCard = (product) => {
  console.log('producto en wishcard', product);
  const dispatch = useDispatch();
  const [image, setImage] = useState([]);
  const { id, name, price, stock } = product.data;
  const classes = useStyles();

  const handleRemove = () => {};

  useEffect(() => {
    // axios.get(`/dashboard/image/${id}`).then(res => {
    //   setImage(res.data[0].images)})
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <CardMedia
        component="img"
        alt="ProductCard"
        className={classes.media}
        src={image.length ? image[0].url : ''}
        title="ProductCard Image"
      />
      <h1>
        Nombre: {product.data.product.name} <br></br>
      </h1>
      <h3>
        Precio: {product.data.product.price} <br></br>
      </h3>
      Stock: {product.data.product.stock} <br></br>
      <DeleteOutlineIcon />
    </div>
  );
};
export default WishCard;
