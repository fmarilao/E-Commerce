import { Route } from 'react-router-dom';
import React from 'react';
import Product from '../Components/product/Product';
import ProductDetail from '../Components/productDetail/ProductDetail';



const routes = () => {
    return (
      <>
      
        <Route path="/product/:id" component={ProductDetail}></Route>
        <Route exact path="/products" exact component={Product} />
    
      </>
    );
}

export default routes;