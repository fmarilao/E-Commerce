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
    height: 140,
  },
});

export default function ReviewCard(review) {
  const classes = useStyles();
    console.log('REVIEW QUE LLEGA', review.data);
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title="User Avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            componente stars
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {review.data}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            description.id
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
