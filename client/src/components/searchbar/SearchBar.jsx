import React, { useState } from 'react';
import {onSearch} from '../../redux/searchBarReducer/actionsProducts'
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
// import { fade } from "@material-ui/core/styles";
import InputBase from '@material-ui/core/InputBase';

// const useStyles = makeStyles((theme) => ({
//   inputRoot: {
//     color: "inherit",
//   },
//   search: {
//     position: "relative",
//     borderRadius: theme.shape.borderRadius,
//     "&:hover": {
//       backgroundColor: fade(theme.palette.common.white, 0.25),
//     },
//     backgroundColor: "transparent",
//     marginLeft: 0,
//     width: "100%",
//   },
//   searchButton: {
//     position: "relative",
//     height: "100%",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   searchIcon: {
//     padding: theme.spacing(0, 2),
//     height: "100%",
//     position: "absolute",
//     pointerEvents: "none",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// }));

const SearchBar = () => {

  const [product, setProduct] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  // const classes = useStyles();

  
  const handleSubmit = (e) => {
    
    e.preventDefault();
    dispatch(onSearch(product));
    if(product.length){
      return history.push(`/products/search/${product}`);
    }else {
      return history.push(`/products`);
    }
  };

  return (
    <Grid container alignItems="center">
      {/* <Grid item xs={10} sm={6}> */}
      <div>
        <InputBase
          type="search"
          placeholder="Que estas buscando?"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          style={{
            color: 'white',
            paddingLeft: '1em',
          }}
        />
      </div>
      {/* </Grid> */}
      {/* <Grid item xs={2} sm={6}> */}
      <form onSubmit={handleSubmit}>
        {/* <div clasName={classes.searchButton, classes.searchIcon}> */}
        <Button
          variant="outlined"
          startIcon={<SearchIcon />}
          type="submit"
          style={{
            color: 'white',
          }}
        >
          Buscar
        </Button>
        {/* </div> */}
      </form>
      {/* </Grid> */}
    </Grid>
  );
};;

export default SearchBar;


//   return (
//     <Grid container alignItems="center">
//       <Grid item xs={10} sm={6}>
//         <div clasName={classes.search}>
//           <input
//             type="search"
//             placeholder="tu producto"
//             value={product}
//             onChange={(e) => setProduct(e.target.value)}
//           />
//         </div>
//       </Grid>
//       <Grid item xs={2} sm={6}>
//         <form onSubmit={handleSubmit}>
//           <div clasName={classes.searchButton}>
//             <Button variant="outlined" startIcon={<SearchIcon />} type="submit">
//               Buscar
//             </Button>
//           </div>
//         </form>
//       </Grid>
//     </Grid>
//   );
// };