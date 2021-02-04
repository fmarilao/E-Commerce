import { Grid } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import Pagination from '../pagination/Pagination';
import ProductCards from '../product/ProductCards';

const useStyles = makeStyles((theme) => ({
    padding: {
      marginTop: theme.spacing(3)
    },
    paginate: {
      marginTop: theme.spacing(10),
      marginLeft: theme.spacing(72),
    },
    paddingTitle: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(3)
    },
}))


// El Catalogo muestra una grilla de Componentes ProductCard.
// Recibe por props un arreglo de productos.

const Catalog = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const { idCat, name } = useParams();
  const [productsEachPage] = useState(6); // Cuantos items renderiza por pagina
  const [currentPage, setCurrentPage] = useState (1); // setea el valor de la pagina
  const searchProduct = useSelector((state) => state.productReducer.product);

  useEffect(() => {
    if (idCat) {
      setCurrentPage(1);
      axios.get(`/products/category/${idCat}`).then((res) => {
        setProducts(res.data[0].products);
      });
    } else if (name) {
      setProducts(searchProduct);
    } else {
      setCurrentPage(1);
      axios.get("/products").then((res) => {
        setProducts(res.data);
      });
    }
    setCurrentPage(1);
    axios.get("/categories").then((res) => setCategories(res.data));
  }, [idCat, name, searchProduct]);

  //PAGINACION
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Contador de productos totales por pagina
  const indexOfLastPost = currentPage * productsEachPage;
  const indexOfFirstPost = indexOfLastPost - productsEachPage;
  const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsEachPage); i++) {
    pageNumbers.push(i);
  }
    
  return (
      <Grid container className={classes.container}>
        <Grid item xs={2}>
          <Typography variant="h7" color="textprimary" component="p" className={classes.paddingTitle}>
            CATEGORIES
          </Typography>
          <List className={classes.paddingTitle}> 
          {categories && categories.map((element, index) => {
              return (
                <div key={index}>
                    <ListItem button component={Link} to={`/products/category/${element.id}`} >
                        <ListItemText primary={element.name}/>
                    </ListItem>
                </div>
              )
            })}
            <Divider variant="middle" />
                <div>
                    <ListItem button component={Link} to={`/products`}>
                        <ListItemIcon>
                            <ViewModuleIcon />
                        </ListItemIcon>
                        <ListItemText primary={"View All"}  />
                    </ListItem>
                </div>
              <Divider variant="middle" />
            </List>
        </Grid>
        <Grid item container xs={10} className={classes.padding} >
          <ProductCards products={currentPosts} />
            {/* ACTUALIZACION PAGINATE */}
        <Grid item xs={12} className={classes.paginate}>
        <Pagination totalPages={pageNumbers.length} paginate={paginate} />
        </Grid>

        </Grid>
      </Grid>
  );
};

export default Catalog;