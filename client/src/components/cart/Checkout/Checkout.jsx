import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import AddressForm from './AddressForm';
import Review from './Review';
import { buildTitle } from '../../../services/buildTitle'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Clotheny
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  }
}));

const steps = ['Shipping address', 'Review your order'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const purchaseAmount = useSelector(state => state.checkoutReducer.purchaseAmount)
  const form = useSelector(state => state.checkoutReducer.paymentForm)
  const userId = localStorage.getItem('userId')
  const cartState = useSelector(state => state.cartReducer.cartState)
  const products = useSelector(state => state.checkoutReducer.products)

  useEffect(() => {
    cartState === 'processing' && setActiveStep(2)
  }, [])

  const handleNext = () => {
    let obj = {
      state: 'processing', 
      purchaseAmount: form.totalPrice,
      shippingCost: 500, 
      shippingAddress: form.address,
      shippingZip: form.zip, 
      shippingCity: form.city,
      shippingState: form.state, 
      firstName: form.firstName, 
      lastName: form.lastName, 
      comments: form.comments
    }
    if(activeStep === steps.length - 1 ){
      axios.put(`/orders/${userId}`, obj)
      .then(() => setActiveStep(activeStep + 1))
      
    } else {
      let flag = false
      for(let prop in form){
        if(prop !== 'comments' && form[prop] === ''){
          flag = true
        }
      }
      flag ? 
      Swal.fire('Oops...', `
      Complete all the required fields (*) before continuing.<br>        
       `, 'error') : 
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  }

  const handlePay = () => {
    console.log(buildTitle(products))
    axios.post(`http://localhost:3001/checkout/`, {purchaseAmount, title: buildTitle(products)})
    .then(res => window.location = res.data.url)
    .catch(err => console.log(err))
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Grid item container direction="column">
                  <Grid item>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Your order number is #2001539. You will have to pay your order and we will also charge you with a 10% extra, that will be used to but some IPAs, as el Gordo is always thirsty.
                    </Typography>
                  </Grid>
                  <Grid item container justify="flex-end">
                    <Grid item>
                      <Button onClick={handlePay} className={classes.button} color="primary" variant="contained">
                        Pay
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
