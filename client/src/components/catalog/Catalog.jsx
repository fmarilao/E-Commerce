import React from 'react'
import ProductCards from '../product/ProductCards'
import { Grid } from "@material-ui/core";
import Typography from '@material-ui/core/Typography';

// El Catalogo muestra una grilla de Componentes ProductCard.
// Recibe por props un arreglo de productos.

const Catalog = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={2}>
          {/* Lo de abajo es info de Ejemplo para que se vea el componente */}
          <Typography variant="h4" color="textSecondary" component="p">
            Categorias
          </Typography>
          <Grid item row>
            <Typography variant="body1" color="textSecondary" component="p">
              {/* Hacer petición a category para traer las categorías */}
              * Cat 1* Cat 2* Cat 3
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={10}>
          <ProductCards />
        </Grid>
      </Grid>
    </div>
  );
};

export default Catalog;