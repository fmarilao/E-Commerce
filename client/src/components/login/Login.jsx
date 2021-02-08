import React, { useState } from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwt from "jsonwebtoken";
import {setUser} from '../../redux/loginReducer/actionLogin.js'
import { Input, Modal } from "@material-ui/core";
import { Link as RouterLink } from 'react-router-dom';

const validationSchema = yup.object({
  email: yup
    .string("email")
    .email("invalid email address")
    .required("email is required"),
  password: yup
    .string("password")
    .required("password is required"),
});


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
    paperModal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

export default function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios
        .post("/login/", values)
        .then((res) => {
          if (res.data.message) {
            alert(res.data.message);
          } else {
            const { token } = res.data;
            const user = jwt.decode(token)
            localStorage.setItem("token", token);
            dispatch(setUser(user.user))
            formik.resetForm({});
            history.push("/");
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
  });

  // =============MODAL FORGOT

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(email)
    handleClose()
  };

  const resetPassword = (email) => {
    axios.post('/login/forgot', {
      'email': email,     
    }).then((res) => {
      if(res.data.message){
        console.log('ENTRE', res.data.message)
      } else {
      }
      })
      .catch((err) => console.log(err));
  }
  
  const bodyModal = (
    <div style={modalStyle} className={classes.paperModal}>
      <h2 id="simple-modal-title">Password reset</h2>
      <p id="simple-modal-description">
        Please write your email address, click reset password, verify your inbox email and follow the instructions 
      </p>
      <Input onChange={(e) => setEmail(e.target.value)}></Input>
      <Button onClick={handleSubmit} type="button" color='secondary' >
        Reset Password
      </Button>
      <Button onClick={handleClose} type="button" color='secondary' >
        Cancel
      </Button>
    </div>
  );

  //===================

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <TextField
            color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
                    <Button 
                          type="button" 
                          color='secondary' 
                          onClick={handleOpen}>
                          Forgot your password?
                    </Button>
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="simple-modal-title"
                      aria-describedby="simple-modal-description"
                    >
                    {bodyModal}      
                    </Modal>
            </Grid>
            <Grid item>
              <Button
              component={RouterLink}
              to={'/register'}
              type="button" 
              color="secondary"
              >Don't have an account? Register now
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>
  );
}
