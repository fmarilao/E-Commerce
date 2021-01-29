import React from 'react';
import { Route } from 'react-router-dom';
import Catalog from "../components/catalog/Catalog";
import NavBar from '../components/navbar/Navbar';
import ProductDetail from '../components/productDetail/ProductDetail';
import Dashboard from '../components/admin/dashboard/main/dashboard.jsx'
import Home from '../components/landingPage/Home';
import Cart from '../components/cart/Cart';
import UserForm from "../components/register/RegisterForm";
import Footer from '../components/footer/Footer';

const routes = () => {
    return (
      <>
      <Route path="/" component={NavBar} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/product/:id" component={ProductDetail} />
      <Route path="/cart" component={Cart} />
      <Route path="/register" component={UserForm} />
      <Route exact path="/" component={Home} />
      <Route exact path="/products" component={Catalog} />
      <Route exact path="/products/category/:idCat" component={Catalog} />
      <Route path="/" component={Footer} />
      </>
    );
}

export default routes;