import React from "react";
import Navbar  from '../navbar/Navbar'
import { makeStyles } from '@material-ui/core/styles';
import Carrousel from '../carousel/Carousel.jsx'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(3),
      //padding: theme.spacing(3)
    },
  },
}));


function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Navbar/>
      <Carrousel></Carrousel>
    </React.Fragment>
  );
}
export default Home