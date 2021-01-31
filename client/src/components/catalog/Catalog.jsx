import React, {useState, useEffect} from 'react'
import ProductCards from '../product/ProductCards'
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";
import {useParams} from 'react-router-dom'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import HomeIcon from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';
import Pagination from '../pagination/Pagination'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
    padding: {
      marginTop: theme.spacing(3)
    },
    paginate: {
      marginTop: theme.spacing(10),
      marginLeft: theme.spacing(72),
      marginBottom: theme.spacing(10)
    }
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
          {/* Lo de abajo es info de Ejemplo para que se vea el componente */}
          <Typography variant="h4" color="textSecondary" component="p">
            Categorias
          </Typography>
          <List> 
          {categories && categories.map((element, index) => {
              return (
                <div key={index}>
                    <ListItem button component={Link} to={`/products/category/${element.id}`}>
                        <ListItemIcon>
                            <FiberManualRecordIcon />
                        </ListItemIcon>
                        <ListItemText primary={element.name}  />
                    </ListItem>
                </div>
              )
            })}
            <Divider variant="middle" />
                <div>
                    <ListItem button component={Link} to={`/products`}>
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Listar todas"}  />
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