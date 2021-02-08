import React from 'react';
import Box from '@material-ui/core/Box';
import { Button, Grid, Input, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const handleSubmit = (e) => {
    e.preventDefault();
    window.location.reload() 
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      justifyContent: 'center',
      boxShadow: "none",
      padding: theme.spacing(5),
    },
  }));

  
  export default function ResetPassword() {
    const classes = useStyles();
  return (
    <Grid>
      <Box component="fieldset" ml={2} pt={0} borderColor="transparent" className={classes.root}>
      <form onSubmit={handleSubmit}>
        <Typography>Reset Password Form</Typography>
        <TextField color="secondary"
            variant="outlined"
            margin="normal"
            required
            name="email"
            label="Email">Email</TextField>
        <TextField color="secondary"
            variant="outlined"
            margin="normal"
            required
            name="token"
            label="Token">Token</TextField>
        <TextField color="secondary"
            variant="outlined"
            margin="normal"
            required
            name="email"
            label="New Password">New Password</TextField>
        <Button variant="contained" color="primary" type='submit' >
                Send
        </Button>
        </form>  
      </Box>
    </Grid>
  );
}