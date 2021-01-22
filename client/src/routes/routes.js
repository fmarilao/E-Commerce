import React from 'react';
import { Route } from 'react-router-dom';
import Catalog from "../components/catalog/Catalog";
import SearchBar from '../components/searchbar/SearchBar';
import ProductDetail from '../components/productDetail/ProductDetail';
import Dashboard from '../components/admin/dashboard/main/dashboard.jsx'

const routes = () => {
    return (
      <>
      <Route exact path="/" component={SearchBar} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/products" component={Catalog} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/dashboard" component={Dashboard} />
      </>
    );
}

export default routes;
