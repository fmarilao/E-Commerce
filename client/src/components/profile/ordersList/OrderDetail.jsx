import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CachedIcon from '@material-ui/icons/Cached';
import BlockIcon from '@material-ui/icons/Block';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Chip from '@material-ui/core/Chip';
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderDetails, getOrderProducts} from '../../../redux/ordersReducer/actionOrders'
import Divider from '@material-ui/core/Divider';
import { Paper } from '@material-ui/core';
import {useHistory} from 'react-router-dom'
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(0.4, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function OrderDetail() {
  const {userId, orderId} = useParams()
  const classes = useStyles();
  const dispatch = useDispatch()
  const order = useSelector(state => state.ordersReducer.orders)
  const orderDetail = useSelector(state => state.ordersReducer.orderDetail)
  const history  = useHistory()

  useEffect(() => {
    dispatch(getOrderProducts(userId, orderId))
    dispatch(getOrderDetails(orderId))
    // eslint-disable-next-line
  }, []) 

  const numberFormat = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'ARS',
    currencyDisplay: 'symbol'
  }).format(value);

  const getChipStatus = (status) => {
      switch(status) {
            case "cart":{
                return (
                <Chip style={{backgroundColor:'#64b5f6'}} size="small" label={"cart"} icon={<AddShoppingCartIcon />} />
                )
            }
            case "created":{
                return (
                <Chip style={{backgroundColor:'#ffb74d'}} size="small" label={"created"} icon={<ShoppingCartIcon />} />
                )
            }
            case "processing":{
                return (
                <Chip style={{backgroundColor:'#81c784'}} size="small" label={"processing"} icon={<CachedIcon />} />
                )
            }
            case "canceled":{
                return (
                <Chip style={{backgroundColor:'#e57373'}} size="small" label={"canceled"} icon={<BlockIcon />} />
                )
            }
            case "completed":{
                return (
                <Chip style={{backgroundColor:'#4caf50'}} size="small" label={"completed"}icon={<DoneAllIcon />} />
                )
            }
            default: {
                return
            }
          
      }
  }

  const checkState = (state) => {
    if(state === "cart" || state === "created" || state ===  "processing"){
      return true
    }
    else return false;
  }

  const handleGoBack = () => {
    history.push('/me')
  }


  return (
    <>
    <Grid container justify="center" alignItems="center">
      <Grid item xs={false} sm={2}></Grid>
      <Grid item container xs={12} sm={8}>
        <Paper style={{width: "100%", marginTop: "5%",marginBottom: "5%", padding:"5%"}}>
        <Grid item container>
          <Grid item xs={8}>
            <Typography variant="h6" gutterBottom>
              Order: #{orderDetail.id}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" gutterBottom>
              State: {orderDetail && getChipStatus(orderDetail.state)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <Grid item xs={12}>
          <List disablePadding>
            {order && order.map((product) => (
              <React.Fragment key={product.id}>
              <ListItem className={classes.listItem} >
                <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity} - (${numberFormat(product.quantity * product.price)})`} />
                <Typography variant="body2">{numberFormat(product.price)}</Typography>
              </ListItem>
              <Divider />
              </React.Fragment>
            ))}
            <ListItem className={classes.listItem}>
              <ListItemText primary="Total" />
              <Typography variant="subtitle1" className={classes.total}>
                {numberFormat(orderDetail.purchaseAmount)}
              </Typography>
            </ListItem>
          </List>
          </Grid>
          { checkState(orderDetail.state) ? 
          <Typography variant="subtitle1" className={classes.total}>No shipping details yet</Typography> 
          : 
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom className={classes.title}>
                Shipping info
              </Typography>
              <Typography gutterBottom>{`${orderDetail.firstName} ${orderDetail.lastName}`}</Typography>
              <Typography gutterBottom>{`Address: ${orderDetail.shippingAddress} - Zip: ${orderDetail.shippingZip}`}</Typography>
              <Typography gutterBottom>{`City: ${orderDetail.shippingCity}, ${orderDetail.shippingState}`}</Typography>
            </Grid>
          </Grid>}
        </Grid>
        </Paper>
      </Grid>
      <Grid item xs={false} sm={2}></Grid>    
    </Grid>
    <Grid container>
      <Grid item xs={false} sm={2}></Grid>
      <Grid item container xs={12} sm={8} justify="flex-end">
        <Grid item >
          <Fab
          variant="extended"
          size="small"
          color="inherit"
          aria-label="add"
          className={classes.margin}
          onClick={handleGoBack}
          >
          <NavigationIcon className={classes.extendedIcon} />
          Go back
          </Fab>
        </Grid>
      </Grid>
      <Grid item xs={false} sm={2}></Grid>
    </Grid>
      
    </>
  );
}