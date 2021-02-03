import React from 'react';
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
/* import axios from 'axios'; */

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

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
  containerW: {
    width: '80%'
  }
}));

export default function OrderDetail(props) {
  const classes = useStyles();
  const {order} = props.location.state

  //Use Effect para traerme la info de la orden
/*   useEffect(() => {
      axios.get()
  }, []) */

  const numberFormat = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'ARS',
    currencyDisplay: 'symbol'
  }).format(value);

  const getChipStatus = (status) => {
    switch(status) {
          case 0:{
              return (
              <Chip style={{backgroundColor:'#64b5f6'}} size="medium" label={"cart"} icon={<AddShoppingCartIcon />} />
              )
          }
          case 1:{
              return (
              <Chip style={{backgroundColor:'#ffb74d'}} size="medium" label={"created"} icon={<ShoppingCartIcon />} />
              )
          }
          case 2:{
              return (
              <Chip style={{backgroundColor:'#81c784'}} size="medium" label={"processing"} icon={<CachedIcon />} />
              )
          }
          case 3:{
              return (
              <Chip style={{backgroundColor:'#e57373'}} size="medium" label={"canceled"} icon={<BlockIcon />} />
              )
          }
          case 4:{
              return (
              <Chip style={{backgroundColor:'#4caf50'}} size="medium" label={"completed"}icon={<DoneAllIcon />} />
              )
          }
          default: {
              return
          }
        
    }
}

  return (
    <>
      <Grid container className={classes.containerW}>
        <Grid item xs={8}>
          <Typography component={'div'} variant="h6" gutterBottom>
            Order
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography component={'div'} variant="h6" gutterBottom>
            State: {getChipStatus(order.status)}
          </Typography>
        </Grid>
      </Grid>
      <List disablePadding>
        {products.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography component={'div'} variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography component={'div'} variant="subtitle1" className={classes.total}>
            {numberFormat(order.price)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography component={'div'} variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography component={'div'} gutterBottom>John Smith</Typography>
          <Typography component={'div'} gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography component={'div'} variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography component={'div'} gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography component={'div'} gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}