import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 400,
  },
});

function ProductCard(product) {
  const classes = useStyles();
  const {
    //idProduct,
    name,
    description,
    price,
    //stock,
    image,
    //rating,
    //sale,
    //featured,
    //createdAt,
  } = product;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="ProductCard"
          className={classes.media}
          image={image}
          title="ProductCard"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
          <Typography variant="h5" color="textSecondary" component="p">
            $ {price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Ver Más
        </Button>
        <Button size="small" color="primary">
          Comprar
        </Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
