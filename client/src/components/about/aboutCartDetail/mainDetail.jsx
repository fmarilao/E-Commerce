import { Grid, Typography, Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import './photo.css'

const useStyles = makeStyles( (theme) => ({
    spacing: {
        marginTop: "25px",
        marginBottom: "25px"
    }
}));

export default function Det() {
    const classes = useStyles();

    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={2} sm={2} lg={2}></Grid>

        <Grid item container xs={8} sm={8} lg={8}  container
  direction="column"
  justify="space-evenly"
  alignItems="stretch" className={classes.spacing}>
          <Paper elevation={2}>
              
            <Grid container direction="row" justify="space-evenly"
  alignItems="stretch" className={classes.spacing}>
              <Grid item>
                <img
                  src="https://res.cloudinary.com/damdqkgms/image/upload/v1613073743/1607186828470_xe0nqx.jpg"
                  border="0"
                  height="350px"
                  weight="250px"
                  className="photoDetail"
                  alt="true"
                  position="relative"
                ></img>
              </Grid>
              <Grid item > 
              <Grid container
  direction="column"
  justify="center"
  alignItems="center">
                <Typography variant="h3"> Facundo Andres Siri</Typography>
                <Typography>asdsada</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={2} sm={2} lg={2}></Grid>
      </Grid>
    );
}
