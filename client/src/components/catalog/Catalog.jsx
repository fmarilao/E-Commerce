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

// El Catalogo muestra una grilla de Componentes ProductCard.
// Recibe por props un arreglo de productos.

const Catalog = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const {idCat} = useParams()
  useEffect(() => {
    if(idCat){
      axios.get(`/products/category/${idCat}`).then(res => {
        setProducts(res.data[0].products)
      })
    }
    else{
      axios.get('/products').then(res => {
        setProducts(res.data)
      })
    }
    axios.get('/categories').then(res => setCategories(res.data))
    }, [idCat])

  return (
    <div>
      <Grid container>
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
                
            </List>
        </Grid>
        <Grid item container xs={10}>
          <ProductCards products={products} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Catalog;