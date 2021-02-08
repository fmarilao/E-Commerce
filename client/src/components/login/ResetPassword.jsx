import React from 'react';
import Box from '@material-ui/core/Box';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";

  const useStyles = makeStyles((theme) => ({
    root: {
      justifyContent: 'center',
      boxShadow: "none",
      padding: theme.spacing(5),
    },
  }));

  const validationSchema = yup.object({
    email: yup
      .string("email")
      .email("invalid email address")
      .required("Email is required"),
    newPassword: yup
      .string("password")
      .required("Password is required"),
    token: yup
      .number()
      .min(5)
      .required("Token is required")
  });

  export default function ResetPassword() {
    const classes = useStyles();
    let history = useHistory();
    const formik = useFormik({
        initialValues: {
          email: "",
          token: "",
          newPassword: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('ENTRE')
          axios
            .post(`/login/reset?token=${values.token}`, {password : values.newPassword})
            .then((res) => {
              console.log('RES', res.data.result)
              alert(res.data.result)
              history.push("/");
            })
            .catch((error) => {
              alert(error);
            });
        },
      });


  return (
    <Grid>
      <Box component="fieldset" ml={2} pt={0} borderColor="transparent" className={classes.root}>
      <form onSubmit={formik.handleSubmit}>
        <Typography>Reset Password Form</Typography>
        <TextField color="secondary"
            variant="outlined"
            margin="normal"
            required
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            label="Email">Email</TextField>
        <TextField color="secondary"
            variant="outlined"
            margin="normal"
            required
            name="token"
            value={formik.values.token}
            onChange={formik.handleChange}
            label="Token">Token</TextField>
        <TextField color="secondary"
            variant="outlined"
            margin="normal"
            required
            name="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            label="New Password">New Password</TextField>
        <Button variant="contained" color="primary" type='submit' >
                Send
        </Button>
        </form>  
      </Box>
    </Grid>
  );
}