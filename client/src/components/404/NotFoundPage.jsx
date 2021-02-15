import React from "react";
import { Alert } from "@material-ui/lab";
import toni from '../../assets/img/faroToni.jpg';
import { Paper } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    boxShadow: 'none',
    marginTop: 10,
  },
}));

const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        <Paper elevation={0} >
          <Alert severity="error">
          <img src={toni} alt="toni faro" />
          </Alert>
        </Paper>
      </div>
    </>
  );
};

export default NotFoundPage;
