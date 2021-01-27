import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
/* import axios from 'axios'; */
import { Link } from 'react-router-dom';
import EnhancedTableHead from './enhancedTableHead.jsx'
import EnhancedTableToolbar from './enhancedTableToolbar.jsx'
/* import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal'; */
import ordersBD from './ordersBD.jsx'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CachedIcon from '@material-ui/icons/Cached';
import BlockIcon from '@material-ui/icons/Block';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Chip from '@material-ui/core/Chip';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  modal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
}));


export default function ListProducts() {
  const [rows, setRows] = useState([])
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect( () => {
    //axios.get('http://localhost:3001/products/').then((res) =>  {
      setRows(ordersBD)
    //})
  },[])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getChipStatus = (status) => {
      switch(status) {
            case 0:{
                return (
                <Chip style={{backgroundColor:'#64b5f6'}} size="small" label={"cart"} icon={<AddShoppingCartIcon />} />
                )
            }
            case 1:{
                return (
                <Chip style={{backgroundColor:'#ffb74d'}} size="small" label={"created"} icon={<ShoppingCartIcon />} />
                )
            }
            case 2:{
                return (
                <Chip style={{backgroundColor:'#81c784'}} size="small" label={"processing"} icon={<CachedIcon />} />
                )
            }
            case 3:{
                return (
                <Chip style={{backgroundColor:'#e57373'}} size="small" label={"canceled"} icon={<BlockIcon />} />
                )
            }
            case 4:{
                return (
                <Chip style={{backgroundColor:'#4caf50'}} size="small" label={"completed"}icon={<DoneAllIcon />} />
                )
            }
            default: {
                return
            }
          
      }
  }

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const numberFormat = (value) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'ARS',
    currencyDisplay: 'symbol'
  }).format(value);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar/>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.orderId}
                    >
                    <TableCell component="th" scope="row" padding="none">
                      </TableCell>     
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.email}
                      </TableCell>
                      <TableCell align="right">{row.idUser}</TableCell>
                      <TableCell align="right">{row.orderId}</TableCell>
                      <TableCell align="right">{numberFormat(row.price)}</TableCell>
                      <TableCell align="right">{row.stock}</TableCell>
                      <TableCell align="right">{getChipStatus(row.status)}</TableCell>
                      <TableCell padding="checkbox">
                            <IconButton  component={Link} to={{pathname: `/dashboard/orders/${row.orderId}/view`, state: { order: row}}} aria-label="update" className={classes.margin}>
                                <VisibilityIcon />
                            </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}