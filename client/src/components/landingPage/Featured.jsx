import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '90%',
    height: '100%',
  },
}));

 const tileData = [
    {
     img: 'http://res.cloudinary.com/henry-e/image/upload/v1612545101/wcsbfz7mybvwtoi56fcj.jpg',
     title: 'Image',
     author: 'author',
     cols: 1,
    },
 ]

export default function ImageGridList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
          <GridList cellHeight={400} className={classes.gridList} cols={5}>
        {tileData.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    
    </div>
  );
}