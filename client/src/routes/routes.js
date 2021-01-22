import React from 'react';
import { Route } from 'react-router-dom';
import Catalog from "../components/catalog/Catalog";
import NavBar from '../components/navbar/Navbar';
import ProductDetail from '../components/productDetail/ProductDetail';
import Dashboard from '../components/admin/dashboard/main/dashboard.jsx'
import Home from '../components/landing/Home';

const routes = () => {
    return (
      <>
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Home} />
      <Route path="/catalog" component={Catalog} />
      <Route path="/products" component={Catalog} />
      <Route path="/product/:id" component={ProductDetail} />
      </>
    );
}

export default routes;