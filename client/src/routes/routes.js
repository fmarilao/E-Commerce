import React from 'react';
import { Route } from 'react-router-dom';
import Catalog from "../components/catalog/Catalog";
import NavBar from '../components/navbar/Navbar';
import ProductDetail from '../components/productDetail/ProductDetail';
import Dashboard from '../components/admin/dashboard/main/dashboard.jsx'
import Home from '../components/landingPage/Home';
import Cart from '../components/cart/Cart';
import RegisterForm from "../components/register/RegisterForm";
import Login from "../components/login/Login";


const routes = () => {
    return (
      <>
        <Route exact path="/" component={NavBar} />
        <Route path="/products" component={NavBar} />
        <Route path="/product" component={NavBar} />
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/" component={Home} />
        <Route exact path="/products" component={Catalog} />
        <Route exact path="/products/search/:name" component={Catalog} />
        <Route exact path="/products/category/:idCat" component={Catalog} />
        <Route path="/product/:id" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={Login} />
      </>
    );
}

export default routes;